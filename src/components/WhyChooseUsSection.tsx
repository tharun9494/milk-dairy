import React from 'react';
import { Leaf, Award, Heart, Users, Star } from 'lucide-react';

interface Testimonial {
  name: string;
  location: string;
  rating: number;
  text: string;
}

const WhyChooseUsSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      name: 'Priya Sharma',
      location: 'Bangalore',
      rating: 5,
      text: 'The quality is exceptional! My family loves the rich taste of their organic milk. Delivery is always on time.'
    },
    {
      name: 'Rajesh Kumar',
      location: 'Hyderabad',
      rating: 5,
      text: 'Their A2 ghee is the best I\'ve ever tasted. You can really taste the difference when it\'s made with love and care.'
    },
    {
      name: 'Meera Patel',
      location: 'Pune',
      rating: 5,
      text: 'Been using their daily delivery service for 6 months. Fresh, pure, and delivered right to my doorstep every morning!'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Pitta's Organic Dairy?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're committed to providing the highest quality organic dairy products with unmatched service and care.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">100% Organic</h3>
            <p className="text-gray-600 text-sm">Certified organic feed, no chemicals or hormones used</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Lab Tested Purity</h3>
            <p className="text-gray-600 text-sm">Every batch tested for quality and safety standards</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Ethical Practices</h3>
            <p className="text-gray-600 text-sm">Humane treatment of animals and sustainable farming</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Happy Customers</h3>
            <p className="text-gray-600 text-sm">Over 1000 satisfied families trust our products</p>
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">What Our Customers Say</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;