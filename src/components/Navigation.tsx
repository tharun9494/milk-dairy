import React, { useState, useEffect, useRef } from 'react';
import { Milk, ChevronDown, LogIn, LogOut, UserCircle, Settings, ShoppingCart } from 'lucide-react';
import { User } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import logo from '../images/logo.png';

interface NavigationProps {
  user: User | null;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  openAuthModal: (mode: 'login' | 'signup') => void;
  logout: () => void;
  handleOrderNow: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  user,
  isMenuOpen,
  setIsMenuOpen,
  openAuthModal,
  logout,
  handleOrderNow
}) => {
  const navigate = useNavigate();
  const isAdmin = user?.email === 'ontimittatharun2002@gmail.com' || user?.email?.includes('admin');
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const aboutDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Load cart count from Firebase
  useEffect(() => {
    const loadCartCount = async () => {
      if (user) {
        try {
          const userDoc = doc(db, 'users', user.uid);
          const userData = await getDoc(userDoc);
          
          if (userData.exists() && userData.data().cart) {
            setCartCount(userData.data().cart.length);
          } else {
            setCartCount(0);
          }
        } catch (error) {
          console.error('Error loading cart count:', error);
          setCartCount(0);
        }
      } else {
        setCartCount(0);
      }
    };

    loadCartCount();
  }, [user]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target as Node)) {
        setIsAboutDropdownOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
            
              <img src={logo} alt="Logo" className="h-25 w-20 object-contain" />
           
            <div>
              <h1 className="text-xl font-bold text-gray-900">Kishan Organic Milk</h1>
              <p className="text-xs text-blue-600 font-medium">Fresh. Pure. Delivered to Your Door.</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Home</Link>
            
            {/* About Dropdown */}
            <div className="relative" ref={aboutDropdownRef}>
              <button
                onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                <span>About</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isAboutDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isAboutDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <Link 
                    to="/about" 
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => setIsAboutDropdownOpen(false)}
                  >
                    About Us
                  </Link>
                  <Link 
                    to="/why-choose-us" 
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => setIsAboutDropdownOpen(false)}
                  >
                    Why Choose Us
                  </Link>
                </div>
              )}
            </div>
            
            <Link to="/pricing" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Pricing</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Contact</Link>
            
            {/* Cart Icon */}
            <button 
              onClick={() => navigate('/cart')}
              className="relative text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            
            {user ? (
              /* Profile Dropdown for logged-in users */
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  <div className="bg-blue-100 p-2 rounded-full">
                    <UserCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <span>{user.displayName || user.email?.split('@')[0]}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isProfileDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <button 
                      onClick={() => {
                        navigate('/dashboard');
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      Profile
                    </button>
                    
                    {isAdmin && (
                      <button 
                        onClick={() => {
                          navigate('/admin');
                          setIsProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-purple-600 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                      >
                        Admin Panel
                      </button>
                    )}
                    
                    <button 
                      onClick={() => {
                        handleOrderNow();
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      Order Now
                    </button>
                    
                    <div className="border-t border-gray-200 my-1"></div>
                    
                    <button 
                      onClick={() => {
                        logout();
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Login/Signup for non-logged-in users */
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => openAuthModal('login')}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </button>
                <button 
                  onClick={() => openAuthModal('signup')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 p-2"
            >
              <ChevronDown className={`h-6 w-6 transform transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-blue-100 shadow-lg">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">Home</Link>
            <Link to="/about" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">About Us</Link>
            <Link to="/why-choose-us" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium pl-6">Why Choose Us</Link>
            <Link to="/pricing" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">Pricing</Link>
            <Link to="/contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">Contact</Link>
            
            {/* Cart for Mobile */}
            <button 
              onClick={() => navigate('/cart')}
              className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            
            {user ? (
              <div className="px-3 py-2 space-y-3 border-t border-gray-200 mt-2 pt-4">
                <div className="flex items-center space-x-2 text-gray-700">
                  <UserCircle className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">{user.displayName || user.email?.split('@')[0]}</span>
                </div>
                
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="block w-full text-left text-blue-600 hover:text-blue-700 font-medium"
                >
                  Profile
                </button>
                
                {isAdmin && (
                  <button 
                    onClick={() => navigate('/admin')}
                    className="block w-full text-left text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Admin Panel
                  </button>
                )}
                
                <button 
                  onClick={handleOrderNow}
                  className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium"
                >
                  Order Now
                </button>
                
                <button 
                  onClick={logout}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-700"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="px-3 py-2 space-y-2 border-t border-gray-200 mt-2 pt-4">
                <button 
                  onClick={() => openAuthModal('login')}
                  className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium"
                >
                  Login
                </button>
                <button 
                  onClick={() => openAuthModal('signup')}
                  className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;