import React, { useState } from 'react';
import AuthModal from '../components/AuthModal';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProductsSection from '../components/ProductsSection';
import DeliverySection from '../components/DeliverySection';
import WhyChooseUsSection from '../components/WhyChooseUsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { useAuth } from '../hooks/useAuth';
import { products } from '../data/products';
import { useNavigate } from 'react-router-dom';
import { 
  Star, 
  Award, 
  Truck, 
  Clock, 
  Shield, 
  Heart, 
  Users, 
  Package,
  CheckCircle,
  Leaf,
  Zap,
  TrendingUp
} from 'lucide-react';

const HomePage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState('milk');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleOrderNow = () => {
    if (!user) {
      openAuthModal('login');
    } else {
      navigate('/dashboard');
    }
  };

  // Featured testimonials
  const featuredTestimonials = [
    {
      name: 'Priya Sharma',
      location: 'Bangalore',
      rating: 5,
      text: 'The quality is exceptional! My family loves the rich taste of their organic milk. Delivery is always on time.',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
    },
    {
      name: 'Rajesh Kumar',
      location: 'Hyderabad',
      rating: 5,
      text: 'Their A2 ghee is the best I\'ve ever tasted. You can really taste the difference when it\'s made with love and care.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'
    },
    {
      name: 'Meera Patel',
      location: 'Pune',
      rating: 5,
      text: 'Been using their daily delivery service for 6 months. Fresh, pure, and delivered right to my doorstep every morning!',
      image: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg'
    }
  ];

  // Statistics
  const stats = [
    { icon: Users, number: '1000+', label: 'Happy Customers', color: 'blue' },
    { icon: Package, number: '5000+', label: 'Orders Delivered', color: 'green' },
    { icon: Award, number: '20+', label: 'Years of Trust', color: 'purple' },
    { icon: Leaf, number: '100%', label: 'Organic Certified', color: 'emerald' }
  ];

  // Features
  const features = [
    {
      icon: Truck,
      title: 'Daily Fresh Delivery',
      description: 'Get fresh dairy products delivered to your doorstep every morning before 8 AM',
      color: 'blue'
    },
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'Every product undergoes rigorous testing to meet the highest quality standards',
      color: 'green'
    },
    {
      icon: Heart,
      title: 'Ethical Practices',
      description: 'Humane treatment of animals and sustainable farming practices',
      color: 'red'
    },
    {
      icon: Zap,
      title: 'Instant Ordering',
      description: 'Order online and get your fresh dairy products the next morning',
      color: 'yellow'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation
        user={user}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        openAuthModal={openAuthModal}
        logout={logout}
        handleOrderNow={handleOrderNow}
      />

      <HeroSection handleOrderNow={handleOrderNow} />

      {/* Statistics Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Thousands</h2>
            <p className="text-xl text-gray-600">Join our growing family of satisfied customers</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`bg-${stat.color}-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className={`h-8 w-8 text-${stat.color}-600`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey Through Time</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to digital transformation - our story of growth and commitment to quality.
            </p>
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-200 h-full"></div>
            
            {/* Timeline items */}
            <div className="space-y-12">
              {/* 2000 */}
              <div className="relative flex items-center">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-5/12 pr-8 text-right">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-2">2000</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">The Beginning</h3>
                    <p className="text-gray-600">
                      Started with 10 cows in Madanapalle, Andhra Pradesh. 
                      Traditional farming methods, no organic certification yet.
                    </p>
                    <div className="mt-4 flex items-center justify-end">
                      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                        10 Cows
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-5/12 pl-8">
                  <div className="bg-gray-100 p-6 rounded-lg">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <span className="text-sm">Location: Madanapalle</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2025 */}
              <div className="relative flex items-center">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-600 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-5/12 pr-8 text-right">
                  <div className="bg-gray-100 p-6 rounded-lg">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <span className="text-sm">Digital Transformation</span>
                    </div>
                  </div>
                </div>
                <div className="w-5/12 pl-8">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="text-2xl font-bold text-green-600 mb-2">2025</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Digital Transformation</h3>
                    <p className="text-gray-600">
                      Launched online platform for milk delivery. 
                      Started digital transformation journey to reach more customers.
                    </p>
                    <div className="mt-4 flex items-center space-x-2">
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        Online Platform
                      </div>
                      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                        Digital Delivery
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Pitta's Organic Dairy?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing the highest quality organic dairy products with unmatched service and care.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
                <div className={`bg-${feature.color}-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className={`h-8 w-8 text-${feature.color}-600`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Milk Plans Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Premium Milk Plans</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fresh, pure cow milk delivered to your doorstep. Choose the plan that fits your family's needs.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Daily Plan */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/416451/pexels-photo-416451.jpeg" 
                  alt="Daily Premium Milk" 
                  className="w-full h-48 object-cover" 
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  ₹60/L
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Daily Premium Milk</h3>
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-gray-600 ml-2">(4.9/5)</span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600">Fresh delivery every morning</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600">Pure A2 cow milk</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600">No preservatives</span>
                  </div>
                </div>
                <button 
                  onClick={() => navigate('/pricing')}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Order Daily Plan
                </button>
              </div>
            </div>

            {/* Weekly Plan */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border-2 border-blue-600">
              <div className="relative">
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
                <img 
                  src="https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg" 
                  alt="Weekly Premium Milk" 
                  className="w-full h-48 object-cover" 
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  ₹400/7L
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Weekly Premium Milk</h3>
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-gray-600 ml-2">(4.9/5)</span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600">Bulk delivery once a week</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600">Premium A2 cow milk</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600">10% discount</span>
                  </div>
                </div>
                <button 
                  onClick={() => navigate('/pricing')}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Order Weekly Plan
                </button>
              </div>
            </div>

            {/* Monthly Plan */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg" 
                  alt="Monthly Premium Milk" 
                  className="w-full h-48 object-cover" 
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  ₹2200/30L
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Monthly Premium Milk</h3>
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-gray-600 ml-2">(4.9/5)</span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600">Monthly bulk delivery</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600">Premium A2 cow milk</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600">15% discount</span>
                  </div>
                </div>
                <button 
                  onClick={() => navigate('/pricing')}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Order Monthly Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our valued customers have to say about our products and service.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredTestimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.location}</div>
                  </div>
                </div>
                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Experience Fresh Organic Dairy?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of families who trust us for their daily dairy needs. Start your journey with fresh, pure, and organic dairy products today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleOrderNow}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Ordering Now
            </button>
            <button 
              onClick={() => navigate('/pricing')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              View All Plans
            </button>
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

export default HomePage; 