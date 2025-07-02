import React from 'react';
import { Milk, ChevronDown, LogIn, LogOut, UserCircle, Settings } from 'lucide-react';
import { User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

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

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-blue-600 p-2 rounded-xl">
              <Milk className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Pitta's Organic Dairy</h1>
              <p className="text-xs text-blue-600 font-medium">Fresh. Pure. Delivered to Your Door.</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Home</a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">About</a>
            <a href="#products" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Products</a>
            <a href="#delivery" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Delivery</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Contact</a>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <UserCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-gray-700 font-medium">
                    {user.displayName || user.email?.split('@')[0]}
                  </span>
                </div>
                
                {isAdmin && (
                  <button 
                    onClick={() => navigate('/admin')}
                    className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Admin</span>
                  </button>
                )}
                
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
                >
                  Dashboard
                </button>
                
                <button 
                  onClick={logout}
                  className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
                
                <button 
                  onClick={handleOrderNow}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md"
                >
                  Order Now
                </button>
              </div>
            ) : (
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
            <a href="#home" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">Home</a>
            <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">About</a>
            <a href="#products" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">Products</a>
            <a href="#delivery" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">Delivery</a>
            <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">Contact</a>
            
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
                  Dashboard
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