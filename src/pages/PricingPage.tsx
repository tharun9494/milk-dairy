import React, { useState } from 'react';
import AuthModal from '../components/AuthModal';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ShoppingCart } from 'lucide-react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const plans = [
  {
    id: 'daily-plan',
    name: 'Daily Plan',
    price: 1,
    priceDisplay: '₹1/day',
    description: 'Perfect for families who consume dairy daily',
    features: [
      '2 hours prebook the milk',
      'Fresh delivery every morning',
      'Flexible quantity',
      'No delivery charges',
      '5% discount on monthly bill'
    ],
    highlight: false,
    planType: 'daily' as const,
    image: 'https://images.pexels.com/photos/416451/pexels-photo-416451.jpeg',
    category: 'Daily Plan'
  },
  {
    id: 'weekly-plan',
    name: 'Weekly Plan',
    price: 400,
    priceDisplay: '₹400/day',
    description: 'Ideal for regular dairy consumers',
    features: [
      'Bulk delivery once a week',
      'Customizable delivery day',
      'Free delivery',
      '10% discount on monthly bill',
      'Priority support'
    ],
    highlight: false,
    planType: 'weekly' as const,
    image: 'https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg',
    category: 'Weekly Plan'
  },
  {
    id: 'monthly-plan',
    name: 'Monthly Plan',
    price: 1,
    priceDisplay: '₹1/day',
    description: 'One cow milk only - Premium personalized experience',
    features: [
      'One cow milk only',
      'Your name on the bottle',
      'Bulk delivery at start of month',
      'Priority customer support',
      'Free delivery',
      '15% discount on total bill'
    ],
    highlight: true,
    planType: 'monthly' as const,
    image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg',
    category: 'Monthly Plan'
  },
  {
    id: 'customise-plan',
    name: 'Customise Plan',
    price: 0,
    priceDisplay: 'Contact our team for booking',
    description: 'Flexible plan with full control over your orders',
    features: [
      'Anytime ordering',
      'Custom delivery dates',
      'Flexible quantity per order',
      'No commitment required',
      'Premium customer support',
      'Personalized service'
    ],
    highlight: false,
    planType: 'custom' as const,
    image: 'https://images.pexels.com/photos/4198567/pexels-photo-4198567.jpeg',
    category: 'Custom Plan'
  }
];

const PricingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const addToCart = async (plan: any) => {
    if (!user) {
      openAuthModal('login');
      return;
    }

    if (plan.planType === 'custom') {
      // For custom plan, navigate to contact page
      navigate('/contact');
      return;
    }

    try {
      setAddingToCart(plan.id);
      
      const userDoc = doc(db, 'users', user.uid);
      const userData = await getDoc(userDoc);
      
      const cartItem = {
        id: plan.id,
        name: plan.name,
        basePrice: plan.price,
        image: plan.image,
        description: plan.description,
        category: plan.category,
        planType: plan.planType,
        deliveryFrequency: 'once' as const
      };

      let currentCart = [];
      if (userData.exists() && userData.data().cart) {
        currentCart = userData.data().cart;
      }

      // Check if item already exists in cart
      const existingItemIndex = currentCart.findIndex((item: any) => item.id === plan.id);
      
      if (existingItemIndex >= 0) {
        // Item already exists, don't add duplicate
        const errorDiv = document.createElement('div');
        errorDiv.className = 'fixed top-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded z-50';
        errorDiv.innerHTML = `
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
            </svg>
            <span>${plan.name} is already in your cart!</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-yellow-700 hover:text-yellow-900">
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
        return;
      } else {
        // Add new item
        currentCart.push(cartItem);
      }

      await updateDoc(userDoc, {
        cart: currentCart
      });

      // Show success message
      const successDiv = document.createElement('div');
      successDiv.className = 'fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50';
      successDiv.innerHTML = `
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
          <span>${plan.name} added to cart!</span>
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
      console.error('Error adding to cart:', error);
      
      // Show error message
      const errorDiv = document.createElement('div');
      errorDiv.className = 'fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50';
      errorDiv.innerHTML = `
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
          </svg>
          <span>Failed to add to cart. Please try again.</span>
          <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-red-700 hover:text-red-900">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L6 6l12 12"></path>
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
      setAddingToCart(null);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation
        user={user}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        openAuthModal={openAuthModal}
        logout={logout}
        handleOrderNow={() => {}}
      />

      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Flexible Pricing Plans</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose a plan that fits your family's needs. All plans include premium organic milk, free delivery, and flexible options.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, idx) => (
              <div
                key={plan.name}
                className={`bg-white rounded-2xl shadow-lg p-6 flex flex-col border-2 transition-all duration-300 hover:shadow-xl ${
                  plan.highlight 
                    ? 'border-blue-600 scale-105 shadow-2xl' 
                    : 'border-transparent hover:border-blue-200'
                }`}
              >
                {plan.highlight && (
                  <div className="text-center mb-4">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      ⭐ Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-4">
                  <h3 className={`text-xl font-bold mb-2 ${
                    plan.highlight ? 'text-blue-700' : 'text-gray-900'
                  }`}>
                    {plan.name}
                  </h3>
                  <div className={`text-2xl font-bold mb-2 ${
                    plan.highlight ? 'text-blue-600' : 'text-gray-900'
                  }`}>
                    {plan.priceDisplay}
                  </div>
                  <div className="text-sm text-gray-600 mb-4">{plan.description}</div>
                </div>
                <ul className="space-y-3 mb-6 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => addToCart(plan)}
                  disabled={addingToCart === plan.id}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                      : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
                  } disabled:opacity-50`}
                >
                  {addingToCart === plan.id ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Adding...</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4" />
                      <span>Subscribe</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
};

export default PricingPage; 