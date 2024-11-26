"use client";

import { useState, useEffect } from "react";
import { DATA, MENU } from "@/constants";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/products/product-card";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [activeMenu, setActiveMenu] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState({
    images: [],
    name: "",
    type: "",
    subtitle: "",
    description: "",
    price: "",
  });

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

  const handleOpenModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!data.images || !data.name || !data.price) {
      alert("All fields are required.");
      return;
    }

    try {
      const formData = new FormData();
      data.images.forEach((image) => {
        formData.append("images", image); // Append each image
      });
      formData.append("type", data.type);
      formData.append("name", data.name);
      formData.append("subtitle", data.subtitle);
      formData.append("description", data.description);
      formData.append("price", data.price);

      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to add product");

      const result = await response.json();
      console.log("Product added:", result);

      setProducts((prev) => [...prev, result.data]);
      setIsModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleSoldItem = async (id) => {
    console.log(id);
    try {
      const response = await fetch("/api/products", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }), // Send the ID in the request body
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const result = await response.json();
      console.log("Product updated:", result);
      window.location.reload();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setData((prev) => ({
        ...prev,
        images: [...prev.images, ...files], // Append multiple files
      }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const closeModal = (e) => {
    if (e.target.classList.contains("modal-background")) {
      setIsModalOpen(false);
    }
  };

  console.log(products);
  return (
    <>
      {isModalOpen && (
        <div
          className="absolute w-full h-full z-[200] bg-[rgba(0,0,0,0.7)] flex justify-center  modal-background"
          onClick={closeModal}
        >
          <form
            onSubmit={handleAddProduct}
            className="p-5 w-[400px] h-fit text-[rgb(0,0,0,0.8)] bg-white rounded-md shadow-md mt-40"
          >
            <h2 className="text-lg font-semibold mb-4">Add New Product</h2>
            <input
              type="file"
              multiple
              name="images"
              onChange={handleInputChange}
              className="mb-4 w-full"
            />
            <select
              name="type"
              value={data.type}
              onChange={handleInputChange}
              className="mb-4 w-full px-2 py-1 border rounded-md"
            >
              <option value="" disabled>
                Select a product
              </option>
              {MENU.map((item) => (
                <option key={item.title} value={item.title.toLowerCase()}>
                  {item.title}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={data.name}
              onChange={handleInputChange}
              className="mb-4 w-full px-2 py-1 border rounded-md"
            />
            <input
              type="text"
              name="subtitle"
              placeholder="Product Subtitle"
              value={data.subtitle}
              onChange={handleInputChange}
              className="mb-4 w-full px-2 py-1 border rounded-md"
            />{" "}
            <input
              type="text"
              name="description"
              placeholder="Product Description"
              value={data.description}
              onChange={handleInputChange}
              className="mb-4 w-full px-2 py-1 border rounded-md"
            />
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={data.price}
              onChange={handleInputChange}
              className="mb-4 w-full px-2 py-1 border rounded-md"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-md"
            >
              Add Product
            </button>
          </form>
        </div>
      )}
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

        <button onClick={handleOpenModal} className="text-white my-10">
          + Add Product
        </button>
        <div className="flex flex-wrap items-center justify-center gap-10 my-10 w-full px-5">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <li key={product._id || index}>
                <ProductCard
                  handleSoldItem={handleSoldItem}
                  product={product}
                />
              </li>
            ))
          ) : (
            <p className="text-gray-500">No products available.</p>
          )}
        </div>
      </div>
    </>
  );
}
