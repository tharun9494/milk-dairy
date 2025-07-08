import React, { useState } from 'react';
import AuthModal from '../components/AuthModal';
import Navigation from '../components/Navigation';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { 
  Award, 
  Users, 
  Leaf, 
  Heart, 
  Shield, 
  Clock, 
  MapPin, 
  Phone,
  Mail,
  Star,
  CheckCircle,
  TrendingUp,
  Calendar,
  Target,
  Zap
} from 'lucide-react';

const AboutPage: React.FC = () => {
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

  // Company Timeline
  const timeline = [
    {
      year: '2004',
      title: 'The Beginning',
      description: 'Started as a small family dairy farm with just 10 cows in rural Karnataka',
      icon: Leaf
    },
    {
      year: '2010',
      title: 'Organic Certification',
      description: 'Achieved 100% organic certification and expanded to 50 cows',
      icon: Award
    },
    {
      year: '2015',
      title: 'Modern Processing',
      description: 'Installed state-of-the-art processing facility and cold storage',
      icon: Shield
    },
    {
      year: '2018',
      title: 'Digital Transformation',
      description: 'Launched online ordering platform and mobile app',
      icon: Zap
    },
    {
      year: '2020',
      title: 'Expansion',
      description: 'Extended delivery to 3 major cities with 500+ daily customers',
      icon: TrendingUp
    },
    {
      year: '2024',
      title: 'Today',
      description: 'Serving 1000+ families with premium organic dairy products',
      icon: Target
    }
  ];

  // Team Members
  const team = [
    {
      name: 'Rajesh Pitta',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      description: '20+ years of dairy farming experience. Passionate about organic farming and sustainable practices.',
      experience: '25 years'
    },
    {
      name: 'Priya Pitta',
      role: 'Operations Director',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      description: 'Manages daily operations and ensures quality standards. Expert in dairy processing and quality control.',
      experience: '15 years'
    },
    {
      name: 'Amit Kumar',
      role: 'Head of Quality',
      image: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg',
      description: 'Oversees all quality control processes and maintains organic certification standards.',
      experience: '12 years'
    }
  ];

  // Achievements
  const achievements = [
    {
      icon: Award,
      title: 'Organic Certification',
      description: '100% organic certified by Government of India',
      year: '2010'
    },
    {
      icon: Users,
      title: 'Customer Satisfaction',
      description: '4.9/5 rating from 1000+ customers',
      year: '2024'
    },
    {
      icon: Shield,
      title: 'Quality Awards',
      description: 'Best Organic Dairy Award 2023',
      year: '2023'
    },
    {
      icon: Leaf,
      title: 'Environmental Award',
      description: 'Green Business Award for Sustainable Practices',
      year: '2022'
    }
  ];

  // Values
  const values = [
    {
      icon: Heart,
      title: 'Animal Welfare',
      description: 'Our cows are treated with love and respect, ensuring their happiness and health.',
      color: 'red'
    },
    {
      icon: Leaf,
      title: 'Environmental Care',
      description: 'Sustainable farming practices that protect our environment for future generations.',
      color: 'green'
    },
    {
      icon: Shield,
      title: 'Quality Excellence',
      description: 'Every product undergoes rigorous testing to meet the highest quality standards.',
      color: 'blue'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Supporting local farmers and contributing to sustainable community development.',
      color: 'purple'
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

      <AboutSection />

      {/* Company Timeline Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey Through Time</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a small family farm to a trusted name in organic dairy, our journey has been marked by growth, innovation, and unwavering commitment to quality.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-200 h-full"></div>
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="w-1/2 px-8">
                    <div className={`bg-white p-6 rounded-xl shadow-lg ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <div className="flex items-center space-x-3 mb-3">
                        <item.icon className="h-6 w-6 text-blue-600" />
                        <span className="text-2xl font-bold text-blue-600">{item.year}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  <div className="w-1/2 flex justify-center">
                    <div className="bg-blue-600 w-4 h-4 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  <div className="w-1/2 px-8"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our dedicated team of experts ensures that every product meets our high standards of quality and freshness.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm mb-3">{member.description}</p>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>{member.experience} experience</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Achievements</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Recognition and awards that validate our commitment to excellence and quality.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <achievement.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{achievement.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{achievement.description}</p>
                <span className="text-blue-600 font-semibold">{achievement.year}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do, from farming practices to customer service.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
                <div className={`bg-${value.color}-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <value.icon className={`h-8 w-8 text-${value.color}-600`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Get in Touch</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Have questions about our products or want to learn more? We'd love to hear from you.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Call Us</h3>
              <p className="text-blue-100">+91 98765 43210</p>
              <p className="text-blue-100 text-sm">Mon-Sat: 6 AM - 8 PM</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Email Us</h3>
              <p className="text-blue-100">info@pittasdairy.com</p>
              <p className="text-blue-100 text-sm">We reply within 2 hours</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Visit Us</h3>
              <p className="text-blue-100">Pitta's Organic Dairy Farm</p>
              <p className="text-blue-100 text-sm">Karnataka, India</p>
            </div>
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

export default AboutPage; 