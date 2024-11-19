import img from "@/app/main-image.png";
import img1 from "@/app/1.png";
import img2 from "@/app/2.png";
import img3 from "@/app/4.png";
import img4 from "@/app/a.jpg";
import img5 from "@/app/b.jpg";
import img6 from "@/app/c.jpg";
import img7 from "@/app/d.jpg";

import Image from "next/image";

export default function ExampleProducts() {
  return (
    <div className="flex flex-col mx-7 my-10">
      <span className="text-xl my-10">You might like</span>
      <div className="">
        <div className="flex flex-col sm:grid grid-cols-3  gap-2  sm:h-[300px]">
          <div className="relative hover:scale-95 h-[200px] sm:h-full">
            <Image src={img4} alt="" fill />
          </div>
          <div className="relative hover:scale-95 h-[200px] sm:h-full">
            <Image src={img5} alt="" fill />
          </div>{" "}
          <div className="relative hover:scale-95 h-[200px] sm:h-full">
            <Image src={img6} alt="" fill />
          </div>
        </div>
        <div className="grid grid-cols-2  gap-2 h-[300px] mt-2">
          <div className="relative hover:scale-95">
            <Image src={img7} alt="" fill />
          </div>{" "}
          <div className="relative hover:scale-95">
            <Image src={img3} alt="" fill />
          </div>
        </div>
      </div>
    </div>
  );
}
