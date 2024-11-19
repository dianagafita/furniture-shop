"use client";

import { useState, useEffect } from "react";
import { DATA, MENU } from "@/constants";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "@/components/products/product-card";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [activeMenu, setActiveMenu] = useState("");
  const searchParams = useSearchParams(); // Used to get query params
  const router = useRouter();

  useEffect(() => {
    const title = searchParams.get("title"); // Get the 'title' query parameter
    if (title) {
      const filteredProducts = DATA.filter(
        (item) => item.type === title.toLowerCase()
      );
      setProducts(filteredProducts);
      setActiveMenu(title);
    }
  }, [searchParams]); // Re-run this whenever the search parameters change

  const handleFilterProducts = (title) => {
    const filteredProducts = DATA.filter(
      (item) => item.type === title.toLowerCase()
    );

    setProducts(filteredProducts);
    setActiveMenu(title);
    console.log(activeMenu);
  };
  return (
    <div className="mt-[4rem] min-h-[100vh] flex flex-col mx-7">
      <span className="text-5xl main_font mt-10 mb-5 tracking-normal">
        {activeMenu ? activeMenu : "Products"}
      </span>
      <ul className="flex w-full">
        {MENU.map((item) => (
          <li key={item.title}>
            <button
              className={`mr-5 ${
                activeMenu === item.title
                  ? "underline underline-offset-8 decoration-[0.5px] decoration-white"
                  : ""
              }`}
              onClick={() => handleFilterProducts(item.title)}
            >
              {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
            </button>
          </li>
        ))}
      </ul>

      <div className="my-10 w-full">
        {products.length > 0 ? (
          <ul className="grid md:grid-cols-3 gap-2">
            {products.map((product, index) => (
              <li key={index} className="flex justify-center items-center">
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No products available.</p>
        )}
      </div>
    </div>
  );
}
