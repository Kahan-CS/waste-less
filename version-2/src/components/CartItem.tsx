import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../types';
import { useAppContext } from '../context/AppContext';

interface CartItemProps {
  cartItem: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ cartItem }) => {
  const { updateCartItemQuantity, removeFromCart } = useAppContext();
  const { item, quantity } = cartItem;
  
  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
        <img 
          src={`${item.image}?w=80&h=80&fit=crop`} 
          alt={item.name} 
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex-1">
        <h3 className="text-base font-medium text-gray-900">{item.name}</h3>
        <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)}/{item.unit}</p>
      </div>
      
      <div className="flex items-center">
        <button 
          onClick={() => updateCartItemQuantity(item.id, quantity - 1)}
          className="text-gray-500 hover:text-gray-700 p-1"
        >
          <Minus className="h-4 w-4" />
        </button>
        
        <span className="mx-2 text-gray-700 w-6 text-center">{quantity}</span>
        
        <button 
          onClick={() => updateCartItemQuantity(item.id, quantity + 1)}
          className="text-gray-500 hover:text-gray-700 p-1"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      
      <div className="ml-4 text-right">
        <p className="text-base font-medium text-gray-900">
          ${(item.price * quantity).toFixed(2)}
        </p>
        
        <button 
          onClick={() => removeFromCart(item.id)}
          className="mt-1 text-sm text-red-500 hover:text-red-700 flex items-center justify-end"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;