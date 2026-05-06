import { ShoppingCart, ArrowLeft, Trash2, ChevronRight } from "lucide-react";

const Cart = ({ cart, onCartUpdate, onNavigateToMenu, onPlaceOrder }) => {
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;

  if (cart.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#F8F9FF]">
        <div className="w-24 h-24 bg-white rounded-[2rem] shadow-sm flex items-center justify-center mb-6">
          <ShoppingCart className="text-slate-300" size={40} />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Cart is empty</h2>
        <p className="text-slate-500 mb-8">Add items from the menu to get started</p>
        <button
          onClick={onNavigateToMenu}
          className="bg-orange-500 text-white px-8 py-3 rounded-2xl font-bold hover:bg-orange-600 shadow-xl shadow-indigo-100 transition-all active:scale-95"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 bg-[#F8F9FF] overflow-y-auto">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-black text-slate-900">Your Cart</h1>
          <button
            onClick={() => onCartUpdate([])}
            className="text-slate-400 hover:text-red-500 transition-colors flex items-center gap-2 text-sm font-bold"
          >
            <Trash2 size={16} /> Clear All
          </button>
        </div>

        <div className="space-y-4 mb-8">
          {cart.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-3xl border border-slate-100 flex items-center gap-4 shadow-sm">
              <img src={item.image} alt={item.name} className="w-20 h-20 rounded-2xl object-cover" />
              <div className="flex-1">
                <h3 className="font-bold text-slate-900">{item.name}</h3>
                <p className="text-xs text-slate-400 font-medium">₹{item.price} × {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-black text-indigo-600">₹{item.price * item.quantity}</p>
                <div className="flex items-center gap-2 mt-2 bg-slate-50 rounded-lg p-1">
                  <button
                    onClick={() => {
                      const newCart = cart.map(c => c.id === item.id ? { ...c, quantity: Math.max(0, c.quantity - 1) } : c).filter(c => c.quantity > 0);
                      onCartUpdate(newCart);
                    }}
                    className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-indigo-600"
                  >
                    -
                  </button>
                  <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                  <button
                    onClick={() => {
                      const newCart = cart.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
                      onCartUpdate(newCart);
                    }}
                    className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-indigo-600"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium">Subtotal</span>
              <span className="text-slate-900 font-bold">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium">GST (5%)</span>
              <span className="text-slate-900 font-bold">₹{gst}</span>
            </div>
            <div className="pt-3 border-t border-slate-50 flex justify-between items-center">
              <span className="text-lg font-black text-slate-900">Total</span>
              <span className="text-2xl font-black text-indigo-600">₹{total}</span>
            </div>
          </div>

          <button
            onClick={onPlaceOrder}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            Place Order
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
