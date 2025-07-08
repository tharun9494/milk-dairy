import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove, collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  CreditCard, 
  Truck,
  Package,
  Star,
  Loader2,
  Clock,
  Calendar,
  MapPin,
  Bell
} from 'lucide-react';
import paymentService from '../services/paymentService';

interface CartItem {
  id: string;
  name: string;
  basePrice: number;
  image: string;
  description: string;
  category: string;
  planType: 'daily' | 'weekly' | 'monthly' | 'custom';
  deliveryFrequency: 'once' | 'twice';
}

const CartPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [alternateAddress, setAlternateAddress] = useState('');
  const [preferredTiming, setPreferredTiming] = useState('');
  const [note, setNote] = useState('');
  const [completeAddress, setCompleteAddress] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [pincode, setPincode] = useState('');

  // Load cart data and user address from Firebase
  useEffect(() => {
    if (user) {
      loadCartData();
      loadUserAddress();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadCartData = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const userDoc = doc(db, 'users', user.uid);
      const userData = await getDoc(userDoc);
      
      if (userData.exists() && userData.data().cart) {
        setCartItems(userData.data().cart);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const loadUserAddress = async () => {
    if (!user) return;
    try {
      const userDoc = doc(db, 'users', user.uid);
      const userData = await getDoc(userDoc);
      if (userData.exists()) {
        const data = userData.data();
        setCompleteAddress(data.completeAddress || '');
        setCity(data.city || '');
        setStreet(data.street || '');
        setPincode(data.pincode || '');
      }
    } catch (error) {
      console.error('Error loading user address:', error);
    }
  };

  const updateCartInFirebase = async (newCartItems: CartItem[]) => {
    if (!user) return;
    
    try {
      setUpdating(true);
      const userDoc = doc(db, 'users', user.uid);
      await updateDoc(userDoc, {
        cart: newCartItems
      });
    } catch (error) {
      console.error('Error updating cart:', error);
    } finally {
      setUpdating(false);
    }
  };

  const updateDeliveryFrequency = async (id: string, frequency: 'once' | 'twice') => {
    const newCartItems = cartItems.map(item => 
      item.id === id 
        ? { ...item, deliveryFrequency: frequency }
        : item
    );
    
    setCartItems(newCartItems);
    await updateCartInFirebase(newCartItems);
  };

  const removeItem = async (id: string) => {
    const newCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(newCartItems);
    await updateCartInFirebase(newCartItems);
  };

  const clearCart = async () => {
    setCartItems([]);
    await updateCartInFirebase([]);
  };

  const getItemPrice = (item: CartItem) => {
    return item.deliveryFrequency === 'twice' ? item.basePrice * 2 : item.basePrice;
  };

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + getItemPrice(item), 0);
  };

  const getSGST = () => {
    return getSubtotal() * 0.025; // 2.5%
  };

  const getCGST = () => {
    return getSubtotal() * 0.025; // 2.5%
  };

  const getTotalPrice = () => {
    return getSubtotal() + getSGST() + getCGST();
  };

  const getTotalItems = () => {
    return cartItems.length;
  };

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleCheckout = async () => {
    if (!user) {
      openAuthModal('login');
      return;
    }

    try {
      // Save new fields to user document before payment
      const userDoc = doc(db, 'users', user.uid);
      await updateDoc(userDoc, {
        completeAddress,
        city,
        street,
        pincode,
        preferredTiming,
        note
      });

      // Show loading state
      const loadingDiv = document.createElement('div');
      loadingDiv.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
      loadingDiv.innerHTML = `
        <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p class="text-gray-600">Initializing payment...</p>
        </div>
      `;
      document.body.appendChild(loadingDiv);

      // Create order with Razorpay
      const totalAmount = getTotalPrice();
      console.log('Frontend: Total amount in rupees:', totalAmount);
      // PaymentService will convert rupees to paise internally
      const orderData = await paymentService.createOrder(totalAmount);
      
      // Remove loading
      loadingDiv.remove();

      console.log('Order data received:', orderData);
      console.log('Amount in order:', orderData.amount, 'paise');

      // Initialize Razorpay payment
      const paymentResult = await paymentService.initializePayment(orderData, {
        name: user.displayName || '',
        email: user.email || '',
        phone: ''
      });

      // Handle payment result
      if (paymentResult && paymentResult.success) {
        // Show success message with payment details
        const successDiv = document.createElement('div');
        successDiv.className = 'fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50 max-w-md';
        successDiv.innerHTML = `
          <div class="flex items-start">
            <svg class="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <div class="flex-1">
              <div class="font-medium">Payment Successful!</div>
              <div class="text-sm mt-1">Your order has been placed successfully.</div>
              ${paymentResult.paymentId ? `<div class="text-xs mt-1 text-green-600">Payment ID: ${paymentResult.paymentId}</div>` : ''}
              ${paymentResult.orderId ? `<div class="text-xs mt-1 text-green-600">Order ID: ${paymentResult.orderId}</div>` : ''}
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-green-700 hover:text-green-900 flex-shrink-0">
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
        }, 8000);
        
        // Save transaction/plan info to Firestore
        try {
          // Add endDate to each cart item
          const now = new Date();
          const cartItemsWithEndDate = cartItems.map(item => {
            let endDate = null;
            if (item.planType === 'daily' || item.planType === 'monthly') {
              endDate = new Date(now);
              endDate.setMonth(endDate.getMonth() + 1);
            } else if (item.planType === 'weekly') {
              endDate = new Date(now);
              endDate.setDate(endDate.getDate() + 7);
            }
            return { ...item, endDate };
          });
          await addDoc(collection(db, 'plans'), {
            userId: user.uid,
            userName: user.displayName || '',
            userEmail: user.email || '',
            userImage: user.photoURL || '',
            cartItems: cartItemsWithEndDate,
            completeAddress,
            city,
            street,
            pincode,
            preferredTiming,
            note,
            transaction: {
              paymentId: paymentResult.paymentId || '',
              orderId: paymentResult.orderId || '',
              amount: getTotalPrice(),
              date: new Date(),
            }
          });
        } catch (e) {
          console.error('Error saving plan/transaction:', e);
        }
        
        // Clear cart after successful payment
        await clearCart();
        navigate('/dashboard');
      } else if (paymentResult && !paymentResult.success) {
        // Show payment failure message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50 max-w-md';
        errorDiv.innerHTML = `
          <div class="flex items-start">
            <svg class="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
            </svg>
            <div class="flex-1">
              <div class="font-medium">Payment Failed</div>
              <div class="text-sm mt-1">${paymentResult.error || 'Payment was not completed. Please try again.'}</div>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-red-700 hover:text-red-900 flex-shrink-0">
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
        }, 8000);
      }

    } catch (error) {
      console.error('Payment error:', error);
      
      // Remove loading if still present
      const existingLoading = document.querySelector('.fixed');
      if (existingLoading) {
        existingLoading.remove();
      }

      // Show specific error message
      const errorMessage = error instanceof Error ? error.message : 'Payment failed. Please try again.';
      const errorDiv = document.createElement('div');
      errorDiv.className = 'fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50 max-w-md';
      errorDiv.innerHTML = `
        <div class="flex items-start">
          <svg class="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
          </svg>
          <div class="flex-1">
            <div class="font-medium">Payment Error</div>
            <div class="text-sm mt-1">${errorMessage}</div>
          </div>
          <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-red-700 hover:text-red-900 flex-shrink-0">
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
      }, 8000);
    }
  };

  const handleContinueShopping = () => {
    navigate('/pricing');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        user={user}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        openAuthModal={openAuthModal}
        logout={() => {}}
        handleOrderNow={() => {}}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">
            {cartItems.length > 0 
              ? `You have ${getTotalItems()} subscription${getTotalItems() !== 1 ? 's' : ''} in your cart`
              : 'Your cart is empty'
            }
          </p>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Cart Items ({cartItems.length})</h2>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-600 mb-1">{item.description}</p>
                          <div className="flex items-center space-x-2">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                              {item.category}
                            </span>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                              ))}
                              <span className="text-xs text-gray-500 ml-1">(4.9)</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">₹{getItemPrice(item)}</div>
                          <div className="text-sm text-gray-600 mb-2">
                            {item.deliveryFrequency === 'once' ? 'Once per day' : 'Twice per day'}
                          </div>
                          {/* Delivery Frequency Selection */}
                          <div className="mb-3">
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Delivery Frequency
                            </label>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => updateDeliveryFrequency(item.id, 'once')}
                                disabled={updating}
                                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                                  item.deliveryFrequency === 'once'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                } disabled:opacity-50`}
                              >
                                Once/Day
                              </button>
                              <button
                                onClick={() => updateDeliveryFrequency(item.id, 'twice')}
                                disabled={updating}
                                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                                  item.deliveryFrequency === 'twice'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                } disabled:opacity-50`}
                              >
                                Twice/Day
                              </button>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            {item.deliveryFrequency === 'once' ? 'Morning delivery' : 'Morning & Evening delivery'}
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          disabled={updating}
                          className="text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Preferences - below cart items */}
              <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
                <div className="flex items-center mb-4">
                  <Truck className="h-5 w-5 text-blue-600 mr-2" />
                  <h2 className="text-lg font-bold text-blue-900">Delivery Preferences</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Complete Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        value={completeAddress}
                        onChange={e => setCompleteAddress(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder="Enter your complete address"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="Enter your city"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Landmark/Street</label>
                    <input
                      type="text"
                      value={street}
                      onChange={e => setStreet(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="Landmark or street name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Pincode</label>
                    <input
                      type="text"
                      value={pincode}
                      onChange={e => setPincode(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="Enter pincode"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Preferred Delivery Timing</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        value={preferredTiming}
                        onChange={e => setPreferredTiming(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder="e.g., 7:00 AM - 9:00 AM"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Note/Instructions</label>
                    <div className="relative">
                      <Bell className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <textarea
                        value={note}
                        onChange={e => setNote(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder="Any special instructions for delivery"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* End Delivery Preferences */}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({getTotalItems()} subscriptions)</span>
                    <span className="font-medium">₹{getSubtotal()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">SGST (2.5%)</span>
                    <span className="font-medium">₹{getSGST().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">CGST (2.5%)</span>
                    <span className="font-medium">₹{getCGST().toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <span className="text-lg font-bold text-gray-900">₹{Math.round(getTotalPrice())}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleCheckout}
                    disabled={updating}
                    className="w-full bg-green-600 text-white py-4 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 text-lg"
                  >
                    <CreditCard className="h-6 w-6" />
                    <span>Pay ₹{Math.round(getTotalPrice())}</span>
                  </button>
                  <button
                    onClick={handleContinueShopping}
                    className="w-full border border-blue-600 text-blue-600 py-3 px-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Package className="h-5 w-5" />
                    <span>Continue Shopping</span>
                  </button>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Delivery Benefits</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li className="flex items-center space-x-2">
                      <Truck className="h-4 w-4" />
                      <span>Free daily delivery</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>Flexible delivery times</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Package className="h-4 w-4" />
                      <span>Fresh from farm</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Star className="h-4 w-4" />
                      <span>Premium quality</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some delicious dairy subscriptions to your cart!</p>
            <button
              onClick={handleContinueShopping}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>

      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
};

export default CartPage; 