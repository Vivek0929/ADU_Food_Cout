import { useState } from "react";
import { Star, Clock, Plus, Minus, Search, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FoodAnimations from '../../components/FoodAnimations';
import { useCanteen } from "../../context/CanteenContext";

// ─── Menu Data Categories ──────────────────────────────────────────────────────
const CATEGORIES = ["All", "Breakfast", "Lunch", "Snacks", "Beverages", "Desserts"];

const CATEGORY_EMOJI = { All: "🍽️", Breakfast: "🌅", Lunch: "☀️", Snacks: "🍿", Beverages: "🥤", Desserts: "🍮" };

const BADGE_STYLE = {
  "Bestseller": { bg: "#FFF7ED", color: "#EA580C" },
  "Popular": { bg: "#FFF7ED", color: "#EA580C" },
  "Chef's Pick": { bg: "#FFF1F2", color: "#E11D48" },
  "New": { bg: "#F0FDF4", color: "#16A34A" },
  "Sweet Pick": { bg: "#FDF2F8", color: "#A21CAF" },
};

export default function UserDashboard({ showHero = true }) {
  const { menuItems, cart, setCart, user } = useCanteen();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  // Filter items
  const filtered = menuItems.filter(item => {
    const matchCat = activeCategory === "All" || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  // Group by category for full menu page
  const grouped = filtered.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  // Cart helpers
  const getQty = (id) => cart.find(c => c.id === id)?.quantity ?? 0;
  const addItem = (item) => {
    const ex = cart.find(c => c.id === item.id);
    setCart(ex
      ? cart.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c)
      : [...cart, { ...item, quantity: 1 }]
    );
  };
  const removeItem = (id) => {
    const ex = cart.find(c => c.id === id);
    if (!ex) return;
    setCart(ex.quantity === 1
      ? cart.filter(c => c.id !== id)
      : cart.map(c => c.id === id ? { ...c, quantity: c.quantity - 1 } : c)
    );
  };

  // Get exactly 3 featured items for the Home page preview (e.g. active items that are bestsellers/popular)
  const featuredPicks = menuItems
    .filter(item => item.active)
    .slice(0, 3); // Grab top 3 items to show as showcase preview

  return (
    <div className="flex-1 overflow-y-auto bg-[#F9F9FB]">

      {/* ═════════════════════════════════════════════════════════════════════════════
          1. GUEST/USER HOME PAGE PREVIEW VIEW (renders on /dashboard)
          ═════════════════════════════════════════════════════════════════════════════ */}
      {showHero ? (
        <>
          {/* Hero Greeting Banner */}
          <div
            className="relative mx-5 mt-5 rounded-[32px] overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:shadow-orange-200 hover:-translate-y-1"
            style={{ 
              background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
              minHeight: '160px'
            }}
          >
            {/* Content */}
            <div className="relative z-10 px-10 py-10 transition-all duration-500 group-hover:py-12">
              <p className="text-white/80 text-sm font-semibold mb-1 transform transition-all duration-500 group-hover:translate-x-1">
                {greeting},
              </p>
              <h1 className="text-white text-3xl font-black flex items-center gap-3 mb-2 transform transition-all duration-500 group-hover:scale-105 group-hover:translate-x-1">
                {user?.name || 'User'} <span className="animate-bounce">👋</span>
              </h1>
              <p className="text-white/90 text-base font-medium max-w-[200px] leading-tight transform transition-all duration-500 group-hover:translate-x-1">
                Order ahead, skip the queue!
              </p>
            </div>

            {/* Shimmer and Glow animations */}
            <FoodAnimations />
            
            {/* Decorative circles */}
            <div className="absolute right-[-6%] top-[-40%] bg-white/10 rounded-full pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-4" style={{ width: 240, height: 240 }} />
            <div className="absolute right-[10%] bottom-[-55%] bg-white/10 rounded-full pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:translate-y-4" style={{ width: 200, height: 200 }} />
          </div>

          {/* Featured Title */}
          <div className="text-center mt-12 mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-orange-600 text-[10px] font-black uppercase tracking-wider mb-2">Today's Picks</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 italic">Fresh Picks, Every Day</h2>
            <p className="text-slate-500 text-sm mt-1 max-w-md mx-auto">Explore some of today's fresh selections. Go to the menu to order your favorites.</p>
          </div>

          {/* Curated Preview Grid - NO BORDERS */}
          <div className="px-5">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
              {featuredPicks.map(item => {
                const qty = getQty(item.id);
                const badge = BADGE_STYLE[item.badge];
                return (
                  <div key={item.id} className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-transparent shadow-sm hover:shadow-lg hover:shadow-orange-100 lg:hover:-translate-y-1 transition-all duration-300">
                    {/* Image Section */}
                    <div className="relative h-32 sm:h-40 lg:h-48 overflow-hidden">
                      <img src={item.image} alt={item.name} className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105`} />
                      
                      {/* Veg Indicator */}
                      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-5 h-5 sm:w-6 sm:h-6 border-2 border-green-500 bg-white rounded-md sm:rounded-lg flex items-center justify-center shadow">
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500" />
                      </div>

                      {/* Badge */}
                      {item.badge && badge && (
                        <div className="hidden sm:block absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shadow"
                          style={{ background: badge.bg, color: badge.color }}>
                          {item.badge}
                        </div>
                      )}

                      {/* Rating overlay */}
                      <div className="hidden lg:flex absolute bottom-3 right-3 items-center gap-1 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-xl shadow-sm">
                        <Star size={12} className="fill-orange-500 text-orange-500" />
                        <span className="text-xs font-black text-slate-800">{item.rating}</span>
                      </div>
                    </div>

                    {/* Body Section */}
                    <div className="p-3 sm:p-4">
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
                            className="text-[10px] sm:text-xs font-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-95 text-white shadow-sm shadow-orange-200"
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

          {/* Explore Full Menu CTA Button */}
          <div className="text-center mt-12 pb-16">
            <button
              onClick={() => navigate("/menu")}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:shadow-lg hover:shadow-orange-500/30 transition-all active:scale-95 shadow-md shadow-orange-500/20"
            >
              Explore Full Menu <ChevronRight size={18} />
            </button>
          </div>
        </>
      ) : (
        /* ═════════════════════════════════════════════════════════════════════════════
            2. FULL CATEGORIZED MENU DIRECTORY VIEW (renders on /menu)
            ═════════════════════════════════════════════════════════════════════════════ */
        <>
          {/* Search Bar */}
          <div className="px-5 mt-6 relative">
            <Search className="absolute left-9 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search for your favorite dishes..."
              className="w-full pl-12 pr-5 py-4 bg-white rounded-2xl text-sm text-slate-800 placeholder-slate-400 border border-slate-100 shadow-sm outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 transition-all font-medium"
            />
          </div>

          {/* Category Filters */}
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

          {/* Menu Grid */}
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
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-4 sm:mb-5">
                    <div className="flex items-center gap-2">
                      <Search className="w-5 h-5 sm:w-6 sm:h-6 text-slate-800" strokeWidth={3} />
                      <h2 className="text-lg sm:text-2xl font-black text-slate-900">{category}</h2>
                    </div>
                    <span className="hidden sm:inline-block text-[10px] font-black text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-wider">
                      {items.length} items
                    </span>
                  </div>

                  {/* Cards - NO BORDERS */}
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
                    {items.map(item => {
                      const qty = getQty(item.id);
                      const badge = BADGE_STYLE[item.badge];
                      return (
                        <div key={item.id} className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-transparent shadow-sm hover:shadow-lg hover:shadow-orange-100 lg:hover:-translate-y-1 transition-all duration-300">
                          {/* Image Section */}
                          <div className="relative h-32 sm:h-40 lg:h-48 overflow-hidden">
                            <img src={item.image} alt={item.name} className={`w-full h-full object-cover transition-transform duration-500 ${!item.active ? 'grayscale opacity-80' : 'group-hover:scale-105'}`} />
                            
                            {!item.active && (
                              <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-10">
                                <span className="bg-black/80 text-white text-[11px] sm:text-xs font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full tracking-wide">
                                  Unavailable
                                </span>
                              </div>
                            )}
                            
                            {/* Veg Indicator */}
                            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-5 h-5 sm:w-6 sm:h-6 border-2 border-green-500 bg-white rounded-md sm:rounded-lg flex items-center justify-center shadow">
                              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500" />
                            </div>

                            {/* Badge */}
                            {item.badge && badge && (
                              <div className="hidden sm:block absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shadow"
                                style={{ background: badge.bg, color: badge.color }}>
                                {item.badge}
                              </div>
                            )}

                            {/* Rating overlay */}
                            <div className="hidden lg:flex absolute bottom-3 right-3 items-center gap-1 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-xl shadow-sm">
                              <Star size={12} className="fill-orange-500 text-orange-500" />
                              <span className="text-xs font-black text-slate-800">{item.rating}</span>
                            </div>
                          </div>

                          {/* Body Section */}
                          <div className="p-3 sm:p-4">
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
                                  disabled={!item.active}
                                  className={`text-[10px] sm:text-xs font-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-all ${
                                    !item.active 
                                      ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                                      : "bg-orange-500 hover:bg-orange-600 active:scale-95 text-white shadow-sm shadow-orange-200"
                                  }`}
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
        </>
      )}

    </div>
  );
}
