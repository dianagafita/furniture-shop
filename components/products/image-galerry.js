"use client";

import { useState } from "react";
import Image from "next/image";

export function ImageGallery({ images }) {
  const [active, setActive] = useState(images[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const handleImageClick = (index) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 w-full">
        {/* Active Image */}
        <div className="relative col-span-2 md:col-span-1">
          <Image
            src={active}
            width={800}
            height={600}
            alt="Gallery image"
            className="min-h-[250px] max-h-[350px] w-full object-contain"
            onClick={() => handleImageClick(images.indexOf(active))}
          />
        </div>

        {/* Thumbnail List */}
        <div className="w-full flex overflow-x-auto mt-4  justify-center">
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
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="relative w-3/4 h-3/4">
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
