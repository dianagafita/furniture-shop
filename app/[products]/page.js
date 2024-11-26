"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/products/product-card";
import { MENU } from "@/constants";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeMenu, setActiveMenu] = useState("");
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        setFilteredProducts(validatedProducts); // Initialize filtered products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const name = searchParams.get("title");
    if (name) {
      handleFilterProducts(name);
    }
  }, [searchParams, products]); // Wait for products to load

  const handleFilterProducts = (name) => {
    const filtered = products.filter(
      (item) => item.type?.toLowerCase() === name.toLowerCase()
    );
    setFilteredProducts(filtered);
    setActiveMenu(name);
  };

  return (
    <div className="mt-[4rem] bg-transparent text-black min-h-[100vh] flex flex-col mx-7 rounded-sm mb-20">
      <span className="bg-black text-white text-5xl main_font pt-10 pb-5 tracking-normal">
        {activeMenu ? activeMenu : "Products"}
      </span>
      <ul className="flex w-full bg-black text-white pb-10">
        {MENU.map((item, index) => (
          <li key={index}>
            <button
              className={`mr-5 ${
                activeMenu === item.title
                  ? "underline underline-offset-8 decoration-[0.5px] decoration-white"
                  : ""
              }`}
              onClick={() => handleFilterProducts(item.title)}
            >
              {item.title?.charAt(0).toUpperCase() + item.title?.slice(1)}
            </button>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center justify-center gap-10 my-10 w-full px-5">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <li key={product._id || index}>
              <ProductCard product={product} />
            </li>
          ))
        ) : (
          <p className="text-gray-500">No products available.</p>
        )}
      </div>
    </div>
  );
}
