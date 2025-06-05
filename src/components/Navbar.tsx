export default function Navbar() {
  return (
    <div className="flex items-center gap-3 px-4 py-2 text-[#743749] border-[2.5px] border-[#743749] bg-[#FAC660]">
      <div className="flex gap-3">
        <div className="w-[20px] h-[20px] rounded-full bg-[#DF6152] border-[2.5px] border-[#743749]" />
        <div className="w-[20px] h-[20px] rounded-full bg-[#79B0D7] border-[2.5px] border-[#743749]" />
        <div className="w-[20px] h-[20px] rounded-full bg-[#88D6A2] border-[2.5px] border-[#743749]" />
      </div>
      <span className="ml-4 text-sm">photomory.exe</span>
    </div>
  );
}
