import { useState, useEffect, useRef } from 'react';
import { Product } from '@/lib/types';
import Image from 'next/image';

interface SearchBarProps {
  products: Product[];
  onSelectProduct: (productId: string) => void;
}

export default function SearchBar({ products, onSelectProduct }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = products.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    ).slice(0, 5); // Limit to 5 results

    setFilteredProducts(results);
  }, [searchQuery, products]);

  return (
    <div className="relative" ref={searchRef}>
      <div className="flex items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            className="w-64 px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            onClick={() => setSearchQuery('')}
            className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 ${
              !searchQuery && 'hidden'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <button
          className="ml-2 p-2 text-gray-400 hover:text-primary transition-colors duration-200"
          onClick={() => {
            setIsOpen(true);
            document.querySelector('input')?.focus();
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && filteredProducts.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-gray-900 rounded-lg shadow-lg border border-gray-700 max-h-96 overflow-auto">
          {filteredProducts.map((product) => (
            <div key={product.id} className="flex items-center p-2 hover:bg-gray-800 rounded cursor-pointer" onClick={() => {
              onSelectProduct(product.id);
              setIsOpen(false);
              setSearchQuery('');
            }}>
              <div className="relative w-12 h-12 mr-3 rounded overflow-hidden">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-200">{product.name}</p>
                <p className="text-xs text-gray-400">{product.category}</p>
              </div>
              <p className="text-sm font-semibold text-primary">${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 