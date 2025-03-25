import { useState } from 'react';
import { Product } from '@/lib/types';
import Image from 'next/image';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product, size: string, color: string) => void;
}

export default function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({});
  const [selectedColors, setSelectedColors] = useState<{ [key: string]: string }>({});
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const handleSizeChange = (productId: string, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const handleColorChange = (productId: string, color: string) => {
    setSelectedColors(prev => ({ ...prev, [productId]: color }));
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
        {products.map((product, index) => (
          <div
            key={product.id}
            id={`product-${product.id}`}
            className="w-full max-w-sm bg-gray-900 rounded-lg overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-105 border-2 border-primary border-opacity-50 hover:border-opacity-100 hover:shadow-xl hover:shadow-primary/20"
            style={{ animationDelay: `${index * 100}ms` }}
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                className={`object-cover object-center transition-transform duration-500 ease-in-out ${
                  hoveredProduct === product.id ? 'scale-110' : 'scale-100'
                }`}
              />
              {product.stock < 10 && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm animate-bounce shadow-lg">
                  Only {product.stock} left!
                </div>
              )}
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-200">{product.name}</h3>
              <p className="text-sm text-gray-400">{product.description}</p>
              <div className="flex justify-between items-center">
                <p className="text-primary text-xl font-bold transform transition-all duration-300 hover:scale-110">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-sm text-gray-400">Stock: {product.stock}</p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor={`size-${product.id}`} className="block text-sm font-medium text-gray-300">
                    Select Size
                  </label>
                  <select
                    id={`size-${product.id}`}
                    className="w-full p-2 bg-primary/5 border border-gray-700 rounded-md text-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer hover:bg-primary/10 transition-colors duration-200"
                    value={selectedSizes[product.id] || ''}
                    onChange={(e) => handleSizeChange(product.id, e.target.value)}
                  >
                    <option value="">Choose a size</option>
                    {product.sizes.map((size) => (
                      <option key={size} value={size} className="bg-gray-800">
                        {size}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor={`color-${product.id}`} className="block text-sm font-medium text-gray-300">
                    Select Color
                  </label>
                  <select
                    id={`color-${product.id}`}
                    className="w-full p-2 bg-primary/5 border border-gray-700 rounded-md text-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer hover:bg-primary/10 transition-colors duration-200"
                    value={selectedColors[product.id] || ''}
                    onChange={(e) => handleColorChange(product.id, e.target.value)}
                  >
                    <option value="">Choose a color</option>
                    {product.colors.map((color) => (
                      <option key={color} value={color} className="bg-gray-800">
                        {color}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => {
                    if (selectedSizes[product.id] && selectedColors[product.id]) {
                      onAddToCart(
                        product,
                        selectedSizes[product.id],
                        selectedColors[product.id]
                      );
                    }
                  }}
                  disabled={!selectedSizes[product.id] || !selectedColors[product.id] || product.stock === 0}
                  className={`w-full py-3 px-4 rounded-md font-semibold transition-all duration-300 ${
                    !selectedSizes[product.id] || !selectedColors[product.id] || product.stock === 0
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-primary text-white hover:bg-primary-dark hover:scale-105 shadow-lg'
                  }`}
                >
                  {product.stock === 0 
                    ? 'Out of Stock' 
                    : !selectedSizes[product.id] || !selectedColors[product.id]
                      ? 'Select Size & Color'
                      : 'Add to Cart'
                  }
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 