// components/Cursor.tsx
"use client";
import { useEffect, useState } from "react";

export default function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <style jsx global>{`body { cursor: none; } * {
    cursor: none !important;
  }`}</style>
      <div
        className="fixed z-9999 w-6 h-6 bg-[#88D6A2] border-[2.5px] border-[#743749] rounded-full pointer-events-none transition-transform duration-75 ease-out"
        style={{
          transform: `translate(${pos.x - 12}px, ${pos.y - 12}px)`,
        }}
      />
    </>
  );
}
