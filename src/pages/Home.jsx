import { useState, useMemo } from "react";
import Navbar from "../components/Navbar";

// ─── Inline SVG Icons ─────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
  </svg>
);
const HomeIcon = ({ active }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 ${active ? "text-orange-500" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2.5 : 1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" />
  </svg>
);
const CartIcon = ({ active }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 ${active ? "text-orange-500" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2.5 : 1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);
const OrdersIcon = ({ active }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 ${active ? "text-orange-500" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2.5 : 1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);
const ProfileIcon = ({ active }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 ${active ? "text-orange-500" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2.5 : 1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

// ─── Time-based Greeting ─────────────────────────────────────────────────────
function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return { text: "Good Morning", emoji: "☀️" };
  if (hour >= 12 && hour < 17) return { text: "Good Afternoon", emoji: "👋" };
  if (hour >= 17 && hour < 21) return { text: "Good Evening", emoji: "🌇" };
  return { text: "Good Night", emoji: "🌙" };
}

// ─── Menu Data ────────────────────────────────────────────────────────────────
const menuData = {
  Breakfast: [
    { id: 1, name: "Masala Dosa", description: "Crispy dosa with spice...", price: 45, rating: 4.5, time: "8 min", veg: true, image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&q=80" },
    { id: 2, name: "Idli Sambar", description: "Soft idlis served with...", price: 35, rating: 4.3, time: "5 min", veg: true, image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80" },
    { id: 3, name: "Poha", description: "Light flattened rice with veggies...", price: 25, rating: 4.2, time: "5 min", veg: true, image: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&q=80" },
    { id: 4, name: "Upma", description: "Semolina cooked with vegetables...", price: 30, rating: 4.1, time: "6 min", veg: true, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80" },
  ],
  Lunch: [
    { id: 5, name: "Veg Thali", description: "Complete meal: rice,...", price: 80, rating: 4.6, time: "10 min", veg: true, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80" },
    { id: 6, name: "Chicken Biryani", description: "Aromatic basmati rice...", price: 110, rating: 4.8, time: "15 min", veg: false, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80" },
    { id: 7, name: "Rajma Rice", description: "Kidney beans curry with rice...", price: 70, rating: 4.4, time: "10 min", veg: true, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80" },
    { id: 8, name: "Paneer Butter Masala", description: "Rich creamy paneer gravy...", price: 90, rating: 4.7, time: "12 min", veg: true, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80" },
  ],
  Snacks: [
    { id: 9, name: "Samosa (2 pcs)", description: "Crispy potato-filled...", price: 20, rating: 4.5, time: "3 min", veg: true, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80" },
    { id: 10, name: "Bread Pakoda", description: "Stuffed bread fritters,...", price: 25, rating: 4.2, time: "4 min", veg: true, image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80" },
    { id: 11, name: "Veg Puff", description: "Flaky pastry with spice...", price: 18, rating: 4.0, time: "2 min", veg: true, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80" },
    { id: 12, name: "Aloo Tikki", description: "Crispy potato patty...", price: 22, rating: 4.3, time: "5 min", veg: true, image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80" },
  ],
  Beverages: [
    { id: 13, name: "Masala Chai", description: "Freshly brewed spice...", price: 12, rating: 4.6, time: "3 min", veg: true, image: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?w=400&q=80" },
    { id: 14, name: "Cold Coffee", description: "Chilled blended coffee...", price: 45, rating: 4.4, time: "4 min", veg: true, image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&q=80" },
    { id: 15, name: "Fresh Lime Soda", description: "Refreshing lime soda,...", price: 25, rating: 4.3, time: "2 min", veg: true, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80" },
    { id: 16, name: "Mango Lassi", description: "Creamy mango yogurt drink...", price: 35, rating: 4.5, time: "3 min", veg: true, image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&q=80" },
  ],
  Desserts: [
    { id: 17, name: "Gulab Jamun (2 pcs)", description: "Soft milk-solid...", price: 30, rating: 4.7, time: "2 min", veg: true, image: "https://images.unsplash.com/photo-1601303516534-bf4a3f3b1e82?w=400&q=80" },
    { id: 18, name: "Ice Cream Cup", description: "2 scoops of choice:...", price: 35, rating: 4.5, time: "2 min", veg: true, image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&q=80" },
    { id: 19, name: "Kheer", description: "Creamy rice pudding...", price: 40, rating: 4.6, time: "3 min", veg: true, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80" },
    { id: 20, name: "Rasgulla", description: "Spongy cottage cheese balls...", price: 25, rating: 4.4, time: "2 min", veg: true, image: "https://images.unsplash.com/photo-1601303516534-bf4a3f3b1e82?w=400&q=80" },
  ],
};

const categories = [
  { id: "All", label: "All", emoji: "🍽️" },
  { id: "Breakfast", label: "Breakfast", emoji: "🍳" },
  { id: "Lunch", label: "Lunch", emoji: "🍛" },
  { id: "Snacks", label: "Snacks", emoji: "🍟" },
  { id: "Beverages", label: "Beverages", emoji: "☕" },
  { id: "Desserts", label: "Desserts", emoji: "🍨" },
];

const categoryEmojis = {
  Breakfast: "🍳",
  Lunch: "🍛",
  Snacks: "🍟",
  Beverages: "☕",
  Desserts: "🍨",
};

// ─── Food Card ────────────────────────────────────────────────────────────────
function FoodCard({ item }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-36 sm:h-40 object-cover"
          loading="lazy"
        />
        {/* Veg/Non-veg dot indicator */}
        <div className="absolute top-2 left-2 w-6 h-6 bg-white rounded-sm flex items-center justify-center shadow">
          {item.veg ? (
            <div className="w-4 h-4 border-2 border-green-600 rounded-sm flex items-center justify-center">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            </div>
          ) : (
            <div className="w-4 h-4 border-2 border-red-600 rounded-sm flex items-center justify-center">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
            </div>
          )}
        </div>
      </div>

      <div className="p-2.5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-1">
          <h3 className="font-bold text-gray-900 text-sm leading-tight">{item.name}</h3>
          <div className="flex items-center gap-0.5 shrink-0">
            <span className="text-green-600 text-xs">⭐</span>
            <span className="text-green-600 text-xs font-semibold">{item.rating}</span>
          </div>
        </div>

        <p className="text-gray-400 text-xs mt-0.5 truncate">{item.description}</p>

        <div className="flex items-center gap-1 mt-1 text-gray-400 text-xs">
          <span>🕐</span>
          <span>{item.time}</span>
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-gray-900 text-sm">₹{item.price}</span>
          <button
            onClick={handleAdd}
            className={`px-3 py-1.5 rounded-full text-white text-xs font-bold transition-all duration-300 ${added
                ? "bg-green-500 scale-95"
                : "bg-orange-500 hover:bg-orange-600 active:scale-95"
              }`}
          >
            {added ? "✓" : "ADD"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Bottom Nav ───────────────────────────────────────────────────────────────
function BottomNav({ active, setActive }) {
  const tabs = [
    { id: "menu", label: "Menu", Icon: HomeIcon },
    { id: "cart", label: "Cart", Icon: CartIcon },
    { id: "orders", label: "Orders", Icon: OrdersIcon },
    { id: "profile", label: "Profile", Icon: ProfileIcon },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
      <div className="max-w-lg mx-auto flex items-center justify-around py-2">
        {tabs.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className="flex flex-col items-center gap-0.5 px-4 py-1"
          >
            <Icon active={active === id} />
            <span className={`text-xs font-medium ${active === id ? "text-orange-500" : "text-gray-500"}`}>
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("menu");
  const { text: greeting, emoji } = getGreeting();

  const allItems = useMemo(() => Object.values(menuData).flat(), []);

  const searchResults = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return null;
    return allItems.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );
  }, [searchQuery, allItems]);

  const sectionsToRender = useMemo(() => {
    if (searchResults !== null) return null;
    if (activeCategory === "All") return Object.keys(menuData);
    return [activeCategory];
  }, [activeCategory, searchResults]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Orange Hero Header */}
      <div className="bg-orange-500 px-4 pt-4 pb-8">
        <p className="text-orange-100 text-sm font-medium">{greeting},</p>
        <h1 className="text-white text-2xl sm:text-3xl font-extrabold mt-0.5">
          User {emoji}
        </h1>
        <p className="text-orange-100 text-sm mt-0.5">Order ahead, skip the queue!</p>

        {/* Search Bar */}
        <div className="mt-4 relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Search dishes..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (e.target.value) setActiveCategory("All");
            }}
            className="w-full pl-10 pr-4 py-3 rounded-2xl text-gray-700 bg-white placeholder-gray-400 text-sm outline-none shadow focus:ring-2 focus:ring-orange-300"
          />
        </div>
      </div>

      {/* Sticky Category Tabs */}
      <div className="sticky top-[57px] z-40 bg-white shadow-sm">
        <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setSearchQuery("");
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 border ${activeCategory === cat.id && !searchQuery
                  ? "bg-orange-500 text-white border-orange-500 shadow"
                  : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"
                }`}
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pt-4 pb-24 max-w-lg mx-auto w-full">

        {/* Search Results */}
        {searchResults !== null && (
          <div>
            <h2 className="text-base font-bold text-gray-700 mb-3">
              {searchResults.length > 0
                ? `${searchResults.length} result${searchResults.length > 1 ? "s" : ""} for "${searchQuery}"`
                : `No results for "${searchQuery}"`}
            </h2>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {searchResults.map((item) => (
                  <FoodCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                <span className="text-5xl mb-3">🍽️</span>
                <p className="text-base font-medium">No dishes found</p>
                <p className="text-sm">Try a different search term</p>
              </div>
            )}
          </div>
        )}

        {/* Category Sections */}
        {searchResults === null &&
          sectionsToRender.map((section) => (
            <div key={section} className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{categoryEmojis[section]}</span>
                <h2 className="text-xl font-extrabold text-gray-800">{section}</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {menuData[section].map((item) => (
                  <FoodCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))}
      </div>

      {/* Bottom Nav */}
      <BottomNav active={activeTab} setActive={setActiveTab} />
    </div>
  );
}