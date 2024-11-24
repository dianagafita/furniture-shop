import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product, handleSoldItem }) {
  return (
    <>
      <Link
        href={`/products/${product._id}`}
        className="relative h-auto my-10 group text-white"
      >
        <div className="relative w-[300px] h-[300px] overflow-hidden">
          <Image
            className="absolute  top-0 left-0 transition-opacity duration-300 group-hover:opacity-0"
            src={product.image}
            alt=""
            layout="fill"
            objectFit="contain"
          />

          {product.sold && (
            <div className="absolute border tracking-widest bg-[rgba(0,0,0,0.6)] inset-0 w-full h-full flex items-center justify-center">
              <span className="text-white  text-4xl  transform rotate-45">
                SOLD
              </span>
            </div>
          )}
        </div>
        <span className="block text-left text-lg mt-2">
          {product.name?.toUpperCase()}
        </span>
        <p className="block text-left text-lg font-bold">{product.price}</p>
      </Link>{" "}
      {!product.sold && (
        <button
          type="button"
          className=" text-white font-bold text-2xl my-5 text-red-700"
          onClick={() => handleSoldItem(product._id)}
        >
          SOLD
        </button>
      )}
    </>
  );
}
