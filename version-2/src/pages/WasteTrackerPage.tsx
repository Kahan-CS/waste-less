import React, { useState } from 'react';
import { format } from 'date-fns';
import { BarChart2, Trash2, PlusCircle } from 'lucide-react';
import RecipeCard from '../components/RecipeCard';
import { useAppContext } from '../context/AppContext';
import { groceryItems } from '../data/groceryItems';

const WasteTrackerPage: React.FC = () => {
  const { wasteLog, logWaste, recommendedRecipes } = useAppContext();
  const [itemId, setItemId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState('');
  
  const handleLogWaste = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (itemId === '') return;
    
    const selectedItem = groceryItems.find(item => item.id === itemId);
    if (!selectedItem) return;
    
    logWaste({
      itemId,
      itemName: selectedItem.name,
      quantity,
      reason
    });
    
    setItemId('');
    setQuantity(1);
    setReason('');
  };
  
  // Group waste logs by item name
  const wasteByItem: Record<string, number> = {};
  wasteLog.forEach(log => {
    wasteByItem[log.itemName] = (wasteByItem[log.itemName] || 0) + log.quantity;
  });
  
  // Sort items by waste quantity
  const sortedWasteItems = Object.entries(wasteByItem)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Waste Tracker</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Log Waste Form */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Log Wasted Food</h2>
            
            <form onSubmit={handleLogWaste}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Item
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={itemId}
                    onChange={(e) => setItemId(e.target.value)}
                    required
                  >
                    <option value="">Select an item</option>
                    {groceryItems.map(item => (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason (optional)
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows={2}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Why did this food go to waste?"
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="bg-gradient-to-r from-[#386641] to-[#6A994E] text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity flex items-center"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Log Waste
              </button>
            </form>
          </div>
          
          {/* Waste Log */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Waste History</h2>
            
            {wasteLog.length === 0 ? (
              <div className="text-center py-8">
                <Trash2 className="h-12 w-12 mx-auto text-gray-400" />
                <p className="mt-2 text-gray-500">No waste logged yet</p>
              </div>
            ) : (
              <div className="divide-y">
                {wasteLog.slice().reverse().map(log => (
                  <div key={log.id} className="py-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{log.itemName}</h3>
                        <p className="text-sm text-gray-600">
                          Quantity: {log.quantity} • {format(new Date(log.date), 'MMM d, yyyy')}
                        </p>
                        {log.reason && (
                          <p className="text-sm text-gray-600 mt-1">
                            Reason: {log.reason}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          {/* Waste Statistics */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Waste Statistics</h2>
            
            {sortedWasteItems.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No data available yet</p>
            ) : (
              <div>
                <h3 className="text-sm font-medium mb-3">Most Wasted Items</h3>
                
                <div className="space-y-4">
                  {sortedWasteItems.map(([itemName, quantity]) => (
                    <div key={itemName}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{itemName}</span>
                        <span>{quantity} units</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-[#386641] to-[#6A994E] h-2 rounded-full" 
                          style={{ width: `${(quantity / sortedWasteItems[0][1]) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Recommended Recipes */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Recommended Recipes</h2>
            <p className="text-sm text-gray-600 mb-4">
              Based on your waste tracking, we recommend these recipes to help reduce food waste.
            </p>
            
            <div className="space-y-6">
              {recommendedRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WasteTrackerPage;