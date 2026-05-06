import { useState } from "react";
import { Home as HomeIcon, UtensilsCrossed, ShoppingCart, ClipboardList, User } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { Header } from "../components/Header";
import LandingPage from "../components/LandingPage";
import { MenuPage } from "./MenuPage";
import Orders from "./Orders";
import Profile from "./Profile";
import Cart from "./Cart";

const Home = () => {
  const [activePage, setActivePage] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  const handleSearchChange = (query) => setSearchQuery(query);
  const handleCartUpdate   = (newCart) => setCart(newCart);

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    const newOrder = {
      id: `#${1043 + orders.length}`,
      items: [...cart],
      items_list: cart.map(item => `${item.name} x${item.quantity}`).join(", "),
      total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
           + Math.round(cart.reduce((acc, item) => acc + item.price * item.quantity, 0) * 0.05),
      time: "Just now",
      status: "Processing",
    };
    setOrders([newOrder, ...orders]);
    setCart([]);
    setActivePage("orders");
  };

  const totalItemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0);

  const renderContent = () => {
    switch (activePage) {
      case "home":    return <LandingPage cart={cart} onCartUpdate={handleCartUpdate} showHero={true} />;
      case "menu":    return <LandingPage cart={cart} onCartUpdate={handleCartUpdate} showHero={false} />;
      case "cart":    return <Cart cart={cart} onCartUpdate={handleCartUpdate} onNavigateToMenu={() => setActivePage("home")} onPlaceOrder={handlePlaceOrder} />;
      case "orders":  return <Orders orders={orders} />;
      case "profile": return <Profile />;
      default:        return <LandingPage cart={cart} onCartUpdate={handleCartUpdate} />;
    }
  };

  // ── Mobile bottom-nav items ──────────────────────────────────────────────
  const mobileNav = [
    { id: "home",    icon: HomeIcon,       label: "Home"    },
    { id: "menu",    icon: UtensilsCrossed,label: "Menu"    },
    { id: "cart",    icon: ShoppingCart,   label: "Cart"    },
    { id: "orders",  icon: ClipboardList,  label: "Orders"  },
    { id: "profile", icon: User,           label: "Profile" },
  ];

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          DESKTOP layout — Sidebar + Header (lg: 1024px and up)
          ════════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex h-screen bg-[#FDFCFB] overflow-hidden">
        <Sidebar
          activePage={activePage}
          onPageChange={setActivePage}
          cartCount={totalItemsInCart}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-hidden flex flex-col">
            {renderContent()}
          </main>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          MOBILE / TABLET layout — Bottom nav (below lg)
          ════════════════════════════════════════════════════════ */}
      <div className="flex lg:hidden flex-col h-screen bg-[#F9F9FB] overflow-hidden">
        {/* Mobile top-bar */}
        <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-100 shrink-0">
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
                onClick={() => setActivePage("cart")}
                className="relative w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center"
              >
                <ShoppingCart size={16} className="text-orange-500" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-white text-[9px] font-black rounded-full flex items-center justify-center">
                  {totalItemsInCart}
                </span>
              </button>
            )}
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-black">
              U
            </div>
          </div>
        </header>

        {/* Mobile page content */}
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>

        {/* Mobile bottom navigation bar */}
        <nav className="shrink-0 bg-white border-t border-slate-100 px-2 pb-2 pt-1 grid grid-cols-5 gap-1 shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
          {mobileNav.map(({ id, icon: Icon, label }) => {
            const isActive = activePage === id;
            return (
              <button
                key={id}
                onClick={() => setActivePage(id)}
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