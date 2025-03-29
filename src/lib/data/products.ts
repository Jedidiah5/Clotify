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
    }
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
    }
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
    createdAt: new Date()
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
    }
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
    createdAt: new Date()
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
    }
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
    createdAt: new Date()
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
    createdAt: new Date()
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
    createdAt: new Date()
  },

  // Accessories
  {
    name: 'Stylish Hoodie',
    description: 'Comfortable and warm hoodie for casual wear',
    price: 49.99,
    imageUrl: '/Pictures/hoodie.avif',
    category: 'Accessories',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Grey', 'Black', 'Navy'],
    stock: 40,
    createdAt: new Date()
  },
  {
    name: 'Kids Rain Coat',
    description: 'Waterproof rain coat for children',
    price: 39.99,
    imageUrl: '/Pictures/babyraincoat.avif',
    category: 'Accessories',
    sizes: ['2T', '3T', '4T', '5T'],
    colors: ['Yellow', 'Blue', 'Pink'],
    stock: 30,
    createdAt: new Date()
  },
  {
    name: 'Trench Coat',
    description: 'Classic trench coat for all occasions',
    price: 149.99,
    imageUrl: '/Pictures/trenchcoat.avif',
    category: 'Accessories',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Beige', 'Black', 'Navy'],
    stock: 15,
    createdAt: new Date()
  }
]; 