import { useState } from "react";
import { useCanteen } from "../../context/CanteenContext";
import { Plus, Clock, Trash2, X } from "lucide-react";

const AdminSlots = () => {
  const { timeSlots, toggleTimeSlot, deleteTimeSlot, resetTimeSlot, addTimeSlot } = useCanteen();
  
  const [showModal, setShowModal] = useState(false);
  const [newSlot, setNewSlot] = useState({
    label: "",
    startTime: "",
    endTime: "",
    maxOrders: 20
  });

  const handleAddSlot = (e) => {
    e.preventDefault();
    if (!newSlot.maxOrders) return;
    
    // If user provided a display label, use it.
    // Otherwise construct one from start/end times if available.
    let displayTime = newSlot.label;
    if (!displayTime && newSlot.startTime && newSlot.endTime) {
      displayTime = `${newSlot.startTime} - ${newSlot.endTime}`;
    }
    if (!displayTime) {
      displayTime = "Custom Slot"; // Fallback
    }

    addTimeSlot({
      time: displayTime,
      capacity: Number(newSlot.maxOrders)
    });

    setShowModal(false);
    setNewSlot({ label: "", startTime: "", endTime: "", maxOrders: 20 });
  };

  return (
    <div className="max-w-2xl mx-auto w-full px-4 pt-4 pb-24 lg:pb-8 relative h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black text-slate-900">Time Slots</h2>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-md shadow-orange-200 transition-colors"
        >
          <Plus size={16} />
          New Slot
        </button>
      </div>

      <div className="space-y-4">
        {timeSlots.map(slot => {
          const isFull = slot.booked >= slot.capacity;
          const percentage = Math.min((slot.booked / slot.capacity) * 100, 100);

          return (
            <div key={slot.id} className="bg-white rounded-[20px] p-5 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-[15px] mb-1">
                    <Clock size={16} className="text-orange-500" />
                    {slot.time}
                  </div>
                  <p className="text-slate-500 text-[13px]">{slot.booked}/{slot.capacity} orders booked</p>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <button 
                    onClick={() => toggleTimeSlot(slot.id)}
                    className={`px-3 py-1 rounded-full text-[12px] font-bold border transition-colors ${
                      slot.active 
                        ? "text-emerald-600 border-emerald-200 bg-emerald-50" 
                        : "text-slate-500 border-slate-200 bg-slate-50"
                    }`}
                  >
                    {slot.active ? "Active" : "Inactive"}
                  </button>
                  <button 
                    onClick={() => deleteTimeSlot(slot.id)}
                    className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500 hover:bg-red-100 transition-colors shrink-0"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-3">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${isFull ? 'bg-red-500' : 'bg-orange-500'}`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-slate-500">
                  {Math.max(0, slot.capacity - slot.booked)} spots left
                </span>
                <button 
                  onClick={() => resetTimeSlot(slot.id)}
                  className="text-orange-500 text-[13px] font-bold hover:text-orange-600 transition-colors"
                >
                  Reset Count
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add New Slot Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-black text-slate-900">New Time Slot</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddSlot} className="p-6 space-y-5">
              <div>
                <label className="block text-[13px] font-bold text-slate-500 mb-2">Display Label</label>
                <input 
                  type="text" 
                  placeholder="e.g. 12:00 PM - 12:30 PM"
                  value={newSlot.label}
                  onChange={e => setNewSlot({...newSlot, label: e.target.value})}
                  className="w-full bg-[#F6F5F2] border-none rounded-xl px-4 py-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-slate-500 mb-2">Start Time</label>
                  <div className="relative">
                    <input 
                      type="time" 
                      value={newSlot.startTime}
                      onChange={e => setNewSlot({...newSlot, startTime: e.target.value})}
                      className="w-full bg-[#F6F5F2] border-none rounded-xl px-4 py-3.5 text-[15px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 font-medium appearance-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-slate-500 mb-2">End Time</label>
                  <div className="relative">
                    <input 
                      type="time" 
                      value={newSlot.endTime}
                      onChange={e => setNewSlot({...newSlot, endTime: e.target.value})}
                      className="w-full bg-[#F6F5F2] border-none rounded-xl px-4 py-3.5 text-[15px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 font-medium appearance-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-slate-500 mb-2">Max Orders</label>
                <input 
                  type="number" 
                  required
                  placeholder="20"
                  value={newSlot.maxOrders}
                  onChange={e => setNewSlot({...newSlot, maxOrders: e.target.value})}
                  className="w-full bg-[#F6F5F2] border-none rounded-xl px-4 py-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 font-medium"
                />
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-md shadow-orange-200 transition-colors active:scale-[0.98] text-[15px]"
                >
                  Save Time Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSlots;
