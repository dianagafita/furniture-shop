import Image from "next/image";
import img from "@/app/1.png";
import img2 from "@/app/2.png";
import img1 from "@/app/4.png";

export default function AboutUs() {
  return (
    <div className="mt-10 mx-7 flex flex-col">
      <div className="flex">
        <div className="w-1/2 flex flex-col">
          <span className="text-2xl mb-5">About us</span>
          <span>A nice shop with vintage furniture.</span>
        </div>
        <div className="relative h-[200px] w-1/2">
          <Image src={img} alt="" fill />
        </div>
      </div>
      <div className="flex my-5">
        <div className="relative w-1/3 h-[150px] my-5">
          <Image src={img2} alt="" fill />
        </div>
        <div className="relative w-1/3 h-[150px] flex flex-col justify-between mx-5">
          <span className="text-center">_______________________</span>
          <span className="text-center mx-5 my-5 ">
            A nice shop with vintage furniture. A nice shop with vintage
            furniture. A nice shop with vintage furniture.
          </span>
          <span className="text-center">_______________________</span>
        </div>
        <div className="relative w-1/3 h-[120px] my-2">
          <Image src={img1} alt="" fill objectFit="contain" />
        </div>
      </div>
    </div>
  );
}
