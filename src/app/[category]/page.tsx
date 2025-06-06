"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import SearchBar from "@/components/SearchBar";

export default function CategoryPage() {
  const { category } = useParams();
  const [images, setImages] = useState<
    { id: number; title: string; url: string }[]
  >([]);

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
    <div className="h-screen flex flex-col overflow-hidden">
          <main className="flex-1 min-h-0 overflow-y-auto px-8 pt-6 pb-12">
            <SearchBar />
            <div className="grid grid-cols-4 w-full justify-items-center gap-y-10">
              {images.map((img) => (
          <div key={img.id} className="flex flex-col items-center">
            <Image
              src={`https://photomory-backend.onrender.com${img.url}`}
              alt={img.title}
              width={200}
              height={200}
              className="rounded-md shadow"
            />
            <p className="mt-2 text-sm text-center">{img.title}</p>
          </div>
        ))}
        </div>
      </main>
    </div>
  );
}
