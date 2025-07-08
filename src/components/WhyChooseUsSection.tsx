import React from 'react';
import { Leaf, Award, Heart, Users, Star, Shield, Truck, CheckCircle, Smile, TrendingUp } from 'lucide-react';

interface Testimonial {
  name: string;
  location: string;
  rating: number;
  text: string;
  image?: string;
}

const WhyChooseUsSection: React.FC = () => {
  const testimonials: Testimonial[] = [
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
    { icon: Users, number: '1000+', label: 'Happy Families', color: 'blue' },
    { icon: Truck, number: '5000+', label: 'Orders Delivered', color: 'green' },
    { icon: Award, number: '20+', label: 'Years of Trust', color: 'purple' },
    { icon: Smile, number: '4.9/5', label: 'Avg. Rating', color: 'yellow' }
  ];

  // Features
  const features = [
    {
      icon: Leaf,
      title: '100% Organic',
      description: 'Certified organic feed, no chemicals or hormones used',
      color: 'green'
    },
    {
      icon: Award,
      title: 'Lab Tested Purity',
      description: 'Every batch tested for quality and safety standards',
      color: 'blue'
    },
    {
      icon: Heart,
      title: 'Ethical Practices',
      description: 'Humane treatment of animals and sustainable farming',
      color: 'red'
    },
    {
      icon: Users,
      title: 'Happy Customers',
      description: 'Over 1000 satisfied families trust our products',
      color: 'purple'
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Strict quality checks at every stage',
      color: 'emerald'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Daily doorstep delivery with cold chain logistics',
      color: 'yellow'
    },
    {
      icon: CheckCircle,
      title: 'No Additives',
      description: 'Absolutely no preservatives or artificial flavors',
      color: 'teal'
    },
    {
      icon: TrendingUp,
      title: 'Growing Community',
      description: 'Expanding to new cities every year',
      color: 'indigo'
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

        {/* Statistics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className={`bg-${stat.color}-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3`}>
                <stat.icon className={`h-8 w-8 text-${stat.color}-600`} />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, idx) => (
            <div key={idx} className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className={`bg-${feature.color}-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <feature.icon className={`h-8 w-8 text-${feature.color}-600`} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">What Our Customers Say</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-16 h-16 rounded-full object-cover mx-auto mb-3 border-4 border-blue-100"
                />
                <div className="flex items-center justify-center mb-3">
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

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-blue-700 mb-4">Ready to experience the difference?</h3>
          <p className="text-lg text-gray-600 mb-6">Join thousands of happy families who trust Pitta's Organic Dairy for their daily nutrition.</p>
          <a href="/pricing" className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg">Explore Our Prices</a>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;