import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, updateDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/config';
import { 
  Milk, 
  Calendar, 
  User, 
  Bell, 
  CreditCard, 
  MapPin, 
  Clock,
  Package,
  Star,
  LogOut,
  Home,
  Plus,
  Minus,
  Truck,
  Map,
  Navigation
} from 'lucide-react';

const UserDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  const [selectedLocation, setSelectedLocation] = useState<{
    address: string;
    lat: number;
    lng: number;
  } | null>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: user?.displayName || '',
    phone: '',
    completeAddress: '',
    street: '',
    city: '',
    pincode: '',
    profileImage: ''
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [dashboardStats, setDashboardStats] = useState({
    activeOrders: 0,
    activeSubscriptions: 0,
    totalSpent: 0
  });

  const orders = [
    { id: 'ORD001', date: '2024-01-15', status: 'Delivered', total: 180, items: ['Milk 2L', 'Ghee 500ml'] },
    { id: 'ORD002', date: '2024-01-14', status: 'In Transit', total: 130, items: ['Milk 1L', 'Curd 500ml'] },
    { id: 'ORD003', date: '2024-01-13', status: 'Processing', total: 65, items: ['Milk 1L'] }
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      // Show loading state
      const button = document.querySelector('[data-location-detect]') as HTMLButtonElement;
      if (button) {
        button.disabled = true;
        button.innerHTML = '<div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div><span>Detecting...</span>';
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Open Google Maps with current location
          const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=15`;
          window.open(googleMapsUrl, '_blank');
          
          // Set selected location
          setSelectedLocation({
            address: `Location at ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
            lat: latitude,
            lng: longitude
          });

          // Reset button
          if (button) {
            button.disabled = false;
            button.innerHTML = '<Navigation className="w-4 h-4" /><span>Detect My Location</span>';
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          
          // Reset button
          if (button) {
            button.disabled = false;
            button.innerHTML = '<Navigation className="w-4 h-4" /><span>Detect My Location</span>';
          }

          // Show specific error message based on error code
          let errorMessage = 'Unable to detect location. ';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage += 'Please allow location access in your browser settings.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage += 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage += 'Location request timed out.';
              break;
            default:
              errorMessage += 'Please select location manually.';
          }
          
          // Show error message in a better way
          const errorDiv = document.createElement('div');
          errorDiv.className = 'fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50';
          errorDiv.innerHTML = `
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
              </svg>
              <span>${errorMessage}</span>
              <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-red-700 hover:text-red-900">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          `;
          document.body.appendChild(errorDiv);
          
          // Auto remove after 5 seconds
          setTimeout(() => {
            if (errorDiv.parentElement) {
              errorDiv.remove();
            }
          }, 5000);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    } else {
      // Show error for unsupported browsers
      const errorDiv = document.createElement('div');
      errorDiv.className = 'fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50';
      errorDiv.innerHTML = `
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
          </svg>
          <span>Geolocation is not supported by this browser. Please use "Open Google Maps" instead.</span>
          <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-red-700 hover:text-red-900">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      `;
      document.body.appendChild(errorDiv);
      
      setTimeout(() => {
        if (errorDiv.parentElement) {
          errorDiv.remove();
        }
      }, 5000);
    }
  };

  const openGoogleMaps = () => {
    setIsMapOpen(true);
    // Open Google Maps in new tab for location selection
    const googleMapsUrl = 'https://www.google.com/maps';
    window.open(googleMapsUrl, '_blank');
  };

  const handleProfileImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          profileImage: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateProfile = async () => {
    if (!user) return;
    
    setIsUpdating(true);
    try {
      // Prepare profile data for Firestore
      const profileDataToSave: any = {
        fullName: profileData.fullName,
        phone: profileData.phone,
        completeAddress: profileData.completeAddress,
        street: profileData.street,
        city: profileData.city,
        pincode: profileData.pincode,
        updatedAt: new Date(),
        userId: user.uid
      };

      // Handle profile image upload if there's a new image
      let imageUrl = '';
      if (profileData.profileImage && profileData.profileImage.startsWith('data:image')) {
        // Convert base64 to blob
        const response = await fetch(profileData.profileImage);
        const blob = await response.blob();
        
        // Upload to Firebase Storage
        const imageRef = ref(storage, `profile-images/${user.uid}/${Date.now()}`);
        const uploadResult = await uploadBytes(imageRef, blob);
        imageUrl = await getDownloadURL(uploadResult.ref);
        
        // Add image URL to profile data
        profileDataToSave.profileImage = imageUrl;
      }

      // Save to Firestore
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, profileDataToSave, { merge: true });
      
      // Show success message
      const successDiv = document.createElement('div');
      successDiv.className = 'fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50';
      successDiv.innerHTML = `
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
          <span>Profile updated successfully in Firestore!</span>
          <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-green-700 hover:text-green-900">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      `;
      document.body.appendChild(successDiv);
      
      setTimeout(() => {
        if (successDiv.parentElement) {
          successDiv.remove();
        }
      }, 3000);
      
    } catch (error) {
      console.error('Error updating profile:', error);
      // Show error message
      const errorDiv = document.createElement('div');
      errorDiv.className = 'fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50';
      errorDiv.innerHTML = `
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
          </svg>
          <span>Error updating profile in Firestore. Please try again.</span>
          <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-red-700 hover:text-red-900">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      `;
      document.body.appendChild(errorDiv);
      
      setTimeout(() => {
        if (errorDiv.parentElement) {
          errorDiv.remove();
        }
      }, 3000);
    } finally {
      setIsUpdating(false);
    }
  };

  const loadProfileData = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const data = userDoc.data();
        setProfileData({
          fullName: data.fullName || user?.displayName || '',
          phone: data.phone || '',
          completeAddress: data.completeAddress || '',
          street: data.street || '',
          city: data.city || '',
          pincode: data.pincode || '',
          profileImage: data.profileImage || ''
        });
      }
    } catch (error) {
      console.error('Error loading profile data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load profile data when profile tab is active
  React.useEffect(() => {
    if (activeTab === 'profile' && user) {
      loadProfileData();
    }
  }, [activeTab, user]);

  // Handle URL parameters for tab navigation
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam && ['dashboard', 'orders', 'subscription', 'transactions', 'profile'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, []);

  // Fetch subscriptions for My Subscription tab
  React.useEffect(() => {
    const fetchSubscriptions = async () => {
      if (!user) return;
      try {
        const plansRef = collection(db, 'plans');
        const q = query(plansRef, where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        let subs: any[] = [];
        querySnapshot.forEach(docSnap => {
          const data = docSnap.data();
          if (Array.isArray(data.cartItems)) {
            const activeSubs = data.cartItems.filter(
              (item: any) => ['daily', 'weekly', 'monthly'].includes(item.planType)
            ).map((item: any) => ({
              ...item,
              transaction: data.transaction || null,
              status: data.status || 'Active',
              planDocId: docSnap.id
            }));
            subs = subs.concat(activeSubs);
          }
        });
        setSubscriptions(subs);
      } catch (err) {
        console.error('Error fetching subscriptions:', err);
      }
    };
    if (activeTab === 'subscription') {
      fetchSubscriptions();
    }
  }, [user, activeTab]);

  // Fetch transactions for Transaction History tab
  React.useEffect(() => {
    const fetchTransactions = async () => {
      if (!user) return;
      try {
        const plansRef = collection(db, 'plans');
        const q = query(plansRef, where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        let txs: any[] = [];
        querySnapshot.forEach(docSnap => {
          const data = docSnap.data();
          if (data.transaction && data.transaction.amount) {
            txs.push({
              ...data.transaction,
              planName: (data.cartItems && data.cartItems[0] && data.cartItems[0].name) || 'Subscription',
              planType: (data.cartItems && data.cartItems[0] && data.cartItems[0].planType) || '',
            });
          }
        });
        // Sort by date descending
        txs.sort((a, b) => {
          const dateA = a.date && a.date.toDate ? a.date.toDate() : new Date(a.date);
          const dateB = b.date && b.date.toDate ? b.date.toDate() : new Date(b.date);
          return dateB - dateA;
        });
        setTransactions(txs);
      } catch (err) {
        console.error('Error fetching transactions:', err);
      }
    };
    if (activeTab === 'transactions') {
      fetchTransactions();
    }
  }, [user, activeTab]);

  // Fetch dashboard stats
  React.useEffect(() => {
    const fetchDashboardStats = async () => {
      if (!user) return;
      try {
        const plansRef = collection(db, 'plans');
        const q = query(plansRef, where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        let activeOrders = 0;
        let activeSubscriptions = 0;
        let totalSpent = 0;
        querySnapshot.forEach(docSnap => {
          const data = docSnap.data();
          if (Array.isArray(data.cartItems)) {
            activeOrders += data.cartItems.length;
            activeSubscriptions += data.cartItems.filter(
              (item: any) => ['daily', 'weekly', 'monthly'].includes(item.planType)
            ).length;
          }
          if (data.transaction && typeof data.transaction.amount === 'number') {
            totalSpent += data.transaction.amount;
          }
        });
        setDashboardStats({
          activeOrders,
          activeSubscriptions,
          totalSpent: Math.round(totalSpent)
        });
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      }
    };
    fetchDashboardStats();
  }, [user]);

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Milk className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Pitta's Organic Dairy</h1>
                <p className="text-xs text-blue-600">Profile</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Home className="h-5 w-5" />
                <span className="hidden sm:block">Home</span>
              </button>
              <div className="flex items-center space-x-2">
                <User className="h-6 w-6 text-blue-600" />
                <span className="font-medium text-gray-700">
                  {user.displayName || user.email?.split('@')[0]}
                </span>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="hidden sm:block">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'dashboard' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Home className="h-5 w-5" />
                  <span>My Dashboard</span>
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'orders' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Package className="h-5 w-5" />
                  <span>My Orders</span>
                </button>
                <button
                  onClick={() => setActiveTab('subscription')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'subscription' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Calendar className="h-5 w-5" />
                  <span>My Subscriptions</span>
                </button>

                <button
                  onClick={() => setActiveTab('transactions')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'transactions' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Transaction History</span>
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'profile' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">My Dashboard</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-blue-600">Active Orders</p>
                          <p className="text-2xl font-bold text-blue-800">{dashboardStats.activeOrders}</p>
                        </div>
                        <Package className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-green-600">Active Subscription</p>
                          <p className="text-2xl font-bold text-green-800">{dashboardStats.activeSubscriptions}</p>
                        </div>
                        <Calendar className="h-8 w-8 text-green-600" />
                      </div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-purple-600">Total Spent</p>
                          <p className="text-2xl font-bold text-purple-800">₹{dashboardStats.totalSpent}</p>
                        </div>
                        <CreditCard className="h-8 w-8 text-purple-600" />
                      </div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-orange-600">Next Delivery</p>
                          <p className="text-2xl font-bold text-orange-800">Tomorrow</p>
                        </div>
                        <Truck className="h-8 w-8 text-orange-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">Order #ORD001 delivered successfully</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">Monthly subscription renewed</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">Payment of ₹1,950 processed</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                      <div className="space-y-3">
                        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                          Modify Subscription
                        </button>
                        <button className="w-full border border-blue-600 text-blue-600 py-2 px-4 rounded-lg text-sm hover:bg-blue-50 transition-colors">
                          Schedule Delivery
                        </button>
                        <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                          Contact Support
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h2>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                            <p className="text-sm text-gray-600">{order.date}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="mb-3">
                          <p className="text-sm text-gray-600">Items: {order.items.join(', ')}</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-gray-900">₹{order.total}</span>
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'subscription' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">My Subscription</h2>
                  {subscriptions.length === 0 ? (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center text-blue-800">
                      <p className="text-lg font-semibold mb-2">No active subscriptions found.</p>
                      <p className="text-sm">Subscribe to a plan to see it here.</p>
                    </div>
                  ) : (
                    subscriptions.map((sub, idx) => (
                      <div key={sub.planDocId + '-' + idx} className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-blue-800">{sub.name || 'Subscription Plan'}</h3>
                          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">{sub.status || 'Active'}</span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-blue-700"><strong>Type:</strong> {sub.planType ? sub.planType.charAt(0).toUpperCase() + sub.planType.slice(1) : ''} Plan</p>
                            {sub.quantity && <p className="text-blue-700"><strong>Quantity:</strong> {sub.quantity}</p>}
                            {sub.deliveryFrequency && <p className="text-blue-700"><strong>Delivery:</strong> {sub.deliveryFrequency === 'twice' ? 'Twice per day' : 'Once per day'}</p>}
                            {sub.endDate && (
                              <p className="text-blue-700"><strong>Ends On:</strong> {sub.endDate.toDate ? sub.endDate.toDate().toLocaleDateString() : new Date(sub.endDate).toLocaleDateString()}</p>
                            )}
                          </div>
                          <div>
                            <p className="text-blue-700"><strong>Monthly Cost:</strong> ₹{sub.basePrice ? (sub.deliveryFrequency === 'twice' ? sub.basePrice * 2 : sub.basePrice) : '-'}</p>
                            {sub.transaction && sub.transaction.date && (
                              <p className="text-blue-700"><strong>Subscribed On:</strong> {sub.transaction.date.toDate ? sub.transaction.date.toDate().toLocaleDateString() : new Date(sub.transaction.date).toLocaleDateString()}</p>
                            )}
                          </div>
                        </div>
                        {/* Add more details as needed */}
                        <div className="mt-4 flex space-x-3">
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                            Modify Plan
                          </button>
                          <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg text-sm hover:bg-blue-50">
                            Pause Subscription
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'transactions' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Transaction History</h2>
                  <div className="space-y-4">
                    {transactions.length === 0 ? (
                      <div className="text-center text-blue-800 bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <p className="text-lg font-semibold mb-2">No transactions found.</p>
                        <p className="text-sm">Your payments will appear here.</p>
                      </div>
                    ) : (
                      transactions.map((tx, idx) => (
                        <div key={idx} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-semibold text-gray-900">{tx.planName || 'Subscription Payment'}</h3>
                              <p className="text-sm text-gray-600">{tx.date && tx.date.toDate ? tx.date.toDate().toLocaleDateString() : new Date(tx.date).toLocaleDateString()}</p>
                            </div>
                            <span className="text-green-600 font-semibold">₹{tx.amount}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">{tx.planType ? `Plan: ${tx.planType.charAt(0).toUpperCase() + tx.planType.slice(1)}` : ''}</span>
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Completed</span>
                          </div>
                          <div className="mt-2 text-xs text-gray-500">
                            {tx.paymentId && <span>Payment ID: {tx.paymentId} </span>}
                            {tx.orderId && <span>Order ID: {tx.orderId}</span>}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h2>
                  <div className="space-y-6">
                    {/* Profile Picture Section */}
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          <img 
                            src={profileData.profileImage || "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"} 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors cursor-pointer">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleProfileImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Profile Picture</h3>
                        <p className="text-sm text-gray-600">Click the + button to upload a new profile picture</p>
                      </div>
                    </div>

                    {/* Personal Information */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={profileData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={user?.email || ''}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                    </div>
                    
                    {/* Address Section */}
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Address</h3>
                      
                      {/* Location Detection */}
                      <div className="mb-4">
                        <div className="flex space-x-3 mb-3">
                          <button 
                            onClick={detectLocation}
                            data-location-detect
                            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Navigation className="w-4 h-4" />
                            <span>Detect My Location</span>
                          </button>
                          
                        </div>
                        
                        {/* Instructions */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <h4 className="text-sm font-medium text-blue-800 mb-2">How to set your location:</h4>
                          <ul className="text-xs text-blue-700 space-y-1">
                            <li>• <strong>Detect My Location:</strong> Automatically finds your current position (requires location permission)</li>
                            <li>• <strong>Open Google Maps:</strong> Opens Google Maps in a new tab for manual location selection</li>
                            <li>• <strong>Manual Input:</strong> Enter coordinates below if you know them</li>
                          </ul>
                        </div>
                      </div>

                      {/* Manual Coordinates Input */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Or enter coordinates manually:</label>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <input
                              type="number"
                              step="any"
                              placeholder="Latitude (e.g., 12.9716)"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            />
                          </div>
                          <div>
                            <input
                              type="number"
                              step="any"
                              placeholder="Longitude (e.g., 77.5946)"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            />
                          </div>
                        </div>
                        <button className="mt-2 bg-gray-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors">
                          Set Coordinates
                        </button>
                      </div>

                      {/* Selected Location Display */}
                      {selectedLocation && (
                        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-blue-800">Selected Location:</p>
                              <p className="text-sm text-blue-600">{selectedLocation.address}</p>
                            </div>
                            <button 
                              onClick={() => setSelectedLocation(null)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Address Fields */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Complete Address</label>
                          <textarea
                            rows={3}
                            value={profileData.completeAddress}
                            onChange={(e) => handleInputChange('completeAddress', e.target.value)}
                            placeholder="Enter your complete delivery address"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Street/Landmark</label>
                            <input
                              type="text"
                              value={profileData.street}
                              onChange={(e) => handleInputChange('street', e.target.value)}
                              placeholder="Near main road, apartment name"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                            <input
                              type="text"
                              value={profileData.city}
                              onChange={(e) => handleInputChange('city', e.target.value)}
                              placeholder="Enter your city"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                            <input
                              type="text"
                              value={profileData.pincode}
                              onChange={(e) => handleInputChange('pincode', e.target.value)}
                              placeholder="Enter pincode"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Google Maps Integration */}
                      <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location on Map</label>
                        <div className="w-full h-64 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                          <div className="text-center">
                            <Map className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-500">Click the buttons above to set your location</p>
                            <p className="text-sm text-gray-400">
                              "Detect My Location" will open Google Maps with your current position
                            </p>
                            <p className="text-sm text-gray-400">
                              "Open Google Maps" will open Google Maps for manual location selection
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex space-x-4 pt-6 border-t">
                      <button 
                        onClick={updateProfile}
                        disabled={isUpdating}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                      >
                        {isUpdating ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Updating...</span>
                          </>
                        ) : (
                          <span>Update Profile</span>
                        )}
                      </button>
                      <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;