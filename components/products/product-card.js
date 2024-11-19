import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="relative w-full h-auto mb-5"
    >
      {/* Image */}
      <div className="relative w-full h-full mb-2">
        <Image
          src={product.image}
          alt={product.title}
          layout="intrinsic" // Keeps the image's natural size
          objectFit="contain" // Ensures the aspect ratio is preserved
        />
      </div>

      {/* Title */}
      <span className="text-left text-lg ">{product.title.toUpperCase()}</span>
      <p className=" text-left text-lg font-bold ">{product.price}</p>
    </Link>
  );
}
