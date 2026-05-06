import { useState } from "react";
import { Star, Clock, Plus, Minus, Search } from "lucide-react";

// ─── Menu Data ────────────────────────────────────────────────────────────────
const MENU_ITEMS = [
  { id: 1, name: "Masala Dosa", description: "Crispy dosa with spiced potato filling", price: 45, rating: 4.5, prepTime: 8, category: "Breakfast", badge: "Bestseller", image: "https://images.unsplash.com/photo-1708146464361-5c5ce4f9abb6?w=400&h=300&fit=crop" },
  { id: 2, name: "Idli Sambar", description: "Soft idlis with tangy sambar & chutney", price: 35, rating: 4.3, prepTime: 5, category: "Breakfast", badge: null, image: "https://images.unsplash.com/photo-1668236499396-a62d2d1cb0cf?w=400&h=300&fit=crop" },
  { id: 3, name: "Poha", description: "Light flattened rice with veggies & nuts", price: 25, rating: 4.2, prepTime: 5, category: "Breakfast", badge: null, image: "https://images.unsplash.com/photo-1614247310314-c17f87b47ef9?w=400&h=300&fit=crop" },
  { id: 4, name: "Veg Biryani", description: "Fragrant basmati rice with vegetables", price: 80, rating: 4.6, prepTime: 15, category: "Lunch", badge: "Popular", image: "https://images.unsplash.com/photo-1666190092689-e3968aa0c32c?w=400&h=300&fit=crop" },
  { id: 5, name: "Paneer Butter Masala", description: "Creamy tomato curry with soft paneer", price: 90, rating: 4.7, prepTime: 12, category: "Lunch", badge: "Chef's Pick", image: "https://images.unsplash.com/photo-1708793873401-e8c6c153b76a?w=400&h=300&fit=crop" },
  { id: 6, name: "Vada Pav", description: "Spiced potato fritter in a bun", price: 20, rating: 4.4, prepTime: 5, category: "Snacks", badge: null, image: "https://images.unsplash.com/photo-1750767397012-3413ba4fdbc7?w=400&h=300&fit=crop" },
  { id: 7, name: "Mango Lassi", description: "Chilled creamy yogurt blended with mango", price: 40, rating: 4.5, prepTime: 3, category: "Beverages", badge: "New", image: "https://images.unsplash.com/photo-1619898804188-e7bad4bd2127?w=400&h=300&fit=crop" },
  { id: 8, name: "Masala Chai", description: "Aromatic Indian spiced tea", price: 15, rating: 4.3, prepTime: 3, category: "Beverages", badge: null, image: "https://images.unsplash.com/photo-1648192312898-838f9b322f47?w=400&h=300&fit=crop" },
  { id: 9, name: "Gulab Jamun", description: "Soft milk dumplings in rose sugar syrup", price: 30, rating: 4.6, prepTime: 5, category: "Desserts", badge: "Sweet Pick", image: "https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?w=400&h=300&fit=crop" },
];

const CATEGORIES = ["All", "Breakfast", "Lunch", "Snacks", "Beverages", "Desserts"];

const CATEGORY_EMOJI = { All: "🍽️", Breakfast: "🌅", Lunch: "☀️", Snacks: "🍿", Beverages: "🥤", Desserts: "🍮" };

const BADGE_STYLE = {
  "Bestseller": { bg: "#FFF7ED", color: "#EA580C" },
  "Popular": { bg: "#FFF7ED", color: "#EA580C" },
  "Chef's Pick": { bg: "#FFF1F2", color: "#E11D48" },
  "New": { bg: "#F0FDF4", color: "#16A34A" },
  "Sweet Pick": { bg: "#FDF2F8", color: "#A21CAF" },
};

