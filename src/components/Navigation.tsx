import { Product } from '@/lib/types';
import SearchBar from './SearchBar';

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
  const categories = ['All', 'T-Shirts', 'Jackets', 'Dresses', 'Accessories'];

  return (
    <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="h-20 flex items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-primary hover:scale-105 transition-transform duration-300 cursor-pointer">
              Clotify
            </h1>
          </div>

          {/* Categories */}
          <div className="hidden md:flex items-center space-x-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`text-sm font-medium transition-colors duration-200 whitespace-nowrap px-2 py-1 rounded-lg ${
                  selectedCategory === category
                    ? 'text-primary border-2 border-primary bg-primary bg-opacity-10'
                    : 'text-gray-400 hover:text-primary hover:bg-primary hover:bg-opacity-5'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="flex-grow max-w-md">
            <SearchBar 
              products={products} 
              onSelectProduct={onProductSelect}
            />
          </div>

          {/* Cart Section */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            <div className="text-sm text-gray-300">
              ${cartTotal.toFixed(2)}
            </div>
            <button
              onClick={onToggleCart}
              className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded flex items-center transform hover:scale-105 transition-all duration-300 ease-in-out relative"
            >
              <span className="mr-2">Cart</span>
              <span className="bg-white text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Categories */}
        <div className="md:hidden overflow-x-auto flex items-center py-4 gap-4 no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`text-sm font-medium transition-colors duration-200 whitespace-nowrap px-2 py-1 rounded-lg flex-shrink-0 ${
                selectedCategory === category
                  ? 'text-primary border-2 border-primary bg-primary bg-opacity-10'
                  : 'text-gray-400 hover:text-primary hover:bg-primary hover:bg-opacity-5'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
} 