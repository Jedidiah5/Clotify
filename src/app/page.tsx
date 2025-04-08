'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/lib/types';
import ProductGrid from '@/components/ProductGrid';
import ShoppingCart from '@/components/ShoppingCart';
import Navigation from '@/components/Navigation';
import FlashSale from '@/components/FlashSale';
import { initialProducts } from '@/lib/data/products';
import { useCart } from '@/lib/hooks/useCart';
import { toast } from 'react-hot-toast';
import ProductModal from '@/components/ProductModal';

export default function Home() {
  // Initialize products with proper IDs
  const [products] = useState<Product[]>(() =>
    initialProducts.map((product, index) => ({
      ...product,
      id: `product-${index + 1}`,
      createdAt: new Date()
    }))
  );
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Home');
  const [mounted, setMounted] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  
  const { 
    cartItems, 
    addToCart, 
    updateQuantity, 
    removeItem, 
    getCartTotal, 
    getCartItemsCount 
  } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddToCart = (product: Product, size: string, color: string) => {
    if (!size || !color) {
      toast.error('Please select both size and color');
      return;
    }
    addToCart(product, size, color);
    toast.success(`Added ${product.name} to cart!`, {
      position: 'bottom-right',
    });
  };

  const handleUpdateQuantity = (itemId: string, size: string, color: string, quantity: number) => {
    updateQuantity(itemId, size, color, quantity);
  };

  const handleRemoveItem = (itemId: string, size: string, color: string) => {
    removeItem(itemId, size, color);
    toast.success('Item removed from cart', {
      position: 'bottom-right',
    });
  };

  const handleProductClick = (product: Product) => {
    setSelectedProductForModal(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProductForModal(null);
  };

  const handleProductSelect = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      handleProductClick(product);
    } else {
      setSelectedProductId(productId);
      const element = document.getElementById(`product-${productId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('ring-4', 'ring-primary', 'ring-opacity-50');
        setTimeout(() => {
          element.classList.remove('ring-4', 'ring-primary', 'ring-opacity-50');
        }, 2000);
      }
    }
  };

  const filteredProducts = selectedCategory === 'Home'
    ? products.filter(product => product.category !== 'Models')
    : products.filter(product => product.category === selectedCategory);

  // Handle escape key to close cart
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowCart(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  if (!mounted) {
    // Show a loading indicator while the component is mounting
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        products={products}
        onProductSelect={handleProductSelect}
        cartTotal={getCartTotal()}
        cartCount={getCartItemsCount()}
        showCart={showCart}
        onToggleCart={() => setShowCart(!showCart)}
      />

      <main className="max-w-[1440px] mx-auto px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="w-full max-w-6xl mx-auto">
            {selectedCategory === 'Home' && (
              <>
                <FlashSale products={products} onAddToCart={handleAddToCart} />
                
                <div className="text-center my-12">
                  <h2 className="text-3xl font-bold text-primary mb-2">Deals of the Week</h2>
                  <p className="text-gray-400">Discover our best-selling items at great prices</p>
                </div>
              </>
            )}

            <ProductGrid 
              products={filteredProducts} 
              onAddToCart={handleAddToCart}
              showModels={selectedCategory === 'Models'}
              onProductClick={handleProductClick}
            />
          </div>
        </div>
      </main>

      <div className={`fixed top-24 right-8 w-full max-w-md transform transition-all duration-300 ease-in-out ${
        showCart ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}>
        {showCart && (
          <ShoppingCart
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClose={() => setShowCart(false)}
          />
        )}
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={selectedProductForModal}
        onAddToCart={handleAddToCart}
        allProducts={products}
      />
    </div>
  );
}
