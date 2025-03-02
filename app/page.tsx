"use client";

import { useState, useEffect } from "react";
import Shop from "@/components/Shop";
import groceriesData from "@/data/groceries.json";

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
    fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => setCart(data));
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
    fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCart),
    });
  };

  return (
    <div>
      <Shop groceries={groceriesData} addToCart={addToCart} />
    </div>
  );
}
