export default function LoadingBar({ isLoading }: { isLoading: boolean }) {
  return (
    <div className={`fixed top-0 left-0 w-full h-1 z-50 transition-opacity duration-300 ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
      <div className="w-full h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse" />
    </div>
  );
}
