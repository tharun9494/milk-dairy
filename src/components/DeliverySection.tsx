import React from 'react';
import { Clock, Truck, Shield, Check } from 'lucide-react';

const DeliverySection: React.FC = () => {
  return (
    <section id="delivery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Convenient Delivery Service</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fresh dairy products delivered to your doorstep with our reliable subscription service and cold-chain delivery system.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-green-50 rounded-xl">
            <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Daily Delivery</h3>
            <p className="text-gray-600">Fresh products delivered every morning before 8 AM</p>
          </div>

          <div className="text-center p-6 bg-green-50 rounded-xl">
            <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Cold Chain</h3>
            <p className="text-gray-600">Temperature-controlled delivery to maintain freshness</p>
          </div>

          <div className="text-center p-6 bg-green-50 rounded-xl">
            <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Hygienic Packaging</h3>
            <p className="text-gray-600">Sealed, sanitized packaging for maximum safety</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Subscription Plans</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-transparent hover:border-green-200 transition-colors">
              <h4 className="text-xl font-bold text-gray-900 mb-2">Daily Plan</h4>
              <p className="text-gray-600 mb-4">Perfect for families who consume dairy daily</p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-700">Daily delivery</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-700">Flexible quantity</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-700">Skip or pause anytime</span>
                </li>
              </ul>
              <div className="text-lg font-bold text-green-600">5% Discount</div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-green-600">
              <div className="text-center mb-2">
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">Most Popular</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Weekly Plan</h4>
              <p className="text-gray-600 mb-4">Ideal for regular dairy consumers</p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-700">Weekly delivery</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-700">Bulk ordering</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-700">Free delivery</span>
                </li>
              </ul>
              <div className="text-lg font-bold text-green-600">10% Discount</div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-transparent hover:border-green-200 transition-colors">
              <h4 className="text-xl font-bold text-gray-900 mb-2">Monthly Plan</h4>
              <p className="text-gray-600 mb-4">Best value for large families</p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-700">Monthly delivery</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-700">Maximum savings</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-700">Priority support</span>
                </li>
              </ul>
              <div className="text-lg font-bold text-green-600">15% Discount</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliverySection;