export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  sizes: string[];
  colors: string[];
  stock: number;
  discount?: number; // Optional discount percentage
  rating?: number; // Optional product rating (e.g., 1-5)
  createdAt?: Date; // Optional creation date
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Cart {
  items: CartItem[];
  // Add other potential cart properties here later if needed, e.g.:
  // userId?: string;
  // lastUpdated?: Date;
} 