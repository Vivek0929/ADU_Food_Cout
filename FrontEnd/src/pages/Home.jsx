import { Home as HomeIcon, UtensilsCrossed, ShoppingCart, ClipboardList, User } from "lucide-react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useCanteen } from "../context/CanteenContext";
import Sidebar from "../components/Sidebar";
import { Header } from "../components/Header";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useCanteen();

  const totalItemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0);
  const activePath = location.pathname;

  // ── Mobile bottom-nav items ──────────────────────────────────────────────
  const mobileNav = [
    { id: "home", path: "/", icon: HomeIcon, label: "Home" },
    { id: "menu", path: "/menu", icon: UtensilsCrossed, label: "Menu" },
    { id: "cart", path: "/cart", icon: ShoppingCart, label: "Cart" },
    { id: "orders", path: "/orders", icon: ClipboardList, label: "Orders" },
    { id: "profile", path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          DESKTOP layout — Sidebar + Header (lg: 1024px and up)
          ════════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex h-screen bg-[#FDFCFB] overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-hidden flex flex-col">
            <Outlet />
          </main>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          MOBILE / TABLET layout — Bottom nav (below lg)
          ════════════════════════════════════════════════════════ */}
      <div className="lg:hidden bg-[#F9F9FB] min-h-screen pt-[60px] pb-[60px]">
        {/* Mobile top-bar */}
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-white border-b border-slate-100 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center shadow shadow-orange-200">
              <UtensilsCrossed size={16} className="text-white" />
            </div>
            <div>
              <p className="font-black text-sm text-slate-900 leading-tight">ADU Food</p>
              <p className="text-[8px] font-black text-orange-500 uppercase tracking-widest">Court</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {totalItemsInCart > 0 && (
              <button
                onClick={() => navigate("/cart")}
                className="relative w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center"
              >
                <ShoppingCart size={16} className="text-orange-500" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-white text-[9px] font-black rounded-full flex items-center justify-center">
                  {totalItemsInCart}
                </span>
              </button>
            )}
            <div 
              onClick={() => navigate("/profile")}
              className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-black cursor-pointer"
            >
              U
            </div>
          </div>
        </header>

        {/* Mobile page content */}
        <main className="h-full">
          <Outlet />
        </main>

        {/* Mobile bottom navigation bar */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-100 px-2 pb-2 pt-1 grid grid-cols-5 gap-1 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          {mobileNav.map(({ id, path, icon: Icon, label }) => {
            const isActive = activePath === path;
            return (
              <button
                key={id}
                onClick={() => navigate(path)}
                className="flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-xl transition-all relative"
              >
                <div className={`relative w-8 h-8 flex items-center justify-center rounded-xl transition-all ${isActive ? "bg-orange-500 shadow-md shadow-orange-200" : "bg-transparent"}`}>
                  <Icon size={18} className={isActive ? "text-white" : "text-slate-400"} />
                  {id === "cart" && totalItemsInCart > 0 && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-orange-500 border-2 border-white text-white text-[7px] font-black rounded-full flex items-center justify-center">
                      {totalItemsInCart}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] font-bold transition-colors ${isActive ? "text-orange-500" : "text-slate-400"}`}>
                  {label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Home;