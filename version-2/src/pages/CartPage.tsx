import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import CartItem from '../components/CartItem';
import { useAppContext } from '../context/AppContext';

const CartPage: React.FC = () => {
  const { cart } = useAppContext();
  
  const subtotal = cart.reduce((total, item) => total + (item.item.price * item.quantity), 0);
  
  // Group cart items by their threshold status
  const readyToShip = cart.filter(item => item.item.currentOrders >= item.item.threshold);
  const waitingForThreshold = cart.filter(item => item.item.currentOrders < item.item.threshold);
  
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto text-gray-400" />
        <h2 className="text-2xl font-bold mt-4 mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some items to your cart to get started.</p>
        <a 
          href="/"
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#386641] to-[#6A994E] text-white rounded-md hover:opacity-90 transition-opacity"
        >
          Continue Shopping
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {readyToShip.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-green-700 flex items-center">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Ready to Ship
              </h2>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                {readyToShip.map(item => (
                  <CartItem key={item.item.id} cartItem={item} />
                ))}
              </div>
            </div>
          )}
          
          {waitingForThreshold.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4 text-orange-700 flex items-center">
                <span className="inline-block w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
                Waiting for Threshold
              </h2>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                {waitingForThreshold.map(item => (
                  <CartItem key={item.item.id} cartItem={item} />
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">$0.00</span>
              </div>
              
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <button 
              className="w-full bg-gradient-to-r from-[#386641] to-[#6A994E] text-white py-3 rounded-md hover:opacity-90 transition-opacity"
            >
              Proceed to Checkout
            </button>
            
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">How it works:</h3>
              <p className="text-xs text-gray-600">
                Items are only shipped when they reach their order threshold. This helps us get better prices and reduce waste.
                You'll only be charged when items are ready to ship.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;