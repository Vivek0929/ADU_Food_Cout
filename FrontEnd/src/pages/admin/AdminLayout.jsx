import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, UtensilsCrossed, Clock, LogOut, ArrowLeft } from "lucide-react";
import { useCanteen } from "../../context/CanteenContext";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useCanteen();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleBack = () => {
    navigate("/", { replace: true });
  };

  const navigation = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Orders", path: "/admin/orders", icon: ShoppingBag },
    { name: "Menu", path: "/admin/menu", icon: UtensilsCrossed },
    { name: "Slots", path: "/admin/slots", icon: Clock },
  ];

  const currentPath = location.pathname;

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          DESKTOP layout — Sidebar + Header (lg: 1024px and up)
          ════════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex h-screen bg-[#FDFCFB] overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[280px] bg-white border-r border-slate-100 flex flex-col z-20">
          <div className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-md shadow-orange-200">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"></path>
                  <line x1="6" y1="17" x2="18" y2="17"></line>
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-black text-slate-900 tracking-tight">Admin Panel</h1>
              </div>
            </div>
          </div>

          <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${
                    isActive
                      ? "bg-orange-50 text-orange-600"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <item.icon size={20} className={isActive ? "text-orange-500" : "text-slate-400"} />
                  {item.name}
                </button>
              );
            })}
          </div>

          <div className="p-4 border-t border-slate-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <header className="h-[72px] bg-white border-b border-slate-100 flex items-center justify-between px-10 z-10 shrink-0">
             <div className="flex items-center gap-4">
               <button
                 onClick={handleBack}
                 className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors font-semibold hover:bg-slate-50 px-3 py-2 rounded-lg"
               >
                 <ArrowLeft size={20} />
                 <span className="hidden sm:inline">Back</span>
               </button>
               <h1 className="text-xl font-bold text-slate-900">Admin Panel</h1>
             </div>
             <button
               onClick={handleLogout}
               className="text-slate-500 hover:text-slate-800 font-medium text-sm flex items-center gap-2"
             >
               <LogOut size={18} />
               Logout
             </button>
          </header>
          <main className="flex-1 overflow-y-auto bg-[#F9F9FB]">
            <Outlet />
          </main>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          MOBILE / TABLET layout — Bottom nav (below lg)
          ════════════════════════════════════════════════════════ */}
      <div className="flex lg:hidden flex-col h-screen bg-[#F9F9FB] overflow-hidden">
        {/* Mobile top-bar */}
        <header className="flex items-center justify-between px-5 py-4 bg-white border-b border-slate-100 shrink-0">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors font-semibold hover:bg-slate-50 px-2 py-1.5 rounded-lg"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F97316] rounded-xl flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"></path>
                <line x1="6" y1="17" x2="18" y2="17"></line>
              </svg>
            </div>
            <h1 className="font-bold text-[18px] text-slate-900 leading-tight">Admin</h1>
          </div>

          <button
            onClick={handleLogout}
            className="text-slate-500 hover:text-red-600 font-medium text-sm flex items-center gap-1"
          >
            <LogOut size={16} />
          </button>
        </header>

        {/* Mobile page content */}
        <main className="flex-1 overflow-y-auto bg-[#F9F9FB]">
          <Outlet />
        </main>

        {/* Mobile bottom navigation bar */}
        <nav className="sticky bottom-0 z-50 w-full bg-white border-t border-slate-100 px-2 pb-2 pt-2 grid grid-cols-4 gap-1">
          {navigation.map(({ path, name, icon: Icon }) => {
            const isActive = currentPath === path;
            return (
              <button
                key={name}
                onClick={() => navigate(path)}
                className="flex flex-col items-center justify-center gap-1.5 py-1 rounded-xl transition-all relative"
              >
                <div className={`relative w-10 h-10 flex items-center justify-center rounded-xl transition-all ${isActive ? "bg-orange-50 text-orange-500" : "text-slate-400 bg-transparent"}`}>
                  <Icon size={22} className={isActive ? "text-orange-500" : "text-slate-500"} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={`text-[11px] transition-colors ${isActive ? "font-bold text-orange-500" : "font-medium text-slate-500"}`}>
                  {name}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default AdminLayout;
