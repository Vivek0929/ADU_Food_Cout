export default function Navbar() {
  return (
    <div className="bg-white shadow-sm sticky top-0 z-50 px-4 py-3 flex items-center justify-between">
      {/* Logo + Name */}
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center">
          <span className="text-white text-lg">🍽️</span>
        </div>
        <span className="font-bold text-gray-800 text-base sm:text-lg">ADU Food Court</span>
      </div>

      {/* Notification Bell Icon (inline SVG) */}
      <button className="relative p-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-orange-500 rounded-full"></span>
      </button>
    </div>
  );
}