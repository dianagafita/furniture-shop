"use client";
import { useEffect, useState } from "react";

export const getAllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products", { method: "GET" });
        if (!response.ok) throw new Error("Failed to fetch products");

        const result = await response.json();
        const validatedProducts = result.data.map((product) => ({
          ...product,
          price: product.price || 0, // Default to 0 if price is missing
          name: product.name || "Unnamed Product", // Default name
        }));
        setProducts(validatedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  return products;
};
