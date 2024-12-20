import Image from "next/image";
import img from "@/app/1.png";
import { DATA } from "@/constants";
import { useEffect, useState } from "react";

export default function RecommendedProducts() {
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

  return (
    <div className="my-20  flex w-full overflow-x-auto">
      {products.map((item) => {
        if (!item.sold)
          return (
            <div key={item._id} className="w-full h-[300px] pr-5 ">
              <div className="relative h-2/3 w-[200px]">
                <Image fill src={item.images[0]} alt={item._id} />
              </div>
              <div className="h-1/3 flex flex-col">
                <span>{item.name}</span>
                <span>{item.price} lei</span>
              </div>
            </div>
          );
      })}
    </div>
  );
}
