import Image from "next/image";
import img from "@/app/1.png";
import { DATA } from "@/constants";

export default function RecommendedProducts() {
  return (
    <div className="my-20  flex w-full overflow-x-auto">
      {DATA.map((item) => (
        <div key={item.id} className="w-full h-[300px] pr-5 ">
          <div className="relative h-2/3 w-[200px]">
            <Image fill src={item.image} alt={item.id} />
          </div>
          <div className="h-1/3 flex flex-col">
            <span>Nume</span>
            <span>100 lei</span>
          </div>
        </div>
      ))}
    </div>
  );
}
