"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export function ImageGallery({ images, type }) {
  const [active, setActive] = useState(images[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const modalRef = useRef(null);

  const handleImageClick = (index) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div className={`grid grid-cols-1 gap-4 w-full`}>
        <div
          className={`${
            type === "modal" ? "col-span-2" : "md:col-span-1"
          } relative col-span-2 `}
        >
          <Image
            src={active}
            width={800}
            height={600}
            alt="Gallery image"
            className="min-h-[250px] max-h-[350px] w-full object-contain cursor-pointer"
            onClick={() => handleImageClick(images.indexOf(active))}
          />
        </div>

        <div className="w-full flex overflow-x-auto mt-4 justify-center">
          {images.map((imgLink, index) => (
            <div
              key={index}
              className="h-24 flex-shrink-0 overflow-hidden w-32 mr-2 cursor-pointer"
              onClick={() => setActive(imgLink)}
            >
              <Image
                src={imgLink}
                width={100}
                height={100}
                alt={`Thumbnail ${index + 1}`}
                className="rounded-sm object-contain w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Larger Image View */}
      {isModalOpen && type !== "modal" && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal} // Close the modal on background click
        >
          <div
            className="relative w-3/4 h-3/4"
            ref={modalRef} // Reference the modal content
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
          >
            <Image
              src={images[modalImageIndex]}
              fill
              alt="Expanded view"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
