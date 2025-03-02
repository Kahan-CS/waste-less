import { GroceryItem } from '../types';

export const groceryItems: GroceryItem[] = [
  {
    id: '1',
    name: 'Organic Apples',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb',
    category: 'Fruits',
    description: 'Fresh organic apples from local farms',
    threshold: 10,
    currentOrders: 4,
    estimatedDays: 2,
    unit: 'lb'
  },
  {
    id: '2',
    name: 'Avocados',
    price: 1.49,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578',
    category: 'Fruits',
    description: 'Ripe and ready to eat avocados',
    threshold: 15,
    currentOrders: 7,
    estimatedDays: 3,
    unit: 'each'
  },
  {
    id: '3',
    name: 'Organic Spinach',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb',
    category: 'Vegetables',
    description: 'Fresh organic spinach leaves',
    threshold: 8,
    currentOrders: 2,
    estimatedDays: 1.5,
    unit: 'bunch'
  },
  {
    id: '4',
    name: 'Free-Range Eggs',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f',
    category: 'Dairy',
    description: 'Locally sourced free-range eggs',
    threshold: 12,
    currentOrders: 9,
    estimatedDays: 2.5,
    unit: 'dozen'
  },
  {
    id: '5',
    name: 'Whole Grain Bread',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff',
    category: 'Bakery',
    description: 'Freshly baked whole grain bread',
    threshold: 10,
    currentOrders: 6,
    estimatedDays: 1.8,
    unit: 'loaf'
  },
  {
    id: '6',
    name: 'Organic Carrots',
    price: 2.49,
    image: 'https://images.unsplash.com/photo-1447175008436-054170c2e979',
    category: 'Vegetables',
    description: 'Fresh organic carrots',
    threshold: 15,
    currentOrders: 8,
    estimatedDays: 2.2,
    unit: 'lb'
  },
  {
    id: '7',
    name: 'Greek Yogurt',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777',
    category: 'Dairy',
    description: 'Creamy Greek yogurt',
    threshold: 10,
    currentOrders: 5,
    estimatedDays: 2,
    unit: 'container'
  },
  {
    id: '8',
    name: 'Quinoa',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac',
    category: 'Grains',
    description: 'Organic quinoa',
    threshold: 8,
    currentOrders: 3,
    estimatedDays: 3.5,
    unit: 'lb'
  }
];