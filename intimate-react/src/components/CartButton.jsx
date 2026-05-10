import { useCart } from "../context/CartContext";

export default function CartButton({ className = "" }) {
  const { count, setOpen } = useCart();

  return (
    <button
      onClick={() => setOpen(true)}
      className={`relative p-2 rounded-full hover:bg-green-50 transition-colors group ${className}`}
      aria-label="Open cart"
    >
      <svg
        className="w-6 h-6 text-gray-700 group-hover:text-[#28a745] transition-colors"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 px-1 rounded-full bg-[#28a745] text-white text-[10px] font-bold flex items-center justify-center shadow-md animate-zoomIn">
          {count}
        </span>
      )}
    </button>
  );
}
