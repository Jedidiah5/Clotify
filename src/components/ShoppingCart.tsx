import { CartItem } from '@/lib/types';
import { XMarkIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface ShoppingCartProps {
  items: CartItem[];
  onUpdateQuantity: (itemId: string, size: string, color: string, quantity: number) => void;
  onRemoveItem: (itemId: string, size: string, color: string) => void;
  onClose: () => void;
}

export default function ShoppingCart({ items, onUpdateQuantity, onRemoveItem, onClose }: ShoppingCartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg transform transition-all duration-200 hover:shadow-md"
              >
                <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    Size: {item.selectedSize} | Color: {item.selectedColor}
                  </p>
                  <p className="text-primary font-medium">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <button
                    onClick={() => onRemoveItem(item.id, item.selectedSize, item.selectedColor)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                  <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-200 p-1">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
                      disabled={item.quantity <= 1}
                    >
                      <MinusIcon className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-lg font-medium">${total.toFixed(2)}</span>
            </div>
            <button
              className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-dark transform hover:scale-[1.02] transition-all duration-200"
              onClick={() => {
                // TODO: Implement checkout functionality
                alert('Checkout functionality coming soon!');
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
} 