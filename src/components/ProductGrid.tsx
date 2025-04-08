import { useState } from 'react';
import { Product } from '@/lib/types';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product, size: string, color: string) => void;
  showModels?: boolean;
  onProductClick: (product: Product) => void;
}

export default function ProductGrid({ products, onAddToCart, showModels = false, onProductClick }: ProductGridProps) {
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({});
  const [selectedColors, setSelectedColors] = useState<{ [key: string]: string }>({});
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const handleSizeChange = (productId: string, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const handleColorChange = (productId: string, color: string) => {
    setSelectedColors(prev => ({ ...prev, [productId]: color }));
  };

  const isModel = (product: Product) => product.category === 'Models';
  
  // Filter out Models if showModels is false
  const filteredProducts = showModels ? products : products.filter(product => !isModel(product));

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
        {filteredProducts.map((product, index) => (
          <div
            key={product.id}
            id={`product-${product.id}`}
            className="group w-full max-w-sm bg-gray-900 rounded-lg overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-105 border-2 border-primary/50 hover:border-primary hover:shadow-xl hover:shadow-primary/20 relative cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
            onClick={() => onProductClick(product)}
          >
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                className={`object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-110 ${hoveredProduct === product.id ? 'scale-110' : 'scale-100'}`}
              />
              
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <ShoppingCart className="h-12 w-12 text-primary transform scale-0 group-hover:scale-100 transition-transform duration-300" />
              </div>

              {!isModel(product) && product.stock < 10 && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm animate-bounce shadow-lg z-10">
                  Only {product.stock} left!
                </div>
              )}
            </div>
            <div className="p-4 space-y-2 text-center">
              <h3 className="text-md font-semibold text-gray-200 truncate">{product.name}</h3>
              {!isModel(product) && (
                <p className="text-primary text-lg font-bold">
                  ${product.price.toFixed(2)}
                </p>
              )}
              {isModel(product) && (
                <p className="text-sm text-gray-400 italic">Model Showcase</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 