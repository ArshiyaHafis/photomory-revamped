"use client";

import { useState } from "react";

export default function UploadPage() {
  const [imageName, setImageName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", imageName);
    formData.append("category", selectedCategory || newCategory);
    if (imageFile) {
      formData.append("image", imageFile);
    }


    console.log("Form submitted!");
  };

  return (
    <div className="min-h-screen px-6 py-8 bg-[#EBE1D8] text-[#743749]">
      <h1 className="text-3xl font-bold mb-2 text-center">Upload a New Image</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto flex flex-col gap-6 border-2 border-[#743749] p-6 rounded-xl bg-white"
      >
        <label className="flex flex-col">
          <span className="mb-1 font-semibold">Image Name</span>
          <input
            type="text"
            value={imageName}
            onChange={(e) => setImageName(e.target.value)}
            className="border border-[#743749] p-2 rounded-md text-[#743749]"
            required
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1 font-semibold">Upload Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="text-[#743749]"
            required
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1 font-semibold">Select Existing Category</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-[#743749] p-2 rounded-md text-[#743749]"
          >
            <option value="">-- Select a category --</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col">
          <span className="mb-1 font-semibold">Or Add New Category</span>
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="border border-[#743749] p-2 rounded-md text-[#743749]"
          />
        </label>

        <button
          type="submit"
          className="bg-[#88D6A2] text-[#743749] py-2 font-bold rounded-lg border-2 border-[#743749] hover:scale-105 transition"
        >
          Upload Image
        </button>
      </form>
    </div>
  );
}
