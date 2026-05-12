import { useCart } from "../../hooks/useCart.js";

const CartSummary = ({ onPlaceOrder, selectedSlot }) => {
  const { cart, total } = useCart();

  if (cart.length === 0) return null;

  return (
    <div className="border border-slate-200 rounded-2xl p-4 bg-white">
      <h3 className="font-bold text-slate-900 text-sm mb-4">Bill Summary</h3>
      <div className="space-y-2 mb-4">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between text-[13px] text-slate-500">
            <span>{item.name} × {item.quantity}</span>
            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-100 pt-3 flex justify-between items-center mb-4">
        <span className="font-bold text-slate-900 text-sm">Total</span>
        <span className="font-black text-orange-500 text-base">₹{total.toFixed(2)}</span>
      </div>
      <button
        onClick={onPlaceOrder}
        disabled={!selectedSlot}
        className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all ${
          selectedSlot
            ? "bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-200 active:scale-[0.98]"
            : "bg-orange-200/60 text-white/70 cursor-not-allowed"
        }`}
      >
        {selectedSlot ? `Place Order · ₹${total.toFixed(2)}` : "Select a time slot to order"}
      </button>
    </div>
  );
};

export default CartSummary;
