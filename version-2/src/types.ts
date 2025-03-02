export interface GroceryItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  threshold: number;
  currentOrders: number;
  estimatedDays: number;
  unit: string;
}

export interface CartItem {
  item: GroceryItem;
  quantity: number;
}

export interface WasteLog {
  id: string;
  itemId: string;
  itemName: string;
  quantity: number;
  date: string;
  reason: string;
}

export interface GroceryListItem {
  id: string;
  name: string;
  quantity: number;
  completed: boolean;
}

export interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string;
  image: string;
}