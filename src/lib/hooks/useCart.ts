import { useState, useEffect } from 'react';
import { Product, CartItem } from '@/lib/types';

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    setIsCartLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isCartLoaded) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isCartLoaded]);

  const addToCart = (product: Product, size: string, color: string) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.id === product.id && item.selectedSize === size && item.selectedColor === color
      );

      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id && item.selectedSize === size && item.selectedColor === color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, {
        ...product,
        quantity: 1,
        selectedSize: size,
        selectedColor: color
      }];
    });
  };

  const updateQuantity = (itemId: string, size: string, color: string, quantity: number) => {
    setCartItems(prevItems => {
      if (quantity === 0) {
        return prevItems.filter(
          item => !(item.id === itemId && item.selectedSize === size && item.selectedColor === color)
        );
      }

      return prevItems.map(item =>
        item.id === itemId && item.selectedSize === size && item.selectedColor === color
          ? { ...item, quantity }
          : item
      );
    });
  };

  const removeItem = (itemId: string, size: string, color: string) => {
    setCartItems(prevItems =>
      prevItems.filter(
        item => !(item.id === itemId && item.selectedSize === size && item.selectedColor === color)
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    getCartTotal,
    getCartItemsCount,
  };
} 