"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SearchBar from "@/components/SearchBar";
import LoadingBar from "@/components/LoadingBar";

export default function Home() {
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("https://photomory-backend.onrender.com/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <LoadingBar isLoading={isLoading} />
      <main className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-8 pt-6 pb-12">
        <SearchBar />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full justify-items-center gap-y-10 gap-x-6">
          {categories.map((category, index) => (
            <a
              key={index}
              href={`/${category.toLowerCase().replace(/\s+/g, "-")}`}
              className="flex flex-col items-center hover:scale-105 transition w-full max-w-xs px-2"
            >
              <Image
                src="/folder-icon.png"
                alt={`${category} folder`}
                width={175}
                height={175}
                className="mb-2"
              />
              <span className="text-sm capitalize text-center break-words w-full">
                {category}
              </span>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
