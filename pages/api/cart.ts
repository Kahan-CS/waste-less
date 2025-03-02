import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const cartFilePath = path.join(process.cwd(), "data", "cart.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const cartData = fs.readFileSync(cartFilePath, "utf-8");
    res.status(200).json(JSON.parse(cartData));
  } else if (req.method === "POST") {
    const updatedCart = req.body;
    fs.writeFileSync(cartFilePath, JSON.stringify(updatedCart, null, 2));
    res.status(200).json({ message: "Cart updated successfully" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
