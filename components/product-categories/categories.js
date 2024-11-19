import Image from "next/image";
import img from "@/app/1.png";
import { CATEGORIES } from "@/constants";
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Categories() {
  return (
    <div className="flex flex-col  my-20">
      <div className="flex justify-between mb-10 mx-7">
        <span className="text-xl">Product Categories</span>
        <span className="second_font">
          Imecable furniture designes for your home
        </span>
      </div>
      <div className="flex overflow-x-auto w-[100vw] px-7">
        {CATEGORIES.map((item) => (
          <div
            key={item.title}
            className=" h-[200px] w-[400px] relative shadow-lg pr-20"
          >
            <div className="relative w-[300px] h-full">
              <Image src={item.image} fill alt={item.title} />
            </div>
            <div className="flex flex-col bg-[rgb(255,255,255,0.7)] text-black absolute top-[20%] left-[60%] p-8 ">
              <span className="main_font">{item.title}</span>
              <Link
                href="/"
                className="flex text-sm items-center justify-between mt-2"
              >
                View
                <ArrowRight className="ml-5" strokeWidth={0.6} size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
