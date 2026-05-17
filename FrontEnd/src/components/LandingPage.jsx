import { useEffect } from "react";
import { Search, ShoppingCart, Bell, UtensilsCrossed, ChevronRight, BarChart3, CalendarClock, ShieldCheck } from "lucide-react";
import { useCanteen } from "../context/CanteenContext";
import { useNavigate } from "react-router-dom";

const HOW_IT_WORKS = [
  { step: "01", icon: Search, color: "#F97316", title: "Browse the Menu", desc: "Open ADU Food Court on your phone or laptop. Browse today's fresh menu with prices, prep times, and availability." },
  { step: "02", icon: ShoppingCart, color: "#A855F7", title: "Place Your Pre-Order", desc: "Select your items, choose your pickup time slot. No cash hassles, no waiting in a payment queue." },
  { step: "03", icon: Bell, color: "#06B6D4", title: "Get Notified When Ready", desc: "Receive an instant notification when your food is being prepared and again when it's ready for pickup." },
  { step: "04", icon: UtensilsCrossed, color: "#22C55E", title: "Pick Up & Enjoy", desc: "Walk straight to the pickup counter, show your order code, and grab your freshly prepared meal." },
];

const FEATURES = [
  { icon: BarChart3, color: "#06B6D4", title: "Live Queue Tracker", desc: "See how many people are ahead of you and track estimated wait times." },
  { icon: CalendarClock, color: "#F97316", title: "Schedule Future Orders", desc: "Pre-book your lunch the night before. Perfect for busy lecture days." },
  { icon: ShieldCheck, color: "#22C55E", title: "Secure & Reliable", desc: "End-to-end encrypted transactions. Your data and money are always safe." },
];

const STATS = [
  { value: "85%", label: "Queue Reduction" },
  { value: "3x", label: "Faster Service" },
  { value: "98%", label: "Satisfaction" },
  { value: "0", label: "Cold Food" },
];

