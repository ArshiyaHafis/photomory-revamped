"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SearchBar from "@/components/SearchBar";

export default function CategoryPage() {
  const { category } = useParams();
  const [images, setImages] = useState<
    { id: number; title: string; url: string }[]
  >([]);
  const [selectedImage, setSelectedImage] = useState<{
    title: string;
    url: string;
  } | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`https://photomory-backend.onrender.com/images/${category}`);
        const data = await res.json();
        setImages(data);
      } catch (err) {
        console.error("Failed to fetch images:", err);
      }
    };

    if (category) fetchImages();
  }, [category]);

  return (
    <div className="h-screen flex flex-col overflow-hidden relative">
      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Transparent overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          ></div>

          {/* Modal content with semi-transparent background */}
          <div className="z-10 bg-white/80 backdrop-blur-md rounded-lg p-4 shadow-lg relative max-w-[90vw] max-h-[90vh]">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-gray-700 hover:text-black text-xl font-bold"
            >
              ✖
            </button>
            <img
              src={`https://photomory-backend.onrender.com${selectedImage.url}`}
              alt={selectedImage.title}
              className="max-w-full max-h-[70vh] rounded"
            />
<p className="mt-2 text-sm text-center break-words w-48 mx-auto">{selectedImage.title}</p>

          </div>
        </div>
      )}

      <main className="flex-1 min-h-0 overflow-y-auto px-8 pt-6 pb-12">
        <SearchBar />
        <div className="grid grid-cols-4 w-full justify-items-center gap-y-10">
          {images.map((img) => (
            <div
              key={img.id}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => setSelectedImage(img)}
            >
              <img
                src={`https://photomory-backend.onrender.com${img.url}`}
                alt={img.title}
                width={200}
                height={200}
                className="rounded-md shadow"
              />
              <p className="mt-2 text-sm text-center break-words w-48">{img.title}</p>

            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
