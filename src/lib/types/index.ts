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
  createdAt: Date;
  discount?: {
    percentage: number;
    endDate: Date;
  };
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface User {
  id: string;
  email: string;
  isAdmin: boolean;
}

export interface Cart {
  userId: string;
  items: CartItem[];
  total: number;
} 