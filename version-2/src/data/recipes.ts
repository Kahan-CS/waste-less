import { Recipe } from '../types';

export const recipes: Recipe[] = [
  {
    id: '1',
    name: 'Avocado Toast',
    ingredients: ['Whole Grain Bread', 'Avocados', 'Free-Range Eggs', 'Organic Spinach'],
    instructions: 'Toast bread, mash avocado and spread on toast, top with fried egg and spinach.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8'
  },
  {
    id: '2',
    name: 'Apple Quinoa Salad',
    ingredients: ['Organic Apples', 'Quinoa', 'Organic Spinach', 'Greek Yogurt'],
    instructions: 'Cook quinoa, mix with diced apples, spinach, and a dollop of Greek yogurt.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd'
  },
  {
    id: '3',
    name: 'Carrot Soup',
    ingredients: ['Organic Carrots', 'Organic Spinach'],
    instructions: 'Simmer carrots until soft, blend with spinach and seasonings.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554'
  },
  {
    id: '4',
    name: 'Greek Yogurt Parfait',
    ingredients: ['Greek Yogurt', 'Organic Apples', 'Quinoa'],
    instructions: 'Layer yogurt with diced apples and cooked quinoa for a healthy breakfast.',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777'
  }
];