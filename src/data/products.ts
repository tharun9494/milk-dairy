export interface Product {
  name: string;
  variants: string[];
  benefits: string[];
  price: string;
  image: string;
}

export const products: { [key: string]: Product } = {
  milk: {
    name: 'Fresh Organic Milk',
    variants: ['Toned Milk (1.5% Fat)', 'Full Cream Milk (6% Fat)', 'A2 Cow Milk (Premium)', 'Buffalo Milk (Rich & Creamy)'],
    benefits: ['Rich in Calcium & Protein', 'Vitamin D Fortified', 'No Hormones or Antibiotics', 'Boosts Immunity', 'Supports Bone Health'],
    price: '₹65/L',
    image: 'https://images.pexels.com/photos/416451/pexels-photo-416451.jpeg'
  },
  ghee: {
    name: 'A2 Desi Cow Ghee',
    variants: ['500ml Glass Jar', '1L Glass Jar', '2L Bulk Pack', 'Gift Pack (250ml)'],
    benefits: ['Pure A2 Protein', 'Rich in Omega-3 Fatty Acids', 'Aids Digestion', 'Boosts Immunity', 'Traditional Bilona Method'],
    price: '₹850/500ml',
    image: 'https://images.pexels.com/photos/4198567/pexels-photo-4198567.jpeg'
  },
  curd: {
    name: 'Thick Homemade Curd',
    variants: ['500ml Fresh Pack', '1L Family Pack', 'Greek Style (Thick)', 'Low Fat Variant'],
    benefits: ['Probiotic Rich', 'Aids Digestion', 'High in Protein', 'Natural & Fresh', 'Supports Gut Health'],
    price: '₹45/500ml',
    image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg'
  }
};