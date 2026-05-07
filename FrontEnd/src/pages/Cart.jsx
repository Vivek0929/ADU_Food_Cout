import { ShoppingCart, ArrowLeft, Trash2, Plus, Minus, Clock } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCanteen } from "../context/CanteenContext";

const Cart = () => {
  const navigate = useNavigate();
  const { timeSlots, cart, setCart, orders, placeOrder } = useCanteen();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [specialInstructions, setSpecialInstructions] = useState("");

  const totalItemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal;
  const activeTimeSlots = timeSlots.filter(slot => slot.active);

  const handlePlaceOrder = () => {
    if (cart.length === 0 || !selectedTimeSlot) return;
    
    const slotDetails = timeSlots.find(s => s.id === selectedTimeSlot);
    const slotString = slotDetails ? slotDetails.time : "ASAP";

    const newOrder = {
      id: `#${1043 + orders.length}`,
      customer: "Current User", // Mocked for now
      items: [...cart],
      items_list: cart.map(item => `${item.name} x${item.quantity}`).join(", "),
      total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
        + Math.round(cart.reduce((acc, item) => acc + item.price * item.quantity, 0) * 0.05),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "Pending",
      timeSlotId: selectedTimeSlot,
      timeSlot: slotString,
      instructions: specialInstructions
    };
    placeOrder(newOrder);
    setCart([]);
    navigate("/orders");
  };

  if (cart.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white h-full">
        <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-6">
          <ShoppingCart className="text-slate-300" size={40} />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Cart is empty</h2>
        <p className="text-slate-500 mb-8">Add items from the menu to get started</p>
        <button
          onClick={() => navigate("/menu")}
          className="bg-orange-600 text-white px-8 py-3 rounded-2xl font-bold transition-all active:scale-95"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-100 sticky top-0 bg-white z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/menu")} className="p-1 -ml-1">
            <ArrowLeft size={20} className="text-slate-800" />
          </button>
          <h1 className="text-lg font-bold text-slate-900">Cart</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCart([])}
            className="text-[12px] font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded-lg active:scale-95 transition-all"
          >
            Clear Cart
          </button>
          <div className="relative flex items-center">
            <ShoppingCart size={22} className="text-slate-800" />
            {totalItemsInCart > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {totalItemsInCart}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full pb-8 ">
        {/* Cart Items */}
        <div className="flex flex-col">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border rounded-xl border-slate-900 mx-4 ">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{item.name}</h3>
                <p className="text-orange-500 font-bold text-sm mt-0.5">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    const newCart = cart.map(c => c.id === item.id ? { ...c, quantity: Math.max(0, c.quantity - 1) } : c).filter(c => c.quantity > 0);
                    setCart(newCart);
                  }}
                  className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-700"
                >
                  <Minus size={14} />
                </button>
                <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                <button
                  onClick={() => {
                    const newCart = cart.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
                    setCart(newCart);
                  }}
                  className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-white"
                >
                  <Plus size={14} />
                </button>
                <button
                  onClick={() => {
                    const newCart = cart.filter(c => c.id !== item.id);
                    setCart(newCart);
                  }}
                  className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center text-red-500 ml-1"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Time Slot Selection */}
        <div className="p-4 border border-slate-100 rounded-2xl mx-4 mt-6 mb-4 border-slate-900">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={16} className="text-orange-500" />
            <h3 className="font-bold text-slate-900 text-sm">Select Pickup Time Slot</h3>
          </div>
          <div className="grid grid-cols-2 gap-3 ">
            {activeTimeSlots.map((slot) => {
              const spotsLeft = Math.max(0, slot.capacity - slot.booked);
              return (
                <button
                  key={slot.id}
                  onClick={() => setSelectedTimeSlot(slot.id)}
                  disabled={spotsLeft === 0}
                  className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${selectedTimeSlot === slot.id
                      ? "border-orange-600 bg-orange-50/20"
                      : spotsLeft === 0
                        ? "border-slate-200 bg-slate-50 opacity-50 cursor-not-allowed"
                        : "border-slate-900"
                    }`}
                >
                  <span className={`text-[13px] font-bold ${spotsLeft === 0 ? "text-slate-400" : "text-slate-900"}`}>{slot.time}</span>
                  <span className={`text-[11px] ${spotsLeft === 0 ? "text-red-500 font-bold" : "text-slate-900"}`}>
                    {spotsLeft === 0 ? "Fully Booked" : `${spotsLeft} spots left`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Special Instructions */}
        <div className="p-4 border border-slate-900 rounded-2xl mx-4 mb-4 ">
          <h3 className="font-bold text-slate-900 text-[13px] mb-3">Special Instructions</h3>
          <textarea
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            placeholder="Any allergies or special requests..."
            className="w-full p-4 bg-[#F2F0EB] rounded-xl border-none focus:outline-none text-[13px] placeholder:text-slate-500 resize-none h-[88px]"
          ></textarea>
        </div>

        {/* Bill Summary */}
        <div className="p-4 border border-slate-900 rounded-2xl mx-4 mb-6 ">
          <h3 className="font-bold text-slate-900 text-[13px] mb-4">Bill Summary</h3>
          <div className="space-y-3 mb-4">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between text-[13px] text-slate-500">
                <span>{item.name} × {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
            <span className="font-bold text-slate-900 text-[13px]">Total</span>
            <span className="font-bold text-orange-500 text-[13px]">₹{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Place Order Button */}
        <div className="px-4">
          <button
            onClick={handlePlaceOrder}
            disabled={!selectedTimeSlot}
            className={`w-full py-3.5 rounded-2xl font-bold text-[14px] flex justify-center items-center transition-all ${selectedTimeSlot
              ? "bg-orange-400 border-2 border-orange-500 text-white hover:bg-orange-500 active:scale-[0.98] cursor-pointer shadow-sm"
              : "bg-orange-200/60 text-white/70 cursor-not-allowed border-2 border-transparent"
              }`}
          >
            {selectedTimeSlot ? `Place Order · ₹${total.toFixed(2)}` : "Select a time slot to order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
