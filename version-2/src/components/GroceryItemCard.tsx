import React from 'react';
import { ShoppingCart, Clock } from 'lucide-react';
import { GroceryItem } from '../types';
import { useAppContext } from '../context/AppContext';

interface GroceryItemCardProps {
  item: GroceryItem;
}

const GroceryItemCard: React.FC<GroceryItemCardProps> = ({ item }) => {
  const { addToCart, updateGroceryItemThreshold } = useAppContext();
  
  const progressPercentage = Math.min(100, (item.currentOrders / item.threshold) * 100);
  
  const handleAddToCart = () => {
    addToCart(item);
    
    // Check if threshold is met after adding to cart
    if (item.currentOrders + 1 >= item.threshold) {
      updateGroceryItemThreshold(item.id);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img 
          src={`${item.image}?w=400&h=300&fit=crop`} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <span className="text-green-700 font-bold">${item.price.toFixed(2)}/{item.unit}</span>
        </div>
        
        <p className="text-gray-600 text-sm mt-1">{item.description}</p>
        
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-gray-600">Order progress</span>
            <span className="text-sm font-medium">{item.currentOrders}/{item.threshold}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-gradient-to-r from-[#386641] to-[#6A994E] h-2.5 rounded-full" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex items-center mt-2 text-sm text-gray-600">
          <Clock className="h-4 w-4 mr-1" />
          <span>Est. {item.estimatedDays.toFixed(1)} days until shipping</span>
        </div>
        
        <button 
          onClick={handleAddToCart}
          className="mt-4 w-full bg-gradient-to-r from-[#386641] to-[#6A994E] text-white py-2 rounded-md flex items-center justify-center hover:opacity-90 transition-opacity"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default GroceryItemCard;