export default function LandingPage() {
  const { user, isAuthenticated } = useCanteen();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="flex-1 overflow-y-auto bg-[#0B0E1A]">
      <style>{`
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        @keyframes glow { 0%,100% { opacity: 0.4; } 50% { opacity: 0.8; } }
        @keyframes slideUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        .float-card { animation: float 4s ease-in-out infinite; }
        .float-card-delay { animation: float 4s ease-in-out 1s infinite; }
        .glow-orb { animation: glow 3s ease-in-out infinite; }
        .slide-up { animation: slideUp 0.6s ease-out forwards; }
      `}</style>

      {/* ═══ PUBLIC HEADER ═══ */}
      <header className="h-16 bg-[#111827]/80 backdrop-blur-md border-b border-slate-800/80 flex items-center px-6 lg:px-16 justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
            <UtensilsCrossed className="text-white" size={18} />
          </div>
          <div>
            <h1 className="font-black text-base text-white tracking-tighter leading-tight">ADU Food</h1>
            <p className="text-orange-400 text-[8px] font-black uppercase tracking-widest">Court</p>
          </div>
        </div>
        <button
          onClick={() => navigate("/login")}
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 transition-all active:scale-95"
        >
          Login / Sign Up
        </button>
      </header>

      {/* ═══ HERO SECTION ═══ */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden px-5 lg:px-16 pt-16 sm:pt-24 pb-12">
        {/* Background glow orbs */}
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl glow-orb pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl glow-orb pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-8 items-center">
          {/* Left - Text */}
          <div className="slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-orange-400 text-xs font-bold uppercase tracking-widest">Skip the Queue · Order Ahead</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
              Your<br />Canteen,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Smarter<br />& Faster</span>
            </h1>

            <p className="text-slate-400 text-base lg:text-lg max-w-md mb-10 leading-relaxed">
              Pre-order your meals from the college canteen, skip the long queues, and pick up your food fresh and ready — all in just a few taps.
            </p>

            <div className="flex flex-wrap gap-4">
              <button onClick={() => navigate("/login")} className="group flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:shadow-lg hover:shadow-orange-500/30 transition-all active:scale-95">
                Start Pre-Ordering <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="#how-it-works" className="flex items-center gap-2 border border-slate-700 text-slate-300 px-8 py-4 rounded-2xl font-bold text-sm hover:bg-slate-800/50 transition-all">
                See How It Works
              </a>
            </div>
          </div>

          {/* Right - Floating food cards */}
          <div className="hidden lg:block relative h-[500px]">
            {/* Big food image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 rounded-[3rem] overflow-hidden shadow-2xl shadow-orange-900/30 border-2 border-slate-700/50">
                <img src="https://images.unsplash.com/photo-1666190092689-e3968aa0c32c?w=500&h=500&fit=crop" alt="Food" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Floating card 1 */}
            <div className="absolute top-8 left-0 float-card">
              <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl p-3 border border-slate-700/50 shadow-xl flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1750767397012-3413ba4fdbc7?w=100&h=100&fit=crop" alt="Vada Pav" className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <p className="text-white text-sm font-bold">Vada Pav</p>
                  <p className="text-orange-400 text-xs font-bold">₹20</p>
                </div>
              </div>
            </div>

            {/* Floating card 2 - Stats */}
            <div className="absolute top-4 right-0 float-card-delay">
              <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 backdrop-blur-xl rounded-2xl px-5 py-3 border border-orange-500/30 shadow-xl text-center">
                <p className="text-orange-400 text-2xl font-black">2,400+</p>
                <p className="text-slate-400 text-xs font-medium">Active Students</p>
              </div>
            </div>

            {/* Floating card 3 - Order ready */}
            <div className="absolute bottom-16 left-4 float-card-delay">
              <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl p-3 border border-slate-700/50 shadow-xl">
                <p className="text-white text-sm font-bold">Order Ready! 🎉</p>
                <p className="text-slate-400 text-xs">Dal Makhani + Roti · ₹85</p>
              </div>
            </div>

            {/* Floating card 4 */}
            <div className="absolute bottom-8 right-0 float-card">
              <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl p-3 border border-slate-700/50 shadow-xl flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1619898804188-e7bad4bd2127?w=100&h=100&fit=crop" alt="Mango Lassi" className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <p className="text-white text-sm font-bold">Mango Lassi</p>
                  <p className="text-orange-400 text-xs font-bold">₹40</p>
                </div>
                <span className="text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">READY</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how-it-works" className="py-20 lg:py-28 px-5 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-5 py-2 rounded-full border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-widest mb-6">How It Works</span>
            <h2 className="text-4xl lg:text-5xl font-black text-white italic mb-4">Order in 4 Simple Steps</h2>
            <p className="text-slate-400 max-w-lg mx-auto">ADU Food Court makes ordering food from your college canteen effortless — from browsing to pickup in under 5 minutes.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOW_IT_WORKS.map(({ step, icon: Icon, color, title, desc }) => (
              <div key={step} className="relative bg-slate-900/60 rounded-3xl p-6 border border-slate-800 hover:border-slate-700 transition-all group">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                    <Icon size={22} style={{ color }} />
                  </div>
                  <span className="text-4xl font-black text-slate-800 group-hover:text-slate-700 transition-colors">{step}</span>
                </div>
                <h3 className="text-white font-bold text-base mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TODAY'S MENU PREVIEW SECTION ═══ */}
      <section className="py-20 lg:py-28 px-5 lg:px-16 bg-slate-950/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-5 py-2 rounded-full border border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">Today's Menu</span>
            <h2 className="text-4xl lg:text-5xl font-black text-white italic mb-4">Fresh Picks, Every Day</h2>
            <p className="text-slate-400 max-w-lg mx-auto">Explore some of today's fresh selections. Log in to view the complete menu and place your pre-order.</p>
          </div>

          {/* Featured Static Menu Grid - NO BORDERS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                name: "Masala Dosa",
                price: 45,
                rating: 4.5,
                prepTime: 10,
                badge: "Bestseller",
                image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&h=350&fit=crop",
                description: "Crispy rice crepe with flavorful spiced potato filling, served with sambar & chutneys.",
                badgeStyle: { bg: "rgba(249,115,22,0.15)", color: "#F97316" }
              },
              {
                name: "Vada Pav",
                price: 20,
                rating: 4.3,
                prepTime: 5,
                badge: "Popular",
                image: "https://images.unsplash.com/photo-1750767397012-3413ba4fdbc7?w=500&h=350&fit=crop",
                description: "Classic Mumbai street food - golden fried spiced potato dumpling served inside soft bread.",
                badgeStyle: { bg: "rgba(249,115,22,0.15)", color: "#F97316" }
              },
              {
                name: "Veg Biryani",
                price: 85,
                rating: 4.4,
                prepTime: 15,
                badge: "Chef's Pick",
                image: "https://images.unsplash.com/photo-1642821373181-696a54913e93?w=500&h=350&fit=crop",
                description: "Aromatic basmati rice layered with garden fresh vegetables and exotic spices.",
                badgeStyle: { bg: "rgba(225,29,72,0.15)", color: "#FB7185" }
              }
            ].map(item => (
              <div key={item.name} className="group bg-slate-900/60 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-3 left-3 w-6 h-6 border-2 border-green-500 bg-slate-900/80 rounded-md flex items-center justify-center"><div className="w-2.5 h-2.5 rounded-full bg-green-500" /></div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider backdrop-blur-sm" style={{ background: item.badgeStyle.bg, color: item.badgeStyle.color }}>{item.badge}</div>
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-slate-900/85 backdrop-blur-sm px-2.5 py-1 rounded-xl shadow-sm"><span className="text-orange-400">★</span><span className="text-xs font-black text-white">{item.rating}</span></div>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-1">
                    <h3 className="text-base font-bold text-white group-hover:text-orange-400 transition-colors leading-tight line-clamp-1">{item.name}</h3>
                  </div>
                  <p className="text-slate-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">{item.description}</p>
                  <div className="flex items-center justify-between mt-5 pt-3 border-t border-slate-800/80">
                    <span className="text-lg font-black text-white">₹{item.price}</span>
                    <button onClick={() => navigate("/login")} className="text-xs font-bold px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-md hover:shadow-orange-500/20 active:scale-95 text-white">PRE-ORDER</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Explore Full Menu Button */}
          <div className="text-center mt-12">
            <button onClick={() => navigate("/login")} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-slate-800 text-slate-300 font-bold text-sm hover:bg-slate-800/50 hover:border-slate-700 transition-all">
              Explore Full Menu <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section className="py-20 px-5 lg:px-16">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-3 gap-5">
          {FEATURES.map(({ icon: Icon, color, title, desc }) => (
            <div key={title} className="bg-slate-900/60 rounded-3xl p-6 border border-slate-800 hover:border-slate-700 transition-all">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                <Icon size={22} style={{ color }} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ STATS SECTION ═══ */}
      <section className="py-20 px-5 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] p-8 lg:p-14 border border-slate-700/50">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-5xl font-black text-white italic leading-tight mb-4">
                  85% less time waiting.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">100% more time enjoying.</span>
                </h2>
                <p className="text-slate-400 max-w-md leading-relaxed">Students who use ADU Food Court spend 85% less time in queues and enjoy hotter, freshly prepared food — every single day.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {STATS.map(({ value, label }) => (
                  <div key={label} className="bg-slate-800/60 rounded-2xl p-6 text-center border border-slate-700/50">
                    <p className="text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-1">{value}</p>
                    <p className="text-slate-400 text-sm font-medium">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA SECTION ═══ */}
      <section className="py-20 lg:py-28 px-5 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-green-400 text-xs font-bold uppercase tracking-widest">Now Available at Your College</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-white italic leading-tight mb-8">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">skip the queue</span> forever?
          </h2>
          <button onClick={() => navigate("/login")} className="group inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-5 rounded-2xl font-bold text-base hover:shadow-lg hover:shadow-orange-500/30 transition-all active:scale-95">
            Get Started Now <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer spacer */}
      <div className="h-8" />
    </div>
  );
}
