import { CATEGORIES } from "../../constants/index.js";

const CategoryFilter = ({ active, onChange }) => (
  <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
    {CATEGORIES.map((cat) => (
      <button
        key={cat}
        onClick={() => onChange(cat)}
        className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all flex-shrink-0 ${
          active === cat
            ? "bg-orange-500 text-white shadow-md shadow-orange-200"
            : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
        }`}
      >
        {cat}
      </button>
    ))}
  </div>
);

export default CategoryFilter;
