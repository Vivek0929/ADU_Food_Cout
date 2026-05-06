import { useState } from "react";
import { useCanteen } from "../../context/CanteenContext";
import { ChevronDown, ChevronUp, Clock, Check } from "lucide-react";

const STATUSES = ["Pending", "Preparing", "Ready", "Completed", "Cancelled"];

const AdminOrders = () => {
  const { orders, updateOrderStatus } = useCanteen();
  const [expandedOrders, setExpandedOrders] = useState({});
  const [activeTab, setActiveTab] = useState("All");

  const toggleExpand = (id) => {
    setExpandedOrders(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const setStatus = (e, orderId, newStatus) => {
    e.stopPropagation();
    updateOrderStatus(orderId, newStatus);
  };

  const getStatusCounts = () => {
    const counts = { All: orders.length };
    STATUSES.forEach(status => {
      counts[status] = orders.filter(o => o.status === status).length;
    });
    return counts;
  };

  const counts = getStatusCounts();
  const filteredOrders = activeTab === "All" ? orders : orders.filter(o => o.status === activeTab);

  const getStatusBadge = (status) => {
    if (status === "Ready") {
      return (
        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-bold bg-green-100 text-green-700 ml-3">
          <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
          <Check size={12} strokeWidth={3} /> Ready for Pickup
        </span>
      );
    }
    if (status === "Completed") {
      return (
        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-bold bg-slate-100 text-slate-700 ml-3">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
          Completed
        </span>
      );
    }
    if (status === "Cancelled") {
      return (
        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-bold bg-red-50 text-red-600 ml-3">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
          Cancelled
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-bold bg-[#FFF8E6] text-[#D49800] ml-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#F5B400]"></span>
        {status}
      </span>
    );
  };

  return (
    <div className="max-w-2xl mx-auto w-full px-4 pt-4 pb-24 lg:pb-8">
      <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6">Order Management</h2>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        {["All", ...STATUSES].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all flex-shrink-0 border ${
              activeTab === tab
                ? "bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-200"
                : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
            }`}
          >
            {tab} ({counts[tab] || 0})
          </button>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] divide-y divide-slate-100">
        {filteredOrders.length === 0 ? (
          <div className="p-8 text-center text-slate-500 font-medium">No orders found.</div>
        ) : (
          filteredOrders.map(order => {
            const isExpanded = expandedOrders[order.id];

            return (
              <div key={order.id} className="p-4 sm:p-5">
                {/* Header */}
                <div 
                  className="flex items-start justify-between cursor-pointer"
                  onClick={() => toggleExpand(order.id)}
                >
                  <div>
                    <div className="flex items-center mb-1">
                      <h3 className="font-black text-slate-900 text-[16px]">{order.id}</h3>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="text-slate-500 text-[13px] mb-1">
                      {order.customer} · {order.time}
                    </p>
                    <div className="flex items-center gap-1 text-slate-400 text-[12px] font-medium">
                      <Clock size={12} />
                      <span>{order.timeSlot}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-900 font-black text-[16px]">
                    ₹{order.total}
                    {isExpanded ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-5 pt-4 border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="mb-5">
                      <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Items</h4>
                      <div className="space-y-2">
                        {order.items ? (
                          order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center text-[14px]">
                              <span className="text-slate-700 font-medium">{item.name} × {item.quantity}</span>
                              <span className="text-slate-400">₹{item.price * item.quantity}</span>
                            </div>
                          ))
                        ) : (
                          // Mock order fallback
                          <div className="flex justify-between items-center text-[14px]">
                            <span className="text-slate-700 font-medium">{order.items_list}</span>
                            <span className="text-slate-400">₹{order.total}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Update Status</h4>
                      <div className="flex flex-wrap gap-2">
                        {STATUSES.map(status => (
                          <button
                            key={status}
                            onClick={(e) => setStatus(e, order.id, status)}
                            className={`px-4 py-2 rounded-2xl text-[13px] font-bold transition-all border ${
                              order.status === status
                                ? "bg-orange-500 text-white border-orange-500 shadow-sm shadow-orange-200"
                                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
