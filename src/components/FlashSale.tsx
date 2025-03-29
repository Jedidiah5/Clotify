import { Product } from '@/lib/types';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';

interface FlashSaleProps {
  products: Product[];
  onAddToCart: (product: Product, size: string, color: string) => void;
}

export default function FlashSale({ products, onAddToCart }: FlashSaleProps) {
  const discountedProducts = products.filter(product => product.discount).slice(0, 4);

  if (discountedProducts.length === 0) return null;

  return (
    <div className="w-full py-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-primary mb-2">Flash Sale</h2>
        <p className="text-gray-400">Limited time offers! Don&apos;t miss out!</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {discountedProducts.map((product) => {
          const discountedPrice = product.price * (1 - (product.discount?.percentage || 0) / 100);
          const timeLeft = product.discount?.endDate 
            ? formatDistanceToNow(product.discount.endDate, { addSuffix: true })
            : '';

          return (
            <div
              key={product.id}
              className="bg-gray-900 rounded-lg overflow-hidden border-2 border-primary/50 hover:border-primary transition-all duration-300"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                  {product.discount?.percentage}% OFF
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-200 mb-1">{product.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-gray-400 line-through">${product.price.toFixed(2)}</span>
                  <span className="text-primary font-bold">${discountedPrice.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-400 mb-3">Ends {timeLeft}</p>
                
                <button
                  onClick={() => onAddToCart(product, product.sizes[0], product.colors[0])}
                  className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors duration-200"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 