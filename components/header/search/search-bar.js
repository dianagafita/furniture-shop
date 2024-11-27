"use client";
import { useState } from "react";

export default function SearchBar() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {};

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={searchTerm}
        className="py-1 ml-5 w-[250px] bg-[rgb(255,255,255,0.1)] text-[16px] rounded-sm px-5 focus:none focus:outline-none border-none"
      />
    </form>
  );
}
