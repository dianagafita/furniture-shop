import { DATA } from "@/constants";
import Image from "next/image";

export default function ProductDetailPage({ params }) {
  // Convert params.productId to a number to match the `id` type in DATA
  const productId = parseInt(params.productId, 10);
  const product = DATA.find((item) => item.id === productId);

  if (!product) {
    return (
      <div className="mt-[5rem] min-h-[100vh] flex flex-col mx-7">
        Product not found
      </div>
    );
  }

  return (
    <div className="mt-[5rem] min-h-[100vh] flex flex-col mx-7 py-20">
      <h1 className="text-4xl font-bold">{product.title}</h1>
      <div className="my-5">
        <Image
          src={product.image}
          alt={product.title}
          width={500}
          height={500}
          objectFit="contain"
        />
      </div>
      <p className="text-lg">
        {product.description || "No description available."}
      </p>
      <p className="mt-2 text-xl font-semibold">Price: ${product.price}</p>
    </div>
  );
}
