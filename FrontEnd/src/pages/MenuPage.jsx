import { useState } from "react";
import { Star, Clock, Plus, Minus, Search } from "lucide-react";

const menuItems = [
    {
        id: 1,
        name: "Masala Dosa",
        description: "Crispy dosa with spiced potato filling & chutneys",
        price: 45,
        rating: 4.5,
        prepTime: 8,
        category: "Breakfast",
        image: "https://images.unsplash.com/photo-1708146464361-5c5ce4f9abb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
        isVeg: true,
        badge: "Bestseller",
    },
    {
        id: 2,
        name: "Idli Sambar",
        description: "Soft idlis served with tangy sambar & coconut chutney",
        price: 35,
        rating: 4.3,
        prepTime: 5,
        category: "Breakfast",
        image: "https://images.unsplash.com/photo-1668236499396-a62d2d1cb0cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
        isVeg: true,
    },
    {
        id: 3,
        name: "Poha",
        description: "Light flattened rice with veggies, nuts & spices",
        price: 25,
        rating: 4.2,
        prepTime: 5,
        category: "Breakfast",
        image: "https://images.unsplash.com/photo-1614247310314-c17f87b47ef9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
        isVeg: true,
    },
    {
        id: 4,
        name: "Veg Biryani",
        description: "Fragrant basmati rice with mixed vegetables & spices",
        price: 80,
        rating: 4.6,
        prepTime: 15,
        category: "Lunch",
        image: "https://images.unsplash.com/photo-1666190092689-e3968aa0c32c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
        isVeg: true,
        badge: "Popular",
    },
    {
        id: 5,
        name: "Paneer Butter Masala",
        description: "Creamy tomato-based curry with soft paneer cubes",
        price: 90,
        rating: 4.7,
        prepTime: 12,
        category: "Lunch",
        image: "https://images.unsplash.com/photo-1708793873401-e8c6c153b76a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
        isVeg: true,
        badge: "Chef's Pick",
    },
    {
        id: 6,
        name: "Vada Pav",
        description: "Spiced potato fritter in a bun - Mumbai's iconic street food",
        price: 20,
        rating: 4.4,
        prepTime: 5,
        category: "Snacks",
        image: "https://images.unsplash.com/photo-1750767397012-3413ba4fdbc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
        isVeg: true,
    },
    {
        id: 7,
        name: "Mango Lassi",
        description: "Chilled creamy yogurt drink blended with alphonso mango",
        price: 40,
        rating: 4.5,
        prepTime: 3,
        category: "Beverages",
        image: "https://images.unsplash.com/photo-1619898804188-e7bad4bd2127?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
        isVeg: true,
        badge: "New",
    },
    {
        id: 8,
        name: "Masala Chai",
        description: "Aromatic Indian spiced tea brewed with ginger & cardamom",
        price: 15,
        rating: 4.3,
        prepTime: 3,
        category: "Beverages",
        image: "https://images.unsplash.com/photo-1648192312898-838f9b322f47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
        isVeg: true,
    },
    {
        id: 9,
        name: "Gulab Jamun",
        description: "Soft milk-solid dumplings soaked in rose sugar syrup",
        price: 30,
        rating: 4.6,
        prepTime: 5,
        category: "Desserts",
        image: "https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
        isVeg: true,
        badge: "Sweet Pick",
    },
];

const categories = ["All", "Breakfast", "Lunch", "Snacks", "Beverages", "Desserts"];

const categoryEmoji = {
    All: "🍽️",
    Breakfast: "🌅",
    Lunch: "☀️",
    Snacks: "🍿",
    Beverages: "🥤",
    Desserts: "🍮",
};

const badgeColors = {
    Bestseller: "bg-orange-100 text-orange-600",
    Popular: "bg-orange-100 text-orange-600",
    "Chef's Pick": "bg-red-100 text-red-600",
    New: "bg-green-100 text-green-600",
    "Sweet Pick": "bg-pink-100 text-pink-600",
};

