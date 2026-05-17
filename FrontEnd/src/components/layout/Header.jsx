import { useState } from "react";
import { Bell, ChevronDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCanteen } from "../../context/CanteenContext";

export function Header() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useCanteen();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="h-16 bg-[#111827] border-b border-slate-800 flex items-center px-6 gap-4 sticky top-0 z-40">
      <div className="flex-1" />

      <div className="flex items-center gap-3 ml-auto">
        {/* Notification */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors relative"
          >
            <Bell className="w-4 h-4 text-slate-400" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EF4444] rounded-full" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-12 w-72 bg-slate-900 rounded-xl shadow-xl border border-slate-700 p-3 z-50">
              <p className="text-sm font-semibold text-white mb-2">Notifications</p>
              <div className="space-y-2">
                {[
                  { msg: "Your order #1042 is ready!", time: "2 min ago", color: "bg-green-100 text-green-700" },
                  { msg: "Special combo offer today!", time: "1 hr ago", color: "bg-purple-100 text-purple-700" },
                ].map((n, i) => (
                  <div key={i} className="flex gap-2 p-2 rounded-lg hover:bg-[#F8F9FF] cursor-pointer">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${n.color} whitespace-nowrap h-fit mt-0.5`}>New</span>
                    <div>
                      <p className="text-xs text-[#374151]">{n.msg}</p>
                      <p className="text-xs text-[#9CA3AF] mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-slate-800 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#EF4444] flex items-center justify-center text-white text-sm font-bold">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-white leading-tight">{user?.name}</p>
              <p className="text-xs text-slate-400">{user?.role === 'admin' ? '🔐 Admin' : '👤 User'}</p>
            </div>
            <ChevronDown className={`w-3 h-3 text-[#9CA3AF] hidden sm:block transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-12 w-48 bg-slate-900 rounded-xl shadow-xl border border-slate-700 p-2 z-50">
              <button
                onClick={() => {
                  navigate("/profile");
                  setProfileOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                👤 My Profile
              </button>
              {user?.role === 'admin' && (
                <button
                  onClick={() => {
                    navigate("/admin");
                    setProfileOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2 group"
                >
                  <span className="text-base">🛡️</span> Admin Panel
                  <span className="ml-auto text-red-500 font-black">⚙️</span>
                </button>
              )}
              <div className="border-t border-slate-700 my-2" />
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm font-semibold text-red-400 hover:bg-red-500/10 rounded-lg transition-colors flex items-center gap-2"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
