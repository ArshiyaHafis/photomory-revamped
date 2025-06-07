'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState<any[]>([]);
  const [allImages, setAllImages] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch('https://photomory-backend.onrender.com/images');
        const data = await res.json();
        setAllImages(data);
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };
    fetchImages();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    const suggestions = allImages.filter((img) =>
      img.title.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(value ? suggestions : []);
  };

  const handleSelect = (img: any) => {
  router.push(`/${encodeURIComponent(img.category)}`);
  setQuery('');
  setFiltered([]);
};


  return (
    <div className="relative flex items-center w-full max-w-xl mx-auto mb-6">
      <div className="flex items-center bg-[#88D6A2] border-[2.5px] border-[#743749] rounded-[10px] px-3 py-2">
        <Search className="text-[#743749]" size={20} />
      </div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search folders..."
        className="flex-1 ml-3 bg-[#EBE1D8] border-[2.5px] border-[#743749] rounded-[10px] px-4 py-2 text-[#743749] placeholder:text-[#743749] focus:outline-none"
      />

      {filtered.length > 0 && (
        <ul className="absolute top-[110%] left-0 w-full bg-[#EBE1D8] border-[2.5px] border-[#743749] rounded-[10px] max-h-60 overflow-y-auto z-10">
          {filtered.map((img) => (
            <li
              key={img.id}
              onClick={() => handleSelect(img)}
              className="px-4 py-2 hover:bg-[#FAC660] cursor-pointer text-[#743749]"
            >
              {img.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
