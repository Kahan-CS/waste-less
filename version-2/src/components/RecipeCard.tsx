import React from 'react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-40 overflow-hidden">
        <img 
          src={`${recipe.image}?w=400&h=300&fit=crop`} 
          alt={recipe.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{recipe.name}</h3>
        
        <div className="mb-3">
          <h4 className="text-sm font-medium text-gray-700 mb-1">Ingredients:</h4>
          <ul className="text-sm text-gray-600 list-disc list-inside">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-1">Instructions:</h4>
          <p className="text-sm text-gray-600">{recipe.instructions}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;