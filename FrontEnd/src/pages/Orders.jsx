import { useState } from "react";
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  ChefHat,
  Package,
  RotateCcw,
  X,
  ChevronRight,
  QrCode,
} from "lucide-react";
import { useCanteen } from "../context/CanteenContext";

// ─── Unique Order ID generator ────────────────────────────────────────────────
export const generateOrderId = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const rand = (n) => Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `#CB${rand(5)}`;
};

// ─── Status config ─────────────────────────────────────────────────────────────
const STATUS_STEPS = [
  { key: "Pending", label: "Order\nPlaced", icon: Package, desc: "Order received" },
  { key: "Preparing", label: "Preparing", icon: ChefHat, desc: "Being cooked" },
  { key: "Ready", label: "Ready for\nPickup", icon: CheckCircle2, desc: "Come & collect!" },
  { key: "Completed", label: "Complete", icon: CheckCircle2, desc: "Enjoy your meal!" },
];

const STATUS_INDEX = { Pending: 0, Preparing: 1, Ready: 2, Completed: 3, Delivered: 3 };

// Status badge style
const statusBadge = (status) => {
  const map = {
    Pending: "bg-yellow-100 text-yellow-700",
    Preparing: "bg-orange-100 text-orange-600",
    Ready: "bg-green-100  text-green-600",
    Completed: "bg-slate-100  text-slate-500",
    Delivered: "bg-slate-100  text-slate-500",
  };
  return map[status] ?? "bg-slate-100 text-slate-500";
};

