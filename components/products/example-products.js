"use client";
import img from "@/app/main-image.png";
import img1 from "@/app/1.png";
import img2 from "@/app/2.png";
import img3 from "@/app/4.png";
import img4 from "@/app/a.jpg";
import img5 from "@/app/b.jpg";
import img6 from "@/app/c.jpg";
import img7 from "@/app/d.jpg";
import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/util/products";

export default function ExampleProducts() {
  const products = getAllProducts();
  const firstThreeProducts = products.slice(0, 3); // Get the first 3 products
  const secondProducts = products.slice(3, 5); // Get the first 3 products

  console.log(firstThreeProducts);
  return (
    <div className="flex flex-col mx-7 my-10">
      <span className="text-xl my-10">You might like</span>
      <div className="">
        <div className="flex flex-col sm:grid grid-cols-3  gap-2  sm:h-[300px]">
          {firstThreeProducts.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product._id}/product-details`}
              className="relative hover:scale-95 h-[200px] sm:h-full"
            >
              <Image src={product.images[0]} alt="" fill />
            </Link>
          ))}
        </div>
        <div className="grid grid-cols-2  gap-2 h-[300px] mt-2">
          {secondProducts.map((product) => (
            <Link
              href={`/products/${product._id}/product-details`}
              key={product._id}
              className="relative hover:scale-95"
            >
              <Image src={product.images[0]} alt="" fill />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
