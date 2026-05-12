import { Plus, Minus, Star, Clock } from "lucide-react";
import Badge from "../ui/Badge.jsx";
import { useCart } from "../../hooks/useCart.js";

const MenuCard = ({ item }) => {
  const { addToCart, removeFromCart, updateQty, isInCart, getQty } = useCart();
  const qty = getQty(item.id);
  const inCart = isInCart(item.id);

  const getBadgeVariant = (badge) => {
    if (!badge) return "orange";
    const map = { "Bestseller": "orange", "Popular": "blue", "New": "green", "Chef's Pick": "purple", "Sweet Pick": "purple" };
    return map[badge] || "orange";
  };

  return (
    <div className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden group ${inCart ? "border-orange-300 shadow-md shadow-orange-100" : "border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5"}`}>
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop"}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop"; }}
        />
        {item.badge && (
          <div className="absolute top-2 left-2">
            <Badge label={item.badge} variant={getBadgeVariant(item.badge)} />
          </div>
        )}
        {!item.active && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-black text-sm bg-black/60 px-3 py-1 rounded-full">Unavailable</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-slate-900 text-sm leading-tight flex-1">{item.name}</h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star size={10} className="text-amber-400 fill-amber-400" />
            <span className="text-[11px] font-bold text-slate-600">{item.rating || 4.5}</span>
          </div>
        </div>

        <p className="text-slate-400 text-[11px] leading-relaxed mb-2 line-clamp-2">{item.description}</p>

        <div className="flex items-center gap-1 text-slate-400 text-[11px] mb-3">
          <Clock size={10} />
          <span>{item.prepTime || 10} min</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="font-black text-orange-500 text-base">₹{Number(item.price).toFixed(0)}</span>

          {!item.active ? (
            <span className="text-[11px] text-slate-400 font-medium">Unavailable</span>
          ) : qty === 0 ? (
            <button
              onClick={() => addToCart(item)}
              className="w-8 h-8 bg-orange-500 hover:bg-orange-600 text-white rounded-xl flex items-center justify-center shadow-md shadow-orange-200 transition-all active:scale-95"
            >
              <Plus size={16} />
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-orange-50 rounded-xl px-2 py-1">
              <button onClick={() => updateQty(item.id, qty - 1)} className="w-5 h-5 flex items-center justify-center text-orange-500">
                <Minus size={12} />
              </button>
              <span className="font-black text-orange-600 text-sm w-4 text-center">{qty}</span>
              <button onClick={() => updateQty(item.id, qty + 1)} className="w-5 h-5 flex items-center justify-center text-orange-500">
                <Plus size={12} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
