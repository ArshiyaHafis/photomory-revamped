"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://photomory-backend.onrender.com/categories");
        console.log('categories:',res)
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <main className="flex-1 min-h-0 overflow-y-auto px-8 pt-6 pb-12">
        <SearchBar />
        <div className="grid grid-cols-4 w-full justify-items-center gap-y-10">
          {categories.map((category, index) => (
            <a
              key={index}
              href={`/${category.toLowerCase().replace(/\s+/g, "-")}`}
              className="flex flex-col items-center hover:scale-105 transition"
            >
              <Image
                src="/folder-icon.png"
                alt={`${category} folder`}
                width={175}
                height={175}
                className="mb-2"
              />
              <span className="text-sm capitalize">{category}</span>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
