import { useState } from "react";
import { useCanteen } from "../../context/CanteenContext";
import { Pencil, Trash2, Plus, X } from "lucide-react";

const CATEGORIES = ["All", "Breakfast", "Lunch", "Snacks", "Beverages", "Desserts"];

const AdminMenu = () => {
  const { menuItems, toggleMenuItem, deleteMenuItem, addMenuItem, editMenuItem } = useCanteen();
  const [activeCategory, setActiveCategory] = useState("All");
  
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    prepTime: "",
    category: "Lunch",
    isVegetarian: true,
    isAvailable: true,
  });

  const filteredItems = menuItems.filter(item => 
    activeCategory === "All" || item.category === activeCategory
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewItem({
      ...newItem,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleEditClick = (item) => {
    setNewItem({
      name: item.name || "",
      description: item.description || "",
      price: item.price || "",
      image: item.image || "",
      prepTime: item.prepTime || "",
      category: item.category || "Lunch",
      isVegetarian: item.isVegetarian === 1 || item.isVegetarian === true,
      isAvailable: item.isAvailable === 1 || item.isAvailable === true,
    });
    setEditingId(item.id);
    setShowModal(true);
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await fetch(`${baseUrl}/api/food/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        deleteMenuItem(id);
      } else {
        alert("Failed to delete item");
      }
    } catch (error) {
      console.log(error);
      alert("Error deleting item");
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return;

    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const url = editingId 
        ? `${baseUrl}/api/food/${editingId}`
        : `${baseUrl}/api/food`;
      
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      const data = await response.json();
      
      if (editingId) {
        editMenuItem(editingId, { ...newItem, price: Number(newItem.price) });
        alert("Food Updated Successfully");
      } else {
        addMenuItem({ ...newItem, id: data.id, price: Number(newItem.price) });
        alert("Food Added Successfully");
      }
      
      setShowModal(false);
      setEditingId(null);
      setNewItem({
        name: "",
        description: "",
        price: "",
        image: "",
        prepTime: "",
        category: "Lunch",
        isVegetarian: true,
        isAvailable: true,
      });
    } catch (error) {
      console.log(error);
      alert(`Error ${editingId ? 'updating' : 'adding'} food item`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full px-4 pt-4 pb-24 lg:pb-8 relative h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black text-slate-900">Menu Management</h2>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-md shadow-orange-200 transition-colors"
        >
          <Plus size={16} />
          Add Item
        </button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? "bg-orange-500 text-white"
                : "bg-white text-slate-500 border border-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu List */}
      <div className="space-y-3">
        {filteredItems.map(item => (
          <div key={item.id} className="bg-white rounded-2xl p-3 flex items-center gap-4 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-slate-900 text-[15px] truncate">{item.name}</h3>
              <p className="text-slate-500 text-[13px]">{item.category} · ₹{item.price}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => toggleMenuItem(item.id)}
                className={`px-3 py-1 rounded-full text-[12px] font-bold border transition-colors ${
                  item.active 
                    ? "text-emerald-600 border-emerald-200 bg-emerald-50" 
                    : "text-slate-500 border-slate-200 bg-slate-50"
                }`}
              >
                {item.active ? "On" : "Off"}
              </button>
              <button 
                onClick={() => handleEditClick(item)}
                className="text-slate-400 hover:text-slate-600"
              >
                <Pencil size={18} />
              </button>
              <button 
                onClick={() => handleDeleteClick(item.id)}
                className="text-slate-400 hover:text-red-500"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Item Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 sticky top-0 bg-white z-10">
              <h2 className="text-lg font-black text-slate-900">
                {editingId ? "Edit Item" : "Add New Item"}
              </h2>
              <button 
                onClick={() => {
                  setShowModal(false);
                  setEditingId(null);
                }}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddItem} className="p-5 space-y-4">
              <div>
                <label className="block text-[13px] font-bold text-slate-500 mb-1.5">Item Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  placeholder="Item Name"
                  value={newItem.name}
                  onChange={handleChange}
                  className="w-full bg-[#F6F5F2] border-none rounded-xl px-4 py-3 text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-slate-500 mb-1.5">Description</label>
                <input 
                  type="text" 
                  name="description"
                  placeholder="Description"
                  value={newItem.description}
                  onChange={handleChange}
                  className="w-full bg-[#F6F5F2] border-none rounded-xl px-4 py-3 text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-slate-500 mb-1.5">Price (₹)</label>
                <input 
                  type="number" 
                  name="price"
                  required
                  placeholder="Price (₹)"
                  value={newItem.price}
                  onChange={handleChange}
                  className="w-full bg-[#F6F5F2] border-none rounded-xl px-4 py-3 text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-slate-500 mb-1.5">Image URL</label>
                <input 
                  type="text" 
                  name="image"
                  placeholder="Image URL"
                  value={newItem.image}
                  onChange={handleChange}
                  className="w-full bg-[#F6F5F2] border-none rounded-xl px-4 py-3 text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-slate-500 mb-1.5">Prep Time (min)</label>
                <input 
                  type="number" 
                  name="prepTime"
                  placeholder="10"
                  value={newItem.prepTime}
                  onChange={handleChange}
                  className="w-full bg-[#F6F5F2] border-none rounded-xl px-4 py-3 text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-slate-500 mb-1.5">Category</label>
                <select 
                  name="category"
                  value={newItem.category}
                  onChange={handleChange}
                  className="w-full bg-[#F6F5F2] border-none rounded-xl px-4 py-3 text-[14px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 appearance-none"
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Beverages">Beverages</option>
                  <option value="Desserts">Desserts</option>
                </select>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="isVegetarian"
                    checked={newItem.isVegetarian}
                    onChange={handleChange}
                    className="w-5 h-5 accent-green-600 cursor-pointer"
                  />
                  <span className="text-[14px] font-medium text-slate-900">Vegetarian</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="isAvailable"
                    checked={newItem.isAvailable}
                    onChange={handleChange}
                    className="w-5 h-5 accent-orange-600 cursor-pointer"
                  />
                  <span className="text-[14px] font-medium text-slate-900">Available</span>
                </label>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl shadow-md shadow-orange-200 transition-colors active:scale-[0.98]"
                >
                  {editingId ? "Update Item" : "Add Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMenu;
