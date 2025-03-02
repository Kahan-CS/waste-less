import React from 'react';
import { Check, Trash2 } from 'lucide-react';
import { GroceryListItem as GroceryListItemType } from '../types';
import { useAppContext } from '../context/AppContext';

interface GroceryListItemProps {
  item: GroceryListItemType;
}

const GroceryListItem: React.FC<GroceryListItemProps> = ({ item }) => {
  const { toggleGroceryListItem, removeFromGroceryList } = useAppContext();
  
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-200">
      <div className="flex items-center">
        <button 
          onClick={() => toggleGroceryListItem(item.id)}
          className={`h-5 w-5 rounded-full border flex items-center justify-center mr-3 ${
            item.completed 
              ? 'bg-green-600 border-green-600 text-white' 
              : 'border-gray-400'
          }`}
        >
          {item.completed && <Check className="h-3 w-3" />}
        </button>
        
        <span className={`${item.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
          {item.name} {item.quantity > 1 ? `(${item.quantity})` : ''}
        </span>
      </div>
      
      <button 
        onClick={() => removeFromGroceryList(item.id)}
        className="text-gray-500 hover:text-red-500"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
};

export default GroceryListItem;