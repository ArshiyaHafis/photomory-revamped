"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";

export default function UploadPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [imageName, setImageName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");

  // Check authentication
  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    setLoading(false);
  });

  return () => unsubscribe();
}, []);


  // Fetch categories from Flask backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://photomory-backend.onrender.com/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) return;

    const category = selectedCategory || newCategory.trim();
    if (!category) {
      alert("Please select or add a category.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", imageName);
      formData.append("category", category);
      formData.append("image", imageFile);

      const res = await fetch("https://photomory-backend.onrender.com/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload image");

      alert("Image uploaded successfully!");
      setImageName("");
      setImageFile(null);
      setSelectedCategory("");
      setNewCategory("");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed");
    }
  };

  if (loading) return <p className="text-center mt-10">Checking authentication...</p>;
  if (!user) {
  return (
    <div className="min-h-screen px-6 py-12 bg-[#EBE1D8] text-[#743749] flex flex-col items-center text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to Photomory!</h1>
      <p className="max-w-xl mb-6 text-lg">
        This page is for uploading images, but you must be signed in to use it.
        Meanwhile, here's a little about this project!
      </p>
      <div className="border-2 border-[#743749] bg-white p-6 rounded-xl shadow-md max-w-2xl">
        <h2 className="text-xl font-semibold mb-4 text-[#743749]">What Photomory Means to Me</h2>
        <p className="mb-4">
          I've always loved clicking pictures—especially of cats. 🐱 This project has been on my mind for a long time. 
          I actually made an earlier version of this website, but I really wanted to improve how it looked and felt, 
          so I revamped it with a cleaner design and better features.
        </p>
        <p className="mb-4">
          Lately, I’ve also been getting into doodling, and this space is a way for me to combine all those small joys 
          of mine—photos, cats, creativity, and a sprinkle of fun.
        </p>
        <p className="italic">
          Built with love, a camera roll full of memories, and lots of coffee. ☕
        </p>
        <div className="mt-6 text-sm">
          <p>
            🔗 <a href="https://github.com/ArshiyaHafis/photomory-revamped/tree/frontend" target="_blank" className="underline hover:text-[#DF6152]">Frontend code</a>
          </p>
          <p>
            🔗 <a href="https://github.com/ArshiyaHafis/photomory-revamped/tree/backend" target="_blank" className="underline hover:text-[#DF6152]">Backend code</a>
          </p>
          <p>
            🎨 <a href="https://www.figma.com/design/cMesYuJ1rMWJQLWiI451GS/PHOTOMORY-REVAMPED?node-id=18-174" target="_blank" className="underline hover:text-[#DF6152]">Figma design</a>
          </p>
        </div>
      </div>
    </div>
  );
}


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
