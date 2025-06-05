// components/SearchBar.tsx
import { Search } from 'lucide-react';
export default function SearchBar() {
  return (
    <div className="flex items-center w-full max-w-xl mx-auto mb-6">
      <div className="flex items-center bg-[#88D6A2] border-[2.5px] border-[#743749] rounded-[10px] px-3 py-2">
        <Search className="text-[#743749]" size={20} />
      </div>
      <input
        type="text"
        placeholder="Search folders..."
        className="flex-1 ml-3 bg-[#EBE1D8] border-[2.5px] border-[#743749] rounded-[10px] px-4 py-2 text-[#743749] placeholder:text-[#743749] focus:outline-none"
      />
    </div>
  );
}
