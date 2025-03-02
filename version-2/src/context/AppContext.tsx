import React, { createContext, useContext, useState, useEffect } from 'react';
import { GroceryItem, CartItem, WasteLog, GroceryListItem, Recipe } from '../types';
import { groceryItems as initialGroceryItems } from '../data/groceryItems';
import { recipes as initialRecipes } from '../data/recipes';

interface AppContextType {
  groceryItems: GroceryItem[];
  cart: CartItem[];
  wasteLog: WasteLog[];
  groceryList: GroceryListItem[];
  recommendedRecipes: Recipe[];
  addToCart: (item: GroceryItem) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
  logWaste: (waste: Omit<WasteLog, 'id' | 'date'>) => void;
  addToGroceryList: (item: Omit<GroceryListItem, 'id'>) => void;
  removeFromGroceryList: (itemId: string) => void;
  toggleGroceryListItem: (itemId: string) => void;
  updateGroceryItemThreshold: (itemId: string) => void;
  getRecommendedRecipes: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>(() => {
    const savedItems = localStorage.getItem('groceryItems');
    return savedItems ? JSON.parse(savedItems) : initialGroceryItems;
  });
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [wasteLog, setWasteLog] = useState<WasteLog[]>(() => {
    const savedWasteLog = localStorage.getItem('wasteLog');
    return savedWasteLog ? JSON.parse(savedWasteLog) : [];
  });
  
  const [groceryList, setGroceryList] = useState<GroceryListItem[]>(() => {
    const savedGroceryList = localStorage.getItem('groceryList');
    return savedGroceryList ? JSON.parse(savedGroceryList) : [];
  });
  
  const [recommendedRecipes, setRecommendedRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    localStorage.setItem('groceryItems', JSON.stringify(groceryItems));
  }, [groceryItems]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wasteLog', JSON.stringify(wasteLog));
  }, [wasteLog]);

  useEffect(() => {
    localStorage.setItem('groceryList', JSON.stringify(groceryList));
  }, [groceryList]);

  const addToCart = (item: GroceryItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.item.id === item.id);
      
      if (existingItem) {
        return prevCart.map(cartItem => 
          cartItem.item.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        );
      } else {
        return [...prevCart, { item, quantity: 1 }];
      }
    });

    // Update current orders count for the item
    setGroceryItems(prevItems => 
      prevItems.map(groceryItem => 
        groceryItem.id === item.id 
          ? { ...groceryItem, currentOrders: groceryItem.currentOrders + 1 } 
          : groceryItem
      )
    );
  };

  const removeFromCart = (itemId: string) => {
    const itemToRemove = cart.find(item => item.item.id === itemId);
    if (!itemToRemove) return;

    setCart(prevCart => prevCart.filter(item => item.item.id !== itemId));

    // Update current orders count for the item
    setGroceryItems(prevItems => 
      prevItems.map(groceryItem => 
        groceryItem.id === itemId 
          ? { ...groceryItem, currentOrders: Math.max(0, groceryItem.currentOrders - itemToRemove.quantity) } 
          : groceryItem
      )
    );
  };

  const updateCartItemQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    const currentItem = cart.find(item => item.item.id === itemId);
    if (!currentItem) return;

    const quantityDifference = quantity - currentItem.quantity;

    setCart(prevCart => 
      prevCart.map(item => 
        item.item.id === itemId 
          ? { ...item, quantity } 
          : item
      )
    );

    // Update current orders count for the item
    setGroceryItems(prevItems => 
      prevItems.map(groceryItem => 
        groceryItem.id === itemId 
          ? { ...groceryItem, currentOrders: groceryItem.currentOrders + quantityDifference } 
          : groceryItem
      )
    );
  };

  const logWaste = (waste: Omit<WasteLog, 'id' | 'date'>) => {
    const newWaste: WasteLog = {
      ...waste,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };
    
    setWasteLog(prevLog => [...prevLog, newWaste]);
    getRecommendedRecipes();
  };

  const addToGroceryList = (item: Omit<GroceryListItem, 'id'>) => {
    const newItem: GroceryListItem = {
      ...item,
      id: Date.now().toString()
    };
    
    setGroceryList(prevList => [...prevList, newItem]);
  };

  const removeFromGroceryList = (itemId: string) => {
    setGroceryList(prevList => prevList.filter(item => item.id !== itemId));
  };

  const toggleGroceryListItem = (itemId: string) => {
    setGroceryList(prevList => 
      prevList.map(item => 
        item.id === itemId 
          ? { ...item, completed: !item.completed } 
          : item
      )
    );
  };

  const updateGroceryItemThreshold = (itemId: string) => {
    const item = groceryItems.find(item => item.id === itemId);
    if (!item || item.currentOrders < item.threshold) return;

    // Reset current orders and update estimated days based on historical data
    // In a real app, this would use more sophisticated algorithms
    setGroceryItems(prevItems => 
      prevItems.map(groceryItem => 
        groceryItem.id === itemId 
          ? { 
              ...groceryItem, 
              currentOrders: 0,
              // Simple adjustment to estimated days based on current value
              estimatedDays: (groceryItem.estimatedDays * 0.8 + 2.2) / 2
            } 
          : groceryItem
      )
    );
  };

  const getRecommendedRecipes = () => {
    // Get frequently wasted items
    const wastedItemCounts: Record<string, number> = {};
    wasteLog.forEach(log => {
      wastedItemCounts[log.itemName] = (wastedItemCounts[log.itemName] || 0) + 1;
    });

    // Sort items by waste frequency
    const sortedWastedItems = Object.entries(wastedItemCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([name]) => name);

    if (sortedWastedItems.length === 0) {
      setRecommendedRecipes(initialRecipes.slice(0, 2));
      return;
    }

    // Find recipes that use the most wasted ingredients
    const scoredRecipes = initialRecipes.map(recipe => {
      let score = 0;
      sortedWastedItems.forEach((item, index) => {
        if (recipe.ingredients.includes(item)) {
          // Higher score for more frequently wasted items
          score += (sortedWastedItems.length - index);
        }
      });
      return { recipe, score };
    });

    // Sort by score and get top recipes
    const topRecipes = scoredRecipes
      .sort((a, b) => b.score - a.score)
      .map(({ recipe }) => recipe)
      .slice(0, 3);

    setRecommendedRecipes(topRecipes.length > 0 ? topRecipes : initialRecipes.slice(0, 2));
  };

  useEffect(() => {
    getRecommendedRecipes();
  }, [wasteLog]);

  const value = {
    groceryItems,
    cart,
    wasteLog,
    groceryList,
    recommendedRecipes,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    logWaste,
    addToGroceryList,
    removeFromGroceryList,
    toggleGroceryListItem,
    updateGroceryItemThreshold,
    getRecommendedRecipes
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};