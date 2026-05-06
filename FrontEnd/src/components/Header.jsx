import { useState } from "react";
import { Bell, ChevronDown } from "lucide-react";

export function Header() {
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-[#E5E7F0] flex items-center px-6 gap-4 sticky top-0 z-40">
      <div className="flex-1" />

      <div className="flex items-center gap-3 ml-auto">
        {/* Notification */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="w-9 h-9 rounded-xl bg-[#F3F4F8] hover:bg-[#E9EAFF] flex items-center justify-center transition-colors relative"
          >
            <Bell className="w-4 h-4 text-[#6B7280]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EF4444] rounded-full" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-12 w-72 bg-white rounded-xl shadow-xl border border-[#E5E7F0] p-3 z-50">
              <p className="text-sm font-semibold text-[#1E1B4B] mb-2">Notifications</p>
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

        {/* User Profile */}
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-[#F3F4F8] transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#EF4444] flex items-center justify-center text-white text-sm font-bold">
            U
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-semibold text-[#1E1B4B] leading-tight">User</p>
            <p className="text-xs text-[#9CA3AF]">ID: ADU2024</p>
          </div>
          <ChevronDown className="w-3 h-3 text-[#9CA3AF] hidden sm:block" />
        </button>
      </div>
    </header>
  );
}
