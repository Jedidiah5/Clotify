import { Product } from '@/lib/types';
import SearchBar from './SearchBar';
import { useState } from 'react';

interface NavigationProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  products: Product[];
  onProductSelect: (productId: string) => void;
  cartTotal: number;
  cartCount: number;
  showCart: boolean;
  onToggleCart: () => void;
}

export default function Navigation({
  selectedCategory,
  onCategoryChange,
  products,
  onProductSelect,
  cartTotal,
  cartCount,
  showCart,
  onToggleCart
}: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const categories = [
    'Home',
    'T-Shirts',
    'Jackets',
    'Trousers',
    'Models'
  ];

  const handleCategoryChange = (category: string) => {
    onCategoryChange(category);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="h-16 sm:h-20 flex items-center justify-between gap-4 sm:gap-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl sm:text-2xl font-bold text-primary hover:scale-105 transition-transform duration-300 cursor-pointer">
              Clotify
            </h1>
          </div>

          {/* Desktop Categories */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`text-sm font-medium transition-colors duration-200 whitespace-nowrap px-2 py-1 rounded-lg ${
                  selectedCategory === category
                    ? 'text-primary border-2 border-primary bg-primary bg-opacity-10'
                    : 'text-gray-400 hover:text-primary hover:bg-primary hover:bg-opacity-5'
                }`}
                aria-current={selectedCategory === category ? 'page' : undefined}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:block flex-grow max-w-md">
            <SearchBar 
              products={products} 
              onSelectProduct={onProductSelect}
            />
          </div>

          {/* Cart Section */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            <div className="hidden sm:block text-sm text-gray-300">
              ${cartTotal.toFixed(2)}
            </div>
            <button
              onClick={onToggleCart}
              className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-3 sm:px-4 rounded flex items-center transform hover:scale-105 transition-all duration-300 ease-in-out relative"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <span className="hidden sm:inline mr-2">Cart</span>
              <span className="bg-white text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`block w-full h-0.5 bg-white transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-full h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-full h-0.5 bg-white transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-2">
            {/* Mobile Search Bar */}
            <div className="mb-4">
              <SearchBar 
                products={products} 
                onSelectProduct={onProductSelect}
              />
            </div>

            {/* Mobile Categories */}
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'text-primary bg-primary bg-opacity-10'
                    : 'text-gray-400 hover:text-primary hover:bg-primary hover:bg-opacity-5'
                }`}
                aria-current={selectedCategory === category ? 'page' : undefined}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
} 