export function MenuPage({ searchQuery, cart, onCartUpdate, onSearchChange }) {
    const [activeCategory, setActiveCategory] = useState("All");

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 17) return "Good Afternoon";
        return "Good Evening";
    };

    const filteredItems = menuItems.filter((item) => {
        const matchCategory = activeCategory === "All" || item.category === activeCategory;
        const matchSearch =
            searchQuery === "" ||
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

    const groupedItems = filteredItems.reduce((acc, item) => {
        const cat = item.category;
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(item);
        return acc;
    }, {});

    const getCartQty = (id) => cart.find((c) => c.id === id)?.quantity ?? 0;

    const addToCart = (item) => {
        const existing = cart.find((c) => c.id === item.id);
        if (existing) {
            onCartUpdate(cart.map((c) => (c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c)));
        } else {
            onCartUpdate([...cart, { ...item, quantity: 1 }]);
        }
    };

    const removeFromCart = (id) => {
        const existing = cart.find((c) => c.id === id);
        if (!existing) return;
        if (existing.quantity === 1) {
            onCartUpdate(cart.filter((c) => c.id !== id));
        } else {
            onCartUpdate(cart.map((c) => (c.id === id ? { ...c, quantity: c.quantity - 1 } : c)));
        }
    };

    return (
        <div className="flex-1 overflow-y-auto bg-[#FDFCFB] flex flex-col">
            <div className="relative mx-6 mt-6 rounded-[2.5rem] overflow-hidden shadow-lg shadow-orange-100" style={{ background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)" }}>
                <div className="relative z-10 p-10">
                    <p className="text-orange-100 text-sm font-bold opacity-90">{getGreeting()},</p>
                    <h1 className="text-white mt-1 text-4xl font-black flex items-center gap-3">
                        User <span className="animate-bounce">👋</span>
                    </h1>
                    <p className="text-orange-100 text-lg mt-2 opacity-90 font-medium tracking-tight">Explore our freshly cooked meals.</p>
                </div>

                <div className="absolute right-[-10%] top-[-20%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            </div>

            <div className="mx-6 mt-8 relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                <input
                    type="text"
                    placeholder="Search for your favorite dishes..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-16 pr-8 py-5 bg-white rounded-[2rem] text-slate-900 shadow-xl shadow-slate-200/40 border border-slate-100 outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500/50 transition-all text-lg font-bold"
                />
            </div>


            <div className="mx-6 mt-6">
                <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-black whitespace-nowrap transition-all ${activeCategory === cat
                                ? "bg-orange-500 text-white shadow-xl shadow-orange-500/30 scale-105"
                                : "bg-white text-slate-500 hover:bg-orange-50 border border-slate-100"
                                }`}
                        >
                            <span className="text-2xl">{categoryEmoji[cat]}</span>
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mx-6 mt-8 pb-16 space-y-12 flex-1">
                {Object.entries(groupedItems).length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-28 text-center">
                        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                            <Search className="text-slate-300" size={40} />
                        </div>
                        <h3 className="text-slate-900 font-bold text-xl">No dishes found</h3>
                        <p className="text-slate-400 text-base mt-2">Try searching for something else</p>
                    </div>
                ) : (
                    Object.entries(groupedItems).map(([category, items]) => (
                        <div key={category}>
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                                        <span className="text-xl">{categoryEmoji[category]}</span>
                                    </div>
                                    <h2 className="text-slate-900 text-2xl font-black tracking-tight">
                                        {category}
                                    </h2>
                                </div>
                                <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-4 py-1.5 rounded-full uppercase tracking-widest">
                                    {items.length} items
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {items.map((item) => {
                                    const qty = getCartQty(item.id);
                                    return (
                                        <div
                                            key={item.id}
                                            className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-orange-200/40 hover:-translate-y-2 transition-all duration-500"
                                        >
                                            <div className="relative h-56 overflow-hidden">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute top-4 left-4 w-7 h-7 border-2 border-green-500 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                                </div>
                                                {item.badge && (
                                                    <div className={`absolute top-4 right-4 text-[10px] px-4 py-1.5 rounded-full font-black uppercase tracking-widest shadow-lg ${badgeColors[item.badge] ?? "bg-slate-100 text-slate-600"}`}>
                                                        {item.badge}
                                                    </div>
                                                )}
                                                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-lg border border-white/20">
                                                    <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                                                    <span className="text-slate-900 text-sm font-black">{item.rating}</span>
                                                </div>
                                            </div>

                                            <div className="p-6">
                                                <h4 className="text-slate-900 text-lg font-black leading-tight group-hover:text-orange-600 transition-colors">{item.name}</h4>
                                                <p className="text-slate-400 text-xs mt-3 line-clamp-2 leading-relaxed font-medium">{item.description}</p>

                                                <div className="flex items-center gap-2 mt-4 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                                    <Clock className="w-3.5 h-3.5 text-orange-500" />
                                                    <span>{item.prepTime} min</span>
                                                </div>

                                                <div className="flex items-center justify-between mt-6 pt-5 border-t border-slate-50">
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Price</span>
                                                        <span className="text-slate-900 text-2xl font-black tracking-tighter">₹{item.price}</span>
                                                    </div>

                                                    {qty === 0 ? (
                                                        <button
                                                            onClick={() => addToCart(item)}
                                                            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-black px-6 py-3 rounded-[1.25rem] shadow-xl shadow-orange-100 transition-all active:scale-90"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                            ADD
                                                        </button>
                                                    ) : (
                                                        <div className="flex items-center gap-1.5 bg-orange-50 p-1.5 rounded-[1.25rem]">
                                                            <button
                                                                onClick={() => removeFromCart(item.id)}
                                                                className="w-10 h-10 flex items-center justify-center text-orange-600 bg-white hover:bg-orange-50 rounded-xl transition-all shadow-md active:scale-90"
                                                            >
                                                                <Minus className="w-5 h-5" />
                                                            </button>
                                                            <span className="text-orange-600 text-lg font-black w-8 text-center">{qty}</span>
                                                            <button
                                                                onClick={() => addToCart(item)}
                                                                className="w-10 h-10 flex items-center justify-center text-orange-600 bg-white hover:bg-orange-50 rounded-xl transition-all shadow-md active:scale-90"
                                                            >
                                                                <Plus className="w-5 h-5" />
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

export default MenuPage;