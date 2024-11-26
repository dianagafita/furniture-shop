"use client";

import { ImageGallery } from "@/components/products/image-galerry";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function InterceptedProductDetailPage({ params }) {
  const [productId, setProductId] = useState(null);
  const [product, setProduct] = useState(null);
  const [closeModal, setCloseModal] = useState(false);
  const router = useRouter;

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
          const response = await fetch(`/api/products/${productId}`);
          const data = await response.json();
          if (data.success) {
            setProduct(data.data);
          } else {
            console.error("Product not found");
          }
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };

      fetchProduct();
    }
  }, [productId]);

  useEffect(() => {
    // Disable scrolling when the modal is open
    if (!closeModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup function to reset overflow
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [closeModal]);

  if (!product) {
    return (
      <div className="mt-[5rem] min-h-[100vh] flex flex-col mx-7">
        Product not found
      </div>
    );
  }

  return (
    <>
      {!closeModal && (
        <div
          onClick={() => {
            window.history.back();
          }}
          className="absolute z-[200] inset-0 bg-[rgba(0,0,0,0.8)] text-white h-full overflow-hidden"
        >
          <div onClick={(e) => e.stopPropagation()} className="px-5 mt-40">
            <ImageGallery type="modal" images={product.images} />
          </div>
        </div>
      )}
    </>
  );
}
