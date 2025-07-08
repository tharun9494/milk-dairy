import React, { useState } from 'react';
import AuthModal from '../components/AuthModal';
import Navigation from '../components/Navigation';
import WhyChooseUsSection from '../components/WhyChooseUsSection';
import Footer from '../components/Footer';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const WhyChooseUsPage: React.FC = () => {
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

      <WhyChooseUsSection />
      
      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
};

export default WhyChooseUsPage; 