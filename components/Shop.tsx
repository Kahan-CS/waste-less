import GroceryCard from "./GroceryCard";

interface Grocery {
  id: number;
  name: string;
  price: number;
  image: string;
  current_demand: number;
  expected_wait_time: string;
  threshold: number;
}

interface ShopProps {
  groceries: Grocery[];
  addToCart: (grocery: Grocery, quantity: number) => void;
}

const Shop: React.FC<ShopProps> = ({ groceries, addToCart }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {groceries.map((grocery) => (
        <GroceryCard key={grocery.id} grocery={grocery} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default Shop;
