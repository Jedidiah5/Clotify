import React, { useState, useEffect } from 'react';
import { Product } from '@/lib/types';
import Image from 'next/image';
import { X, Star } from 'lucide-react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  allProducts: Product[]; // To find related products
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose, onAddToCart, allProducts }) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (product) {
      setSelectedSize('');
      setSelectedColor('');
      // Find related products (same category, excluding current product)
      const related = allProducts
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 3); // Show up to 3 related products
      setRelatedProducts(related);
    } else {
      setRelatedProducts([]);
    }
  }, [product, allProducts]);

  const handleAddToCartClick = () => {
    if (product && selectedSize && selectedColor) {
      onAddToCart(product, selectedSize, selectedColor);
      onClose(); // Close modal after adding to cart
    }
  };

  const renderStars = (rating: number | undefined) => {
    if (rating === undefined) return null;
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="h-5 w-5 text-yellow-400 fill-current" />
        ))}
        {halfStar && <Star key="half" className="h-5 w-5 text-yellow-400 fill-current" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="h-5 w-5 text-gray-600" />
        ))}
        <span className="ml-2 text-sm text-gray-400">({rating.toFixed(1)})</span>
      </div>
    );
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-gray-900 p-6 text-left align-middle shadow-xl transition-all border border-primary/30">
                {product && (
                  <>
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-medium leading-6 text-gray-200 mb-4 flex justify-between items-center"
                    >
                      {product.name}
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent p-1 text-gray-400 hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                        onClick={onClose}
                      >
                        <X className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </Dialog.Title>
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative h-80 w-full rounded-lg overflow-hidden">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover object-center"
                        />
                      </div>
                      <div className="space-y-4">
                        <p className="text-sm text-gray-400">{product.description}</p>
                        <div className="flex justify-between items-center">
                          <p className="text-2xl font-bold text-primary">
                            ${product.price.toFixed(2)}
                          </p>
                          {renderStars(product.rating)}
                        </div>
                        <p className="text-sm text-gray-400">Stock: {product.stock}</p>
                        
                        {/* Size Selection */}
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-300">Select Size</label>
                          <div className="flex flex-wrap gap-2">
                            {product.sizes.map(size => (
                              <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`px-3 py-1 rounded-md text-sm border transition-colors ${selectedSize === size ? 'bg-primary text-white border-primary' : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-primary hover:text-primary'}`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        {/* Color Selection */}
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-300">Select Color</label>
                          <div className="flex flex-wrap gap-2">
                            {product.colors.map(color => (
                              <button
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={`px-3 py-1 rounded-md text-sm border transition-colors capitalize ${selectedColor === color ? 'bg-primary text-white border-primary' : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-primary hover:text-primary'}`}
                              >
                                {color}
                              </button>
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={handleAddToCartClick}
                          disabled={!selectedSize || !selectedColor || product.stock === 0}
                          className={`w-full py-3 px-4 rounded-md font-semibold transition-all duration-300 ${!selectedSize || !selectedColor || product.stock === 0 ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary-dark hover:scale-105 shadow-lg'}`}
                        >
                          {product.stock === 0 ? 'Out of Stock' : (!selectedSize || !selectedColor ? 'Select Size & Color' : 'Add to Cart')}
                        </button>
                        
                        <p className="text-xs text-gray-500">Estimated Delivery: 3-5 business days</p>
                      </div>
                    </div>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                      <div className="mt-8 pt-6 border-t border-gray-700">
                        <h4 className="text-lg font-medium text-gray-300 mb-4">You might also like</h4>
                        <div className="grid grid-cols-3 gap-4">
                          {relatedProducts.map(related => (
                            <div key={related.id} className="text-center">
                              <div className="relative h-32 w-full rounded-md overflow-hidden mb-2">
                                <Image 
                                  src={related.imageUrl} 
                                  alt={related.name} 
                                  fill 
                                  sizes="33vw"
                                  className="object-cover"
                                />
                              </div>
                              <p className="text-xs text-gray-400 truncate">{related.name}</p>
                              <p className="text-sm font-semibold text-primary">${related.price.toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProductModal; 