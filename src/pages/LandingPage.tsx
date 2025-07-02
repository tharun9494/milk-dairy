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

const LandingPage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState('milk');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    product: 'milk'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry! We\'ll contact you soon.');
    setFormData({ name: '', email: '', phone: '', message: '', product: 'milk' });
  };

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
      
      <AboutSection />
      
      <ProductsSection
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        products={products}
        handleOrderNow={handleOrderNow}
      />
      
      <DeliverySection />
      
      <WhyChooseUsSection />
      
      <ContactSection
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        handleOrderNow={handleOrderNow}
      />
      
      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
};

export default LandingPage;