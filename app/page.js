import Image from "next/image";
import main from "./main.jpg";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Categories from "@/components/product-categories/categories";
import ExampleProducts from "@/components/products/example-products";
import AboutUs from "@/components/about-us-comp/about-us";

export default function Home() {
  return (
    <div className="relative w-full h-full flex flex-col mt-]">
      <div className="relative w-full h-[70vh] overflow-hidden">
        {/* Main Image */}
        <Image src={main} alt="Next.js logo" priority fill quality={100} />

        {/* Half-Oval Gradient */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-[-6rem] w-full h-[30vh] bg-black rounded-t-[30%]"></div>
        </div>

        {/* Text Content */}
        <div className="inset-0 absolute flex flex-col justify-between m-7">
          <div className="flex flex-col mt-20">
            <span className="main_font tracking-widest text-3xl">
              Comfort in Furniture
            </span>
            <span className="second_font text-xl">
              See our collection of furniture{" "}
            </span>
            <div className="flex items-center mt-5  second_font text-xl ">
              <div className="hover:text-black flex items-center decoration-1 underline underline-offset-8">
                <Link className="hover:text-black" href="/">
                  View Collection
                </Link>
                <ChevronRight
                  className="ml-2 hover:text-black"
                  strokeWidth={1}
                  size={20}
                />
              </div>
            </div>
          </div>
          <div className="self-end w-1/2">
            Functional, practical, and amazing solutions that make a house into
            a home.
          </div>
        </div>
      </div>
      <Categories />
      <AboutUs />
      <ExampleProducts />
    </div>
  );
}
