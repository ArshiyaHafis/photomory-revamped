"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import Navbar from "@/components/Navbar";

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
        const res = await fetch(
          `https://photomory-backend.onrender.com/images/${category}`
        );
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
  {selectedImage && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div
      className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      onClick={() => setSelectedImage(null)}
    ></div>
    <div className="z-10 bg-white/80 backdrop-blur-md shadow-lg relative max-w-[90vw] max-h-[90vh] rounded-lg overflow-hidden">
      
      <div className="flex items-center gap-3 px-4 py-2 text-[#743749] border-b-[2.5px] border-[#743749] bg-[#FAC660] rounded-t-lg">
        <div className="flex gap-3">
          <div
            className="w-[20px] h-[20px] rounded-full bg-[#DF6152] border-[2.5px] border-[#743749] cursor-pointer"
            onClick={() => setSelectedImage(null)}
          />
          <div
            className="w-[20px] h-[20px] rounded-full bg-[#79B0D7] border-[2.5px] border-[#743749] cursor-pointer"
          />
          <div
            className="w-[20px] h-[20px] rounded-full bg-[#88D6A2] border-[2.5px] border-[#743749] cursor-pointer"
          />
        </div>
      </div>
      <div className="px-4 pt-4">
      <img
        src={`https://photomory-backend.onrender.com${selectedImage.url}`}
        alt={selectedImage.title}
        className="max-w-full max-h-[70vh] border-[2.5px] border-[#743749] rounded-b-lg"
      />
      <p className="mt-2 text-sm text-center break-words max-w-xs mx-auto">
        {selectedImage.title}
      </p>
      </div>
    </div>
  </div>
)}


      <main className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-8 pt-6 pb-12">
        <SearchBar />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full justify-items-center gap-y-10 gap-x-6">
          {images.map((img) => (
            <div
              key={img.id}
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition w-full max-w-xs px-2"
              onClick={() => setSelectedImage(img)}
            >
              <img
                src={`https://photomory-backend.onrender.com${img.url}`}
                alt={img.title}
                width={200}
                height={200}
                className="rounded-md shadow"
              />
              <p className="mt-2 text-sm text-center break-words max-w-xs w-full">
                {img.title}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
