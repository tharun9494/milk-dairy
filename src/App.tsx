import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import WhyChooseUsPage from './pages/WhyChooseUsPage';
import ContactPage from './pages/ContactPage';
import PricingPage from './pages/PricingPage';
import CartPage from './pages/CartPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { Milk } from 'lucide-react';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <Milk className="h-16 w-16 text-blue-600 animate-pulse mx-auto mb-6" />
            <div className="absolute -inset-2 bg-blue-200 rounded-full animate-ping opacity-20"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Pitta's Organic Dairy</h2>
          <p className="text-gray-600">Loading your fresh experience...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/why-choose-us" element={<WhyChooseUsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;