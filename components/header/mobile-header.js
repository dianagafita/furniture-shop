import { CATEGORIES } from "@/constants";
import Link from "next/link";

export default function MobileHeader({ handleOpenMenu }) {
  return (
    <ul className=" flex bg-black items-center justify-center">
      {CATEGORIES.map((item) => (
        <Link
          onClick={handleOpenMenu}
          href={`/products?title=${encodeURIComponent(item.title)}`}
          className="px-5 py-4"
          key={item.title}
        >
          {item.title}
        </Link>
      ))}
    </ul>
  );
}
