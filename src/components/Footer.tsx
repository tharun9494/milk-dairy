import React from 'react';
import { Milk } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="Pitta's Organic Dairy" className="h-25 w-20 object-contain" />
              <div>
                <h3 className="text-xl font-bold">Kishan Organic Milk</h3>
                <p className="text-sm text-green-400">Fresh. Pure. Delivered to Your Door.</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your trusted source for premium organic dairy products, delivered fresh to your doorstep every day.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-400 hover:text-white transition-colors">Home</Link>
              <Link to="/about" className="block text-gray-400 hover:text-white transition-colors">About Us</Link>
              <Link to="/products" className="block text-gray-400 hover:text-white transition-colors">Products</Link>
              <Link to="/delivery" className="block text-gray-400 hover:text-white transition-colors">Delivery</Link>
              <Link to="/contact" className="block text-gray-400 hover:text-white transition-colors">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <div className="space-y-2">
              <Link to="/products" className="block text-gray-400 hover:text-white transition-colors">Fresh Organic Milk</Link>
              <Link to="/products" className="block text-gray-400 hover:text-white transition-colors">A2 Desi Cow Ghee</Link>
              <Link to="/products" className="block text-gray-400 hover:text-white transition-colors">Thick Homemade Curd</Link>
              <Link to="/delivery" className="block text-gray-400 hover:text-white transition-colors">Subscription Plans</Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-400">
              <p>Phone: +91 98765 43210</p>
              <p>Email: orders@pittasdairy.com</p>
              <p>Delivery: Bangalore, Hyderabad, Pune</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Pitta's Organic Dairy. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;