// ─── Dynamic status tracker ────────────────────────────────────────────────────
const OrderStatusTracker = ({ status }) => {
  const currentIdx = STATUS_INDEX[status] ?? 0;
  // Progress line widths per step
  const progressWidths = ["0%", "33%", "66%", "100%"];

  return (
    <div className="relative">
      {/* Track line */}
      <div className="absolute top-5 left-6 right-6 h-0.5 bg-slate-200 z-0" />
      {/* Active progress line */}
      <div
        className="absolute top-5 left-6 h-0.5 bg-orange-500 z-0 transition-all duration-700"
        style={{ width: `calc(${progressWidths[currentIdx]} - 3rem + ${currentIdx === 0 ? "0px" : currentIdx === 3 ? "0px" : "0px"})` }}
      />

      <div className="relative flex justify-between z-10">
        {STATUS_STEPS.map((step, i) => {
          const Icon = step.icon;
          const done = i < currentIdx;
          const active = i === currentIdx;

          return (
            <div key={step.key} className="flex flex-col items-center gap-1.5 w-1/4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 shadow
                  ${done ? "bg-orange-500 text-white shadow-orange-200" : ""}
                  ${active ? "bg-orange-500 text-white ring-4 ring-orange-100 shadow-orange-300" : ""}
                  ${!done && !active ? "bg-white border-2 border-slate-200 text-slate-300" : ""}
                `}
              >
                <Icon size={18} />
              </div>
              <span
                className={`text-[10px] font-bold text-center leading-tight whitespace-pre-line
                  ${done || active ? "text-orange-500" : "text-slate-400"}
                `}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── QR Code block (shown when Ready or Completed) ────────────────────────────
const QRBlock = ({ orderId }) => {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(orderId)}&color=16a34a&bgcolor=f0fdf4`;
  return (
    <div className="bg-green-50 border border-green-100 rounded-2xl p-5 flex flex-col items-center gap-3">
      <div className="bg-green-100 rounded-xl p-3">
        <img
          src={qrUrl}
          alt="Order QR Code"
          className="w-24 h-24"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        {/* Fallback QR icon */}
        <div className="hidden w-24 h-24 items-center justify-center">
          <QrCode size={64} className="text-green-600" />
        </div>
      </div>
      <p className="text-green-700 font-black text-base">Your order is ready!</p>
      <p className="text-green-600 text-xs text-center">Show this to the canteen staff</p>
      <div className="bg-white border border-green-200 rounded-xl px-6 py-2.5 w-full text-center">
        <span className="font-black text-slate-800 tracking-widest text-sm">{orderId}</span>
      </div>
    </div>
  );
};

// ─── Order Detail Modal ────────────────────────────────────────────────────────
const OrderModal = ({ order, onClose }) => {
  if (!order) return null;

  const isReady = order.status === "Ready" || order.status === "Completed" || order.status === "Delivered";
  const orderDate = order.createdAt
    ? new Date(order.createdAt).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
    : order.time || "";

  // Parse items list
  const itemLines = order.items && order.items.length > 0
    ? order.items.map((item) => ({ name: item.name, qty: item.quantity, price: item.price * item.quantity }))
    : (order.items_list || "").split(", ").map((s) => ({ name: s, qty: null, price: null }));

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-slide-up max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500">
              <ClipboardList size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Order</p>
              <h2 className="text-xl font-black text-slate-900">{order.id}</h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${statusBadge(order.status)}`}>
              {order.status === "Ready" ? "✓ Ready for Pickup" : order.status}
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors ml-1"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-5 py-4 space-y-4">

          {/* Date & Pickup slot */}
          <div>
            <p className="text-xs text-slate-500 font-medium">{orderDate}</p>
            {order.timeSlot && (
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                <Clock size={12} className="text-orange-400" />
                Pickup: {order.timeSlot}
              </p>
            )}
          </div>

          {/* Order Progress */}
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">
              Order Progress
            </p>
            <OrderStatusTracker status={order.status || "Pending"} />
          </div>

          {/* QR Code — only when Ready or Completed */}
          {isReady && <QRBlock orderId={order.id} />}

          {/* Items Ordered */}
          <div className="border border-slate-100 rounded-2xl p-4">
            <p className="font-black text-slate-800 text-sm mb-3">Items Ordered</p>
            <div className="space-y-2">
              {itemLines.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-slate-700 font-medium">
                    {item.name}{item.qty ? ` × ${item.qty}` : ""}
                  </span>
                  {item.price !== null && (
                    <span className="text-slate-600 font-semibold">₹{item.price.toFixed(2)}</span>
                  )}
                </div>
              ))}
            </div>
            <div className="border-t border-slate-100 mt-3 pt-3 flex justify-between items-center">
              <span className="font-black text-slate-900 text-sm">Total</span>
              <span className="font-black text-orange-500 text-sm">₹{order.total}</span>
            </div>
          </div>
        </div>

        {/* Reorder btn */}
        <div className="px-5 pb-5 pt-2 shrink-0">
          <button className="w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-orange-200 transition-all flex items-center justify-center gap-2">
            <RotateCcw size={16} />
            Reorder
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Order Card ────────────────────────────────────────────────────────────────
const OrderCard = ({ order, onClick }) => (
  <div
    className="bg-white rounded-3xl border border-slate-100 p-5 flex items-center gap-4 hover:shadow-xl hover:shadow-orange-100/60 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
    onClick={onClick}
  >
    <div className="w-13 h-13 w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 shadow-inner shrink-0">
      <ClipboardList size={22} />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-1">
        <span className="font-black text-slate-900 text-sm">{order.id}</span>
        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${statusBadge(order.status)}`}>
          {order.status}
        </span>
      </div>
      <p className="text-xs text-slate-500 font-medium truncate">
        {order.items_list || order.items?.map((i) => `${i.name} ×${i.quantity}`).join(", ")}
      </p>
      <p className="text-[10px] text-slate-400 mt-0.5 font-bold uppercase tracking-wider">
        {order.time || order.timeSlot || ""}
      </p>
    </div>
    <div className="text-right shrink-0">
      <p className="text-lg font-black text-slate-900">₹{order.total}</p>
      <ChevronRight size={16} className="text-slate-300 group-hover:text-orange-400 transition-colors ml-auto mt-1" />
    </div>
  </div>
);

// ─── Main Orders Page ──────────────────────────────────────────────────────────
const Orders = () => {
  const { orders } = useCanteen();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const activeOrders = orders.filter((o) => o.status !== "Completed" && o.status !== "Delivered");
  const pastOrders = orders.filter((o) => o.status === "Completed" || o.status === "Delivered");

  const demoOrders = [
    { id: "#CBWHAOA", status: "Completed", items_list: "Masala Dosa x2", time: "Today, 10:30 AM", total: 90 },
    { id: "#CBC12O3", status: "Completed", items_list: "Veg Biryani, Lassi", time: "Yesterday, 1:15 PM", total: 120 },
  ];

  const displayPast = pastOrders.length > 0 ? pastOrders : demoOrders;

  return (
    <div className="flex-1 p-6 bg-[#F8F9FF] overflow-y-auto">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-black text-slate-900 mb-6">Your Orders</h1>

        {/* Active orders */}
        {activeOrders.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
              <h2 className="text-xs font-black text-slate-800 uppercase tracking-widest">Active</h2>
            </div>
            <div className="space-y-3">
              {activeOrders.map((order, idx) => (
                <OrderCard key={order.id ?? idx} order={order} onClick={() => setSelectedOrder(order)} />
              ))}
            </div>
          </section>
        )}

        {/* Past orders */}
        <section>
          <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Past Orders</h2>
          <div className="space-y-3">
            {displayPast.map((order, idx) => (
              <OrderCard key={order.id ?? idx} order={order} onClick={() => setSelectedOrder(order)} />
            ))}
          </div>
        </section>

        {/* Empty state */}
        {orders.length === 0 && activeOrders.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-orange-50 rounded-3xl flex items-center justify-center text-orange-400 mx-auto mb-4">
              <ClipboardList size={36} />
            </div>
            <p className="text-slate-600 font-bold">No orders yet</p>
            <p className="text-slate-400 text-sm">Your orders will appear here once you place one.</p>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      <OrderModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
    </div>
  );
};

export default Orders;
