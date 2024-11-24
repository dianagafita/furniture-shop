"use client";

import img from "./d.jpg";
import img1 from "./two.png";

import { ImageGallery } from "@/components/products/image-galerry";
import RecommendedProducts from "@/components/products/recommended-products";
import { useEffect, useState } from "react";

export default function ProductDetailPage({ params }) {
  const [productId, setProductId] = useState(null);
  const [product, setProduct] = useState(null);

  console.log(product);
  useEffect(() => {
    async function unwrapParams() {
      const resolvedParams = await params;
      setProductId(resolvedParams.productId);
    }
    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          console.log(productId);
          const response = await fetch(`/api/products/${productId}`);
          const data = await response.json();
          if (data.success) {
            setProduct(data.data);
          } else {
            console.error("Product not found");
          }
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
        }
      };

      fetchProduct();
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="mt-[5rem] min-h-[100vh] flex flex-col mx-7">
        Product not found
      </div>
    );
  }

  const images = [img, img1];
  return (
    <div className="  min-h-[100vh]    text-white">
      <div className="flex flex-col-reverse  lg:flex-row w-full gap-8 ">
        {/* Product Info */}
        <div className="flex flex-col ml-7 md:ml-20 mt-10 lg:w-1/2 md:py-40 ">
          <h1 className="f_font text-xl mb-5 ">{product.name}</h1>
          <h2 className="main_font text-5xl mb-7">
            {product.subtitle || "Pink Dragon"}
          </h2>
          <p className="w-full lg:w-[40vw]  font-[00]">
            {product.description ||
              "A nice furniture piece with an amazing color, great material, and a reasonable price. Transport included.A nice furniture piece with an amazing color, great material, and a reasonable price. Transport included.A nice furniture piece with an amazing color, great material, and a reasonable price. Transport included.A nice furniture piece with an amazing color, great material, and a reasonable price. Transport included."}
          </p>
          <p className="font-bold f_font text-xl mt-10">{product.price} lei</p>
        </div>

        {/* Image Gallery */}
        <div className="lg:w-1/2 px-5 mt-20 pt-40 pb-20 md:py-40 m md:bg-[rgb(255,255,255,0.2)]">
          <ImageGallery images={product.images} />
        </div>
      </div>
      <div className="px-20">
        <RecommendedProducts />
      </div>
    </div>
  );
}
