import { Product } from '../types';

export const initialProducts: Omit<Product, 'id'>[] = [
  // T-Shirts
  {
    name: 'Classic Green T-Shirt',
    description: 'Comfortable cotton t-shirt in fresh green',
    price: 29.99,
    imageUrl: '/Pictures/greentshirts.avif',
    category: 'T-Shirts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Green', 'Blue', 'Black'],
    stock: 50,
    createdAt: new Date(),
    discount: {
      percentage: 20,
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
    },
    rating: 4.5
  },
  {
    name: 'Summer Collection Shirt',
    description: 'Light and breezy summer t-shirt',
    price: 24.99,
    imageUrl: '/Pictures/summershirt.avif',
    category: 'T-Shirts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Blue', 'Yellow'],
    stock: 45,
    createdAt: new Date(),
    discount: {
      percentage: 15,
      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) // 5 days from now
    },
    rating: 4.7
  },
  {
    name: 'Yellow Fashion Tee',
    description: 'Trendy yellow t-shirt for casual wear',
    price: 34.99,
    imageUrl: '/Pictures/Yellowshirts.avif',
    category: 'T-Shirts',
    sizes: ['S', 'M', 'L'],
    colors: ['Yellow', 'White', 'Black'],
    stock: 30,
    createdAt: new Date(),
    rating: 4.2
  },
  {
    name: 'Tropical Print Shirt',
    description: 'Stylish tropical print t-shirt',
    price: 39.99,
    imageUrl: '/Pictures/Tropicalshirt2.avif',
    category: 'T-Shirts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Multi', 'Blue', 'White'],
    stock: 25,
    createdAt: new Date(),
    rating: 4.6
  },

  // Jackets
  {
    name: 'Classic Varsity Jacket',
    description: 'Traditional varsity jacket with modern style',
    price: 89.99,
    imageUrl: '/Pictures/Varsityjacket1.jpg',
    category: 'Jackets',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Red/White', 'Blue/White', 'Black/White'],
    stock: 25,
    createdAt: new Date(),
    discount: {
      percentage: 25,
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days from now
    },
    rating: 4.8
  },
  {
    name: 'Denim Jean Jacket',
    description: 'Classic denim jacket for all seasons',
    price: 79.99,
    imageUrl: '/Pictures/jeanjackets.jpg',
    category: 'Jackets',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blue', 'Light Blue', 'Dark Blue'],
    stock: 35,
    createdAt: new Date(),
    rating: 4.5
  },
  {
    name: 'Professional Suit Jacket',
    description: 'Elegant suit jacket for formal occasions',
    price: 199.99,
    imageUrl: '/Pictures/Suitjacket.jpg',
    category: 'Jackets',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Grey'],
    stock: 20,
    createdAt: new Date(),
    discount: {
      percentage: 30,
      endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000) // 4 days from now
    },
    rating: 4.9
  },
  {
    name: 'Red Female Jacket',
    description: 'Stylish red jacket for women',
    price: 89.99,
    imageUrl: '/Pictures/Redfemalejacket.avif',
    category: 'Jackets',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Red', 'Black', 'White'],
    stock: 15,
    createdAt: new Date(),
    rating: 4.8
  },

  // Dresses
  {
    name: 'Two-Piece Female Set',
    description: 'Elegant two-piece set for special occasions',
    price: 129.99,
    imageUrl: '/Pictures/2pieceforfemale.jpg',
    category: 'Dresses',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'Red', 'White'],
    stock: 15,
    createdAt: new Date(),
    rating: 4.6
  },
  {
    name: 'Sleeveless Summer Dress',
    description: 'Light and stylish sleeveless dress',
    price: 69.99,
    imageUrl: '/Pictures/Slevlessfemale.jpg',
    category: 'Dresses',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['White', 'Pink', 'Blue'],
    stock: 25,
    createdAt: new Date(),
    rating: 4.4
  },
  {
    name: 'Native Pattern Dress',
    description: 'Beautiful dress with native patterns',
    price: 89.99,
    imageUrl: '/Pictures/Nativeshirtfemale.avif',
    category: 'Dresses',
    sizes: ['S', 'M', 'L'],
    colors: ['Multi', 'Blue', 'Green'],
    stock: 20,
    createdAt: new Date(),
    rating: 4.7
  },

  // Trousers
  {
    name: 'Classic Blue Jeans',
    description: 'Classic fit denim jeans',
    price: 59.99,
    imageUrl: '/Pictures/Jeans.jpg',
    category: 'Trousers',
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['Blue', 'Black', 'Grey'],
    stock: 40,
    createdAt: new Date(),
    rating: 4.7
  },
  {
    name: 'Black Denim Jeans',
    description: 'Slim fit black denim jeans',
    price: 64.99,
    imageUrl: '/Pictures/blackjeans.avif',
    category: 'Trousers',
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['Black', 'Dark Blue', 'Grey'],
    stock: 35,
    createdAt: new Date(),
    rating: 4.5
  },
  {
    name: 'Green Cargo Pants',
    description: 'Comfortable cargo pants in green',
    price: 49.99,
    imageUrl: '/Pictures/greencargopants.avif',
    category: 'Trousers',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Green', 'Black', 'Khaki'],
    stock: 30,
    createdAt: new Date(),
    rating: 4.4
  },
  {
    name: 'Classic Cargo Pants',
    description: 'Traditional cargo pants with multiple pockets',
    price: 54.99,
    imageUrl: '/Pictures/Cargopants.avif',
    category: 'Trousers',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Khaki', 'Black', 'Grey'],
    stock: 25,
    createdAt: new Date(),
    rating: 4.6
  },
  {
    name: 'White Trousers',
    description: 'Elegant white trousers for formal occasions',
    price: 69.99,
    imageUrl: '/Pictures/whitetrousers.jpg',
    category: 'Trousers',
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['White', 'Beige', 'Light Grey'],
    stock: 20,
    createdAt: new Date(),
    rating: 4.3
  },
  {
    name: 'Brown Trousers',
    description: 'Classic brown trousers for any occasion',
    price: 59.99,
    imageUrl: '/Pictures/brown Trousers.avif',
    category: 'Trousers',
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['Brown', 'Dark Brown', 'Tan'],
    stock: 25,
    createdAt: new Date(),
    rating: 4.4
  },

  // Models
  {
    name: 'Model 1',
    description: 'Fashion model showcasing latest trends',
    price: 0,
    imageUrl: '/Pictures/Model1.avif',
    category: 'Models',
    sizes: [],
    colors: [],
    stock: 0,
    createdAt: new Date(),
    rating: 4.7
  },
  {
    name: 'Model 2',
    description: 'Professional model in casual wear',
    price: 0,
    imageUrl: '/Pictures/Model2.avif',
    category: 'Models',
    sizes: [],
    colors: [],
    stock: 0,
    createdAt: new Date(),
    rating: 4.8
  },
  {
    name: 'Model 3',
    description: 'Fashion model in street style',
    price: 0,
    imageUrl: '/Pictures/MOdel3.avif',
    category: 'Models',
    sizes: [],
    colors: [],
    stock: 0,
    createdAt: new Date(),
    rating: 4.6
  },
  {
    name: 'Model 4',
    description: 'Professional model in urban fashion',
    price: 0,
    imageUrl: '/Pictures/Model4.avif',
    category: 'Models',
    sizes: [],
    colors: [],
    stock: 0,
    createdAt: new Date(),
    rating: 4.9
  },
  {
    name: 'Model 5',
    description: 'Fashion model in contemporary style',
    price: 0,
    imageUrl: '/Pictures/Model5.avif',
    category: 'Models',
    sizes: [],
    colors: [],
    stock: 0,
    createdAt: new Date(),
    rating: 4.5
  },
  {
    name: 'Model 6',
    description: 'Professional model in modern fashion',
    price: 0,
    imageUrl: '/Pictures/Model6.jpg',
    category: 'Models',
    sizes: [],
    colors: [],
    stock: 0,
    createdAt: new Date(),
    rating: 4.7
  },
  {
    name: 'Model 7',
    description: 'Fashion model in trendy attire',
    price: 0,
    imageUrl: '/Pictures/Model7.jpg',
    category: 'Models',
    sizes: [],
    colors: [],
    stock: 0,
    createdAt: new Date(),
    rating: 4.8
  },
  {
    name: 'Model 8',
    description: 'Professional model in casual chic',
    price: 0,
    imageUrl: '/Pictures/Model8.avif',
    category: 'Models',
    sizes: [],
    colors: [],
    stock: 0,
    createdAt: new Date(),
    rating: 4.9
  }
]; 