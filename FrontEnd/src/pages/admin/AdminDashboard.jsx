import { useCanteen } from "../../context/CanteenContext";
import { ShoppingBag, TrendingUp, Clock, BarChart } from "lucide-react";

const AdminDashboard = () => {
  const { orders } = useCanteen();

  const totalOrders = orders.length;
  const activeOrders = orders.filter(o => o.status === "Pending" || o.status === "Preparing").length;
  const todaysRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0); // simplistic sum for demo
  const todaysOrders = orders.length; // assuming all are today for demo

  // Get current date string formatted like "Wednesday, 06 May 2026"
  const dateStr = new Date().toLocaleDateString('en-US', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <div className="space-y-4 max-w-2xl mx-auto w-full px-4 pt-4 pb-24 lg:pb-8">
      {/* Canteen Admin Header Card */}
      <div className="bg-[#F97316] rounded-[24px] p-5 text-white flex items-center gap-4 shadow-md shadow-orange-200">
        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"></path>
            <line x1="6" y1="17" x2="18" y2="17"></line>
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold">Canteen Admin</h2>
          <p className="text-white/80 text-sm font-medium">{dateStr}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Total Orders */}
        <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-3">
            <ShoppingBag size={20} />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-0.5">{totalOrders}</h3>
          <p className="text-slate-500 text-[13px] font-medium">Total Orders</p>
        </div>

        {/* Today's Revenue */}
        <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-0.5">₹{todaysRevenue}</h3>
          <p className="text-slate-500 text-[13px] font-medium">Today's Revenue</p>
        </div>

        {/* Active Orders */}
        <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center mb-3">
            <Clock size={20} />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-0.5">{activeOrders}</h3>
          <p className="text-slate-500 text-[13px] font-medium">Active Orders</p>
        </div>

        {/* Today's Orders */}
        <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-3">
            <TrendingUp size={20} />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-0.5">{todaysOrders}</h3>
          <p className="text-slate-500 text-[13px] font-medium">Today's Orders</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
