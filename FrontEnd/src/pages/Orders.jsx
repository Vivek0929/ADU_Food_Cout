import { ClipboardList, CheckCircle2, Clock, RotateCcw } from "lucide-react";
import { useCanteen } from "../context/CanteenContext";

const Orders = () => {
  const { orders } = useCanteen();
  // Active order is the most recent one if it's "fresh" (mocking it for now)
  const activeOrder = orders.length > 0 ? orders[0] : null;
  const pastOrders = orders.length > 1 ? orders.slice(1) : [];

  const OrderStatusTracker = () => (
    <div className="bg-indigo-50/50 rounded-[2.5rem] p-8 border border-indigo-100 mb-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
          <h2 className="text-indigo-900 font-black text-lg">Active Order</h2>
        </div>
        <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">#1043</span>
      </div>

      <div className="flex items-center justify-between relative px-4">
        {/* Progress Line */}
        <div className="absolute top-5 left-12 right-12 h-0.5 bg-slate-200 -z-10" />
        <div className="absolute top-5 left-12 w-1/2 h-0.5 bg-indigo-600 -z-10" />

        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <CheckCircle2 size={20} />
          </div>
          <span className="text-xs font-bold text-indigo-900">Placed</span>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <Clock size={20} />
          </div>
          <span className="text-xs font-bold text-indigo-900">Preparing</span>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-slate-300">
            <CheckCircle2 size={20} />
          </div>
          <span className="text-xs font-bold text-slate-400">Ready</span>
        </div>
      </div>
      
      <p className="text-center text-sm text-indigo-400 mt-8 font-medium italic">
        {activeOrder?.items && activeOrder.items.length > 0 
          ? <>{activeOrder.items[0].name} {activeOrder.items.length > 1 ? `& ${activeOrder.items.length - 1} more` : ""}</>
          : <>{activeOrder?.items_list}</>
        } — ready in ~5 mins
      </p>
    </div>
  );

  return (
    <div className="flex-1 p-8 bg-[#F8F9FF] overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-black text-slate-900 mb-8">Your Orders</h1>

        {activeOrder && <OrderStatusTracker />}

        <h3 className="text-lg font-black text-slate-900 mb-6">Past Orders</h3>
        <div className="space-y-4">
          {(pastOrders.length > 0 ? pastOrders : [
            { id: "#1042", status: "Delivered", items: "Masala Dosa, Masala Chai", time: "Today, 10:30 AM", total: 60 },
            { id: "#1041", status: "Delivered", items: "Veg Biryani, Mango Lassi", time: "Yesterday, 1:15 PM", total: 120 },
          ]).map((order, idx) => (
            <div key={idx} className="bg-white rounded-3xl border border-slate-100 p-6 flex items-center gap-6 hover:shadow-xl hover:shadow-indigo-100/50 transition-all group">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                <ClipboardList size={24} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-bold text-slate-900">{order.id}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-green-500 bg-green-50 px-2 py-0.5 rounded-full">
                    {order.status || "Delivered"}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">{order.items_list}</p>
                <p className="text-[10px] text-slate-400 mt-1 font-bold uppercase tracking-wider">{order.time || "Yesterday"}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-slate-900">₹{order.total}</p>
                <button className="text-indigo-600 text-xs font-bold mt-1 flex items-center gap-1 hover:underline ml-auto">
                   <RotateCcw size={12} /> Reorder
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