export default function LandingPage({ cart, onCartUpdate, showHero = true }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");


  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";


  const filtered = MENU_ITEMS.filter(item => {
    const matchCat = activeCategory === "All" || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const grouped = filtered.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  // Cart helpers
  const getQty = (id) => cart.find(c => c.id === id)?.quantity ?? 0;
  const addItem = (item) => {
    const ex = cart.find(c => c.id === item.id);
    onCartUpdate(ex
      ? cart.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c)
      : [...cart, { ...item, quantity: 1 }]
    );
  };
  const removeItem = (id) => {
    const ex = cart.find(c => c.id === id);
    if (!ex) return;
    onCartUpdate(ex.quantity === 1
      ? cart.filter(c => c.id !== id)
      : cart.map(c => c.id === id ? { ...c, quantity: c.quantity - 1 } : c)
    );
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#F9F9FB]">

      {/* ── Hero Banner ─────────────────────────────────────────────────────── */}
      {showHero && (
        <div
          className="relative mx-5 mt-5 rounded-3xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)" }}
        >
        {/* Content */}
        <div className="relative z-10 px-8 py-7">
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, fontWeight: 500, margin: 0 }}>
            {greeting},
          </p>
          <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 900, margin: "4px 0 4px", display: "flex", alignItems: "center", gap: 8 }}>
            User <span>👋</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, fontWeight: 500, margin: 0 }}>
            Order ahead, skip the queue!
          </p>
        </div>

        {/* Decorative circles */}
        <div style={{ position: "absolute", right: "-6%", top: "-40%", width: 200, height: 200, background: "rgba(255,255,255,0.1)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: "10%", bottom: "-55%", width: 170, height: 170, background: "rgba(255,255,255,0.1)", borderRadius: "50%", pointerEvents: "none" }} />
      </div>
      )}

      {/* ── Search Bar ──────────────────────────────────────────────────────── */}
      <div className="px-5 mt-5 relative">
        <Search className="absolute left-9 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search for your favorite dishes..."
          className="w-full pl-12 pr-5 py-4 bg-white rounded-2xl text-sm text-slate-800 placeholder-slate-400 border border-slate-100 shadow-sm outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 transition-all font-medium"
        />
      </div>

      {/* ── Category Tabs ───────────────────────────────────────────────────── */}
      <div className="px-5 mt-4">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${activeCategory === cat
                  ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                  : "bg-white text-slate-500 border border-slate-100 hover:bg-orange-50"
                }`}
            >
              <span className="text-base">{CATEGORY_EMOJI[cat]}</span>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Menu Grid ───────────────────────────────────────────────────────── */}
      <div className="px-5 mt-6 pb-16 space-y-10">
        {Object.keys(grouped).length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Search className="text-slate-300" size={28} />
            </div>
            <p className="text-slate-500 font-semibold">No dishes found</p>
            <p className="text-slate-400 text-sm mt-1">Try a different search or category</p>
          </div>
        ) : (
          Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              {/* Category Header - Magnifying glass + Title as per screenshot */}
              <div className="flex items-center justify-between mb-4 sm:mb-5">
                <div className="flex items-center gap-2">
                  <Search className="w-5 h-5 sm:w-6 sm:h-6 text-slate-800" strokeWidth={3} />
                  <h2 className="text-lg sm:text-2xl font-black text-slate-900">{category}</h2>
                </div>
                <span className="hidden sm:inline-block text-[10px] font-black text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-wider">
                  {items.length} items
                </span>
              </div>

              {/* Cards - 2 Columns on Mobile/Tablet, 3 on Desktop */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
                {items.map(item => {
                  const qty = getQty(item.id);
                  const badge = BADGE_STYLE[item.badge];
                  return (
                    <div key={item.id} className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg hover:shadow-orange-100 lg:hover:-translate-y-1 transition-all duration-300">
                      {/* Image Section */}
                      <div className="relative h-32 sm:h-40 lg:h-48 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        
                        {/* Veg Indicator */}
                        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-5 h-5 sm:w-6 sm:h-6 border-2 border-green-500 bg-white rounded-md sm:rounded-lg flex items-center justify-center shadow">
                          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500" />
                        </div>

                        {/* Badge (Desktop Only or very small) */}
                        {item.badge && badge && (
                          <div className="hidden sm:block absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shadow"
                            style={{ background: badge.bg, color: badge.color }}>
                            {item.badge}
                          </div>
                        )}

                        {/* Rating overlay - Hidden on mobile if we move it next to name */}
                        <div className="hidden lg:flex absolute bottom-3 right-3 items-center gap-1 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-xl shadow-sm">
                          <Star size={12} className="fill-orange-500 text-orange-500" />
                          <span className="text-xs font-black text-slate-800">{item.rating}</span>
                        </div>
                      </div>

                      {/* Body Section */}
                      <div className="p-3 sm:p-4">
                        {/* Name & Rating Line */}
                        <div className="flex items-start justify-between gap-1">
                          <h3 className="text-xs sm:text-base font-black text-slate-900 group-hover:text-orange-600 transition-colors leading-tight line-clamp-1">{item.name}</h3>
                          <div className="flex lg:hidden items-center gap-0.5 shrink-0">
                            <Star size={10} className="fill-orange-500 text-orange-500" />
                            <span className="text-[10px] sm:text-xs font-black text-slate-800">{item.rating}</span>
                          </div>
                        </div>

                        <p className="text-slate-400 text-[10px] sm:text-xs mt-1 line-clamp-1 font-medium italic sm:not-italic">{item.description}</p>

                        <div className="flex items-center gap-1 mt-1.5 sm:mt-2 text-slate-400 text-[9px] sm:text-[10px] font-bold sm:font-black uppercase tracking-wider">
                          <Clock size={10} className="text-orange-500" />
                          <span>{item.prepTime} min</span>
                        </div>

                        {/* Price & Add Button */}
                        <div className="flex items-center justify-between mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-slate-50">
                          <span className="text-sm sm:text-xl font-black text-slate-900">₹{item.price}</span>

                          {qty === 0 ? (
                            <button
                              onClick={() => addItem(item)}
                              className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-[10px] sm:text-xs font-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl shadow-sm shadow-orange-200 transition-all"
                            >
                              ADD
                            </button>
                          ) : (
                            <div className="flex items-center gap-1 sm:gap-2 bg-orange-50 px-1 sm:px-2 py-1 sm:py-1.5 rounded-lg sm:rounded-xl">
                              <button onClick={() => removeItem(item.id)} className="w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center bg-white text-orange-600 rounded-md sm:rounded-lg shadow-sm hover:bg-orange-50 active:scale-90 transition-all">
                                <Minus size={10} />
                              </button>
                              <span className="text-[10px] sm:text-sm font-black text-orange-600 w-4 sm:w-5 text-center">{qty}</span>
                              <button onClick={() => addItem(item)} className="w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center bg-white text-orange-600 rounded-md sm:rounded-lg shadow-sm hover:bg-orange-50 active:scale-90 transition-all">
                                <Plus size={10} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
