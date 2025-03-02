import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import GroceryItemCard from '../components/GroceryItemCard';
import RecipeCard from '../components/RecipeCard';
import { useAppContext } from '../context/AppContext';

const HomePage: React.FC = () => {
  const { groceryItems, recommendedRecipes } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  const categories = Array.from(new Set(groceryItems.map(item => item.category)));
  
  const filteredItems = groceryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Recommended Recipes Section */}
      {recommendedRecipes.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Recommended Recipes</h2>
          <p className="text-gray-600 mb-6">Based on your waste tracking, we recommend these recipes to help reduce food waste.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      )}
      
      {/* Search and Filter */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for groceries..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Grocery Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map(item => (
          <GroceryItemCard key={item.id} item={item} />
        ))}
      </div>
      
      {filteredItems.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">No grocery items found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;