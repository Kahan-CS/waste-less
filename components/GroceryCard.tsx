import Image from "next/image";
import { useState } from "react";

interface Grocery {
  id: number;
  name: string;
  price: number;
  image: string;
  current_demand: number;
  expected_wait_time: string;
  threshold: number;
}

interface GroceryCardProps {
  grocery: Grocery;
  addToCart: (grocery: Grocery, quantity: number) => void;
}

const GroceryCard: React.FC<GroceryCardProps> = ({ grocery, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(grocery, quantity);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex flex-col items-center border p-4 rounded-lg shadow-md">
      <Image src={grocery.image} alt={grocery.name} width={100} height={100} className="object-cover" />
      <h2 className="text-lg font-bold mt-2">{grocery.name}</h2>
      <p className="text-gray-700">Price: ${grocery.price}</p>
      {grocery.current_demand / grocery.threshold > 0.5 && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <div className="bg-[#097969] h-2.5 rounded-full" style={{ width: `${(grocery.current_demand / grocery.threshold) * 100}%` }}></div>
        </div>
      )}
      <p className="text-gray-500 mt-2">Expected Wait Time: {grocery.expected_wait_time}</p>
      <div className="flex items-center mt-4">
        <button onClick={handleDecrease} className="px-2 py-1 bg-gray-300 rounded-l">-</button>
        <span className="px-4 py-1 bg-gray-100">{quantity}</span>
        <button onClick={handleIncrease} className="px-2 py-1 bg-gray-300 rounded-r">+</button>
      </div>
      <button onClick={handleAddToCart} className="mt-4 px-4 py-2 bg-[#097969] text-white rounded">Add to Cart</button>
    </div>
  );
};

export default GroceryCard;
