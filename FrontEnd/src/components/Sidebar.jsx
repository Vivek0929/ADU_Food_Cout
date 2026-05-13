import { Home, UtensilsCrossed, ShoppingCart, ClipboardList, User, Shield } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCanteen } from "../context/CanteenContext";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, user } = useCanteen();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const activePath = location.pathname;

  const userMenuItems = [
    { icon: <Home size={18} />, label: "Home", path: "/" },
    { icon: <UtensilsCrossed size={18} />, label: "Menu", path: "/menu" },
    { icon: <ShoppingCart size={18} />, label: "Cart", path: "/cart", hasBadge: true },
    { icon: <ClipboardList size={18} />, label: "Orders", path: "/orders" },
    { icon: <User size={18} />, label: "Profile", path: "/profile" },
  ];

  // Add admin menu item only for admins
  const adminMenuItems = user?.role === 'admin' 
    ? [
        ...userMenuItems,
        { icon: <Shield size={18} />, label: "Admin Panel", path: "/admin" },
      ]
    : userMenuItems;

  return (
    <aside className="w-56 bg-[#111827] text-white flex flex-col h-screen sticky top-0 shrink-0 border-r border-white/5">
      {/* Brand Section (Compact) */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
          <UtensilsCrossed className="text-white" size={20} />
        </div>
        <div>
          <h1 className="font-black text-lg tracking-tighter leading-tight">ADU Food</h1>
          <p className="text-orange-400 text-[8px] font-black uppercase tracking-widest">Court</p>
        </div>
      </div>

      {/* Navigation (Compact) */}
      <nav className="flex-1 px-3 py-4 space-y-1.5">
        {adminMenuItems.map((item) => {
          const isActive = activePath === item.path || (item.path === "/admin" && activePath.startsWith("/admin"));
          const isAdminLink = item.path === "/admin";
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative group ${
                isActive 
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {isActive && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-white rounded-l-full" />
              )}
              
              <div className={`transition-transform ${isActive ? "scale-105" : "group-hover:scale-105"}`}>
                {item.icon}
              </div>
              <span className="font-bold text-xs tracking-wide">{item.label}</span>

              {/* Admin Badge */}
              {isAdminLink && user?.role === 'admin' && (
                <span className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-black">
                  ⚙️
                </span>
              )}

              {item.hasBadge && cartCount > 0 && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-orange-600 text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Section (Compact) */}
      <div className="p-4 border-t border-white/5 bg-black/10">
        <button 
          onClick={() => navigate("/profile")}
          className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-all group text-left"
        >
          <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center font-black text-sm">
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-white truncate">{user?.name}</p>
            <p className="text-slate-500 text-[8px] font-black uppercase tracking-tight">
              {user?.role === 'admin' ? '🔐 Admin' : '👤 User'}
            </p>
          </div>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
