import Image from "next/image";
import SearchBar from "@/components/SearchBar";

const folders = [
  { title: "Memes", icon: "/folder-icon.png", href: "/memes" },
  { title: "Trips", icon: "/folder-icon.png", href: "/trips" },
  { title: "Camera Roll", icon: "/folder-icon.png", href: "/camera-roll" },
  { title: "Old Pics", icon: "/folder-icon.png", href: "/old-pics" },
  { title: "Memes", icon: "/folder-icon.png", href: "/memes" },
  { title: "Trips", icon: "/folder-icon.png", href: "/trips" },
  { title: "Camera Roll", icon: "/folder-icon.png", href: "/camera-roll" },
  { title: "Old Pics", icon: "/folder-icon.png", href: "/old-pics" },
  { title: "Memes", icon: "/folder-icon.png", href: "/memes" },
  { title: "Trips", icon: "/folder-icon.png", href: "/trips" },
  { title: "Camera Roll", icon: "/folder-icon.png", href: "/camera-roll" },
  { title: "Old Pics", icon: "/folder-icon.png", href: "/old-pics" },
  { title: "Memes", icon: "/folder-icon.png", href: "/memes" },
  { title: "Trips", icon: "/folder-icon.png", href: "/trips" },
  { title: "Camera Roll", icon: "/folder-icon.png", href: "/camera-roll" },
  { title: "Old Pics", icon: "/folder-icon.png", href: "/old-pics" },
  { title: "Memes", icon: "/folder-icon.png", href: "/memes" },
  { title: "Trips", icon: "/folder-icon.png", href: "/trips" },
  { title: "Camera Roll", icon: "/folder-icon.png", href: "/camera-roll" },
  { title: "Old Pics", icon: "/folder-icon.png", href: "/old-pics" },
  { title: "Memes", icon: "/folder-icon.png", href: "/memes" },
  { title: "Trips", icon: "/folder-icon.png", href: "/trips" },
  { title: "Camera Roll", icon: "/folder-icon.png", href: "/camera-roll" },
  { title: "Old Pics", icon: "/folder-icon.png", href: "/old-pics" },
];

export default function Home() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <main className="flex-1 min-h-0 overflow-y-auto px-8 pt-6 pb-12">
        <SearchBar />
        <div className="grid grid-cols-4 w-full justify-items-center gap-y-10">
          {folders.map((folder, index) => (
            <a
              key={index}
              href={folder.href}
              className="flex flex-col items-center hover:scale-105 transition"
            >
              <Image
                src={folder.icon}
                alt={`${folder.title} folder`}
                width={175}
                height={175}
                className="mb-2"
              />
              <span className="text-sm">{folder.title}</span>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
