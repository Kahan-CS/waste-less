import React, { useState } from 'react';
import { Plus, ClipboardList } from 'lucide-react';
import GroceryListItem from '../components/GroceryListItem';
import { useAppContext } from '../context/AppContext';

const GroceryListPage: React.FC = () => {
  const { groceryList, addToGroceryList } = useAppContext();
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState(1);
  
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newItemName.trim() === '') return;
    
    addToGroceryList({
      name: newItemName.trim(),
      quantity: newItemQuantity,
      completed: false
    });
    
    setNewItemName('');
    setNewItemQuantity(1);
  };
  
  const completedItems = groceryList.filter(item => item.completed);
  const incompleteItems = groceryList.filter(item => !item.completed);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">My Grocery List</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleAddItem} className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Add an item..."
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
            />
            
            <input
              type="number"
              min="1"
              className="w-16 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={newItemQuantity}
              onChange={(e) => setNewItemQuantity(parseInt(e.target.value) || 1)}
            />
            
            <button 
              type="submit"
              className="bg-gradient-to-r from-[#386641] to-[#6A994E] text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity flex items-center"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </button>
          </form>
          
          {incompleteItems.length === 0 && completedItems.length === 0 ? (
            <div className="text-center py-8">
              <ClipboardList className="h-12 w-12 mx-auto text-gray-400" />
              <p className="mt-2 text-gray-500">Your grocery list is empty</p>
            </div>
          ) : (
            <div>
              {incompleteItems.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-medium mb-3">To Buy</h2>
                  {incompleteItems.map(item => (
                    <GroceryListItem key={item.id} item={item} />
                  ))}
                </div>
              )}
              
              {completedItems.length > 0 && (
                <div>
                  <h2 className="text-lg font-medium mb-3">Completed</h2>
                  {completedItems.map(item => (
                    <GroceryListItem key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroceryListPage;