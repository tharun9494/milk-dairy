import React from 'react';
import { Check, Heart, Star, Award } from 'lucide-react';

interface Product {
  name: string;
  variants: string[];
  benefits: string[];
  price: string;
  image: string;
}

interface ProductsSectionProps {
  selectedProduct: string;
  setSelectedProduct: (product: string) => void;
  products: { [key: string]: Product };
  handleOrderNow: () => void;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({
  selectedProduct,
  setSelectedProduct,
  products,
  handleOrderNow
}) => {
  return (
    <section id="products" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Award className="h-4 w-4 mr-2" />
            Premium Quality Products
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Signature Collection</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From farm to table, every product is crafted with care, tested for purity, and delivered fresh 
            to ensure you get the finest nutrition for your family.
          </p>
        </div>

        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {Object.entries(products).map(([key, product]) => (
              <button
                key={key}
                onClick={() => setSelectedProduct(key)}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedProduct === key
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-200'
                    : 'bg-white text-gray-700 hover:bg-blue-50 border-2 border-blue-200 shadow-md'
                }`}
              >
                {product.name}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-blue-100">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div>
                  <h3 className="text-4xl font-bold text-gray-900 mb-3">
                    {products[selectedProduct].name}
                  </h3>
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-3xl font-bold text-blue-600">
                      {products[selectedProduct].price}
                    </span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                      <span className="text-gray-600 ml-2">(4.9/5)</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Available Variants:</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {products[selectedProduct].variants.map((variant, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-gray-700 font-medium">{variant}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Health Benefits:</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {products[selectedProduct].benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg border border-red-100">
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                          <Heart className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-gray-700 font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={handleOrderNow}
                    className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex-1"
                  >
                    Add to Cart
                  </button>
                  <button 
                    onClick={handleOrderNow}
                    className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 flex-1"
                  >
                    Subscribe & Save
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                  <img 
                    src={products[selectedProduct].image}
                    alt={products[selectedProduct].name}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                {/* Quality Badge */}
                <div className="absolute -top-4 -right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg">
                  <div className="text-center">
                    <div className="text-sm font-bold">100%</div>
                    <div className="text-xs">Organic</div>
                  </div>
                </div>
                
                {/* Fresh Badge */}
                <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg border border-blue-100">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-900">Farm Fresh Daily</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;