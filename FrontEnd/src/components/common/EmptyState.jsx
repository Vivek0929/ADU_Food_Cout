const EmptyState = ({ icon: Icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
    {Icon && (
      <div className="w-20 h-20 bg-orange-50 rounded-3xl flex items-center justify-center text-orange-400 mb-5">
        <Icon size={36} />
      </div>
    )}
    <h3 className="text-lg font-black text-slate-800 mb-2">{title}</h3>
    {description && <p className="text-slate-500 text-sm max-w-xs leading-relaxed">{description}</p>}
    {action && (
      <button
        onClick={action.onClick}
        className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold transition-all active:scale-95 shadow-md shadow-orange-200"
      >
        {action.label}
      </button>
    )}
  </div>
);

export default EmptyState;
