import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Leaf, ClipboardList, BarChart2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Navbar: React.FC = () => {
  const { cart } = useAppContext();
  
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <nav className="bg-gradient-to-t from-[#386641] to-[#6A994E] text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8" />
            <span className="text-xl font-bold">Waste-less</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-1 hover:text-green-200">
              <span>Shop</span>
            </Link>
            
            <Link to="/grocery-list" className="flex items-center space-x-1 hover:text-green-200">
              <ClipboardList className="h-5 w-5" />
              <span>My List</span>
            </Link>
            
            <Link to="/waste-tracker" className="flex items-center space-x-1 hover:text-green-200">
              <BarChart2 className="h-5 w-5" />
              <span>Waste Tracker</span>
            </Link>
            
            <Link to="/cart" className="flex items-center space-x-1 hover:text-green-200 relative">
              <ShoppingCart className="h-5 w-5" />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;