import React from 'react';
import { Award, Heart, Leaf, Users } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Pitta's Organic Dairy</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            For over two decades, we've been nurturing the bond between nature and nutrition, 
            bringing you the purest dairy products from our family farm to your family's table.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">Our Heritage Story</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                What began as a small family dairy farm in the heart of rural India has blossomed into a trusted source of premium organic dairy products. Our journey started with a simple belief: that the healthiest, most delicious dairy comes from happy, well-cared-for cows.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                Today, our cows graze freely on pesticide-free pastures, are fed only certified organic feed, and live in stress-free environments. We believe in sustainable farming practices that not only produce the highest quality milk but also protect our environment for future generations.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <div className="text-3xl font-bold text-blue-600 mb-2">20+</div>
                <div className="text-gray-700 font-medium">Years of Excellence</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                <div className="text-3xl font-bold text-indigo-600 mb-2">150+</div>
                <div className="text-gray-700 font-medium">Happy Cows</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                <div className="text-3xl font-bold text-purple-600 mb-2">1000+</div>
                <div className="text-gray-700 font-medium">Daily Customers</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl border border-green-100">
                <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                <div className="text-gray-700 font-medium">Organic Certified</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <img 
                src="https://images.pexels.com/photos/1459862/pexels-photo-1459862.jpeg" 
                alt="Organic dairy farm with grazing cows in green pastures"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="text-lg font-bold">Our Green Pastures</h4>
                <p className="text-sm opacity-90">Where our cows roam freely</p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <img 
                src="https://images.pexels.com/photos/1448213/pexels-photo-1448213.jpeg" 
                alt="Fresh organic milk being processed in clean dairy facility"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="text-lg font-bold">Modern Processing</h4>
                <p className="text-sm opacity-90">Maintaining purity & freshness</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 lg:p-12">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Core Values</h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Organic Purity</h4>
              <p className="text-gray-600 text-sm">No chemicals, hormones, or artificial additives - just pure, natural goodness.</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-indigo-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Animal Welfare</h4>
              <p className="text-gray-600 text-sm">Our cows are treated with love and respect, ensuring their happiness and health.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Quality Excellence</h4>
              <p className="text-gray-600 text-sm">Every product undergoes rigorous testing to meet the highest quality standards.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Community Care</h4>
              <p className="text-gray-600 text-sm">Supporting local farmers and contributing to sustainable community development.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;