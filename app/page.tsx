import { useState, useEffect } from "react";
import Shop from "@/components/Shop";
import groceriesData from "@/data/groceries.json";
import cartData from "@/data/cart.json";
import fs from "fs";
import path from "path";

interface CartItem {
  id: number;
  quantity: number;
}


interface Grocery {
  id: number;
  name: string;
  price: number;
  image: string;
  current_demand: number;
  expected_wait_time: string;
  threshold: number;
}

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(cartData);
  }, []);

  const addToCart = (grocery: Grocery, quantity: number) => {
    const updatedCart = [...cart];
    const itemIndex = updatedCart.findIndex((item) => item.id === grocery.id);

    if (itemIndex > -1) {
      updatedCart[itemIndex].quantity += quantity;
    } else {
      updatedCart.push({ id: grocery.id, quantity });
    }

    setCart(updatedCart);
    fs.writeFileSync(
      path.join(process.cwd(), "data", "cart.json"),
      JSON.stringify(updatedCart, null, 2)
    );
  };

  return (
    <div>
      <Shop groceries={groceriesData} addToCart={addToCart} />
    </div>
  );
}
