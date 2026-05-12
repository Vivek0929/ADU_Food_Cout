// Badge — small pill label for food items (Bestseller, New, Popular, etc.)
const Badge = ({ label, variant = "orange" }) => {
  if (!label) return null;

  const variants = {
    orange: "bg-orange-100 text-orange-600 border-orange-200",
    green:  "bg-emerald-100 text-emerald-700 border-emerald-200",
    blue:   "bg-blue-100 text-blue-700 border-blue-200",
    purple: "bg-purple-100 text-purple-700 border-purple-200",
    slate:  "bg-slate-100 text-slate-600 border-slate-200",
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${variants[variant] || variants.orange}`}>
      {label}
    </span>
  );
};

export default Badge;
