import { Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "../../hooks/useCart.js";

const CartItem = ({ item }) => {
  const { updateQty, removeFromCart } = useCart();

  return (
    <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-white">
      <div className="flex-1 min-w-0 mr-3">
        <h3 className="font-bold text-slate-900 text-sm truncate">{item.name}</h3>
        <p className="text-orange-500 font-bold text-sm mt-0.5">
          ₹{(item.price * item.quantity).toFixed(2)}
        </p>
        <p className="text-slate-400 text-[11px]">₹{Number(item.price).toFixed(2)} each</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => updateQty(item.id, item.quantity - 1)}
          className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
        >
          <Minus size={13} />
        </button>
        <span className="font-bold text-sm w-5 text-center text-slate-900">{item.quantity}</span>
        <button
          onClick={() => updateQty(item.id, item.quantity + 1)}
          className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
        >
          <Plus size={13} />
        </button>
        <button
          onClick={() => removeFromCart(item.id)}
          className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center text-red-500 hover:bg-red-100 transition-colors ml-1"
        >
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
