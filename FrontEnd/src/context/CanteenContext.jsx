import { createContext, useState, useContext } from 'react';

const CanteenContext = createContext();

const INITIAL_MENU_ITEMS = [
  { id: 1, name: "Masala Dosa", description: "Crispy dosa with spiced potato filling", price: 45, rating: 4.5, prepTime: 8, category: "Breakfast", badge: "Bestseller", image: "https://images.unsplash.com/photo-1708146464361-5c5ce4f9abb6?w=400&h=300&fit=crop", active: true },
  { id: 2, name: "Idli Sambar", description: "Soft idlis with tangy sambar & chutney", price: 35, rating: 4.3, prepTime: 5, category: "Breakfast", badge: null, image: "https://images.unsplash.com/photo-1668236499396-a62d2d1cb0cf?w=400&h=300&fit=crop", active: true },
  { id: 3, name: "Poha", description: "Light flattened rice with veggies & nuts", price: 25, rating: 4.2, prepTime: 5, category: "Breakfast", badge: null, image: "https://images.unsplash.com/photo-1614247310314-c17f87b47ef9?w=400&h=300&fit=crop", active: true },
  { id: 4, name: "Veg Biryani", description: "Fragrant basmati rice with vegetables", price: 80, rating: 4.6, prepTime: 15, category: "Lunch", badge: "Popular", image: "https://images.unsplash.com/photo-1666190092689-e3968aa0c32c?w=400&h=300&fit=crop", active: true },
  { id: 5, name: "Paneer Butter Masala", description: "Creamy tomato curry with soft paneer", price: 90, rating: 4.7, prepTime: 12, category: "Lunch", badge: "Chef's Pick", image: "https://images.unsplash.com/photo-1708793873401-e8c6c153b76a?w=400&h=300&fit=crop", active: true },
  { id: 6, name: "Vada Pav", description: "Spiced potato fritter in a bun", price: 20, rating: 4.4, prepTime: 5, category: "Snacks", badge: null, image: "https://images.unsplash.com/photo-1750767397012-3413ba4fdbc7?w=400&h=300&fit=crop", active: true },
  { id: 7, name: "Mango Lassi", description: "Chilled creamy yogurt blended with mango", price: 40, rating: 4.5, prepTime: 3, category: "Beverages", badge: "New", image: "https://images.unsplash.com/photo-1619898804188-e7bad4bd2127?w=400&h=300&fit=crop", active: true },
  { id: 8, name: "Masala Chai", description: "Aromatic Indian spiced tea", price: 15, rating: 4.3, prepTime: 3, category: "Beverages", badge: null, image: "https://images.unsplash.com/photo-1648192312898-838f9b322f47?w=400&h=300&fit=crop", active: true },
  { id: 9, name: "Gulab Jamun", description: "Soft milk dumplings in rose sugar syrup", price: 30, rating: 4.6, prepTime: 5, category: "Desserts", badge: "Sweet Pick", image: "https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?w=400&h=300&fit=crop", active: true },
];

const INITIAL_TIME_SLOTS = [
  { id: 1, time: "8:00 AM - 8:30 AM", capacity: 25, booked: 5, active: true },
  { id: 2, time: "8:30 AM - 9:00 AM", capacity: 25, booked: 0, active: true },
  { id: 3, time: "12:00 PM - 12:30 PM", capacity: 40, booked: 0, active: true },
  { id: 4, time: "12:30 PM - 1:00 PM", capacity: 40, booked: 0, active: true },
  { id: 5, time: "1:00 PM - 1:30 PM", capacity: 35, booked: 0, active: true },
  { id: 6, time: "3:30 PM - 4:00 PM", capacity: 20, booked: 0, active: true },
  { id: 7, time: "4:00 PM - 4:30 PM", capacity: 20, booked: 0, active: true },
];

const INITIAL_ORDERS = [
  { id: "#CBWHAOA", customer: "Pranav Subbareddy", items_list: "Masala Dosa x2", total: 90, status: "Completed", timeSlot: "8:00 AM - 8:30 AM", time: "03:48 PM" },
  { id: "#CBC12O3", customer: "Pranav Subbareddy", items_list: "Masala Dosa x5", total: 225, status: "Completed", timeSlot: "8:00 AM - 8:30 AM", time: "03:48 PM" },
  { id: "#CBLWKWD", customer: "Vivekananda Chary", items_list: "Masala Dosa x1", total: 45, status: "Pending", timeSlot: "8:00 AM - 8:30 AM", time: "07:12 PM" },
  { id: "#CBGINAA", customer: "Vivekananda Chary", items_list: "Masala Dosa x2", total: 90, status: "Pending", timeSlot: "8:00 AM - 8:30 AM", time: "01:43 PM" },
  { id: "#CBC7NN3", customer: "Vivekananda Chary", items_list: "Veg Biryani x1", total: 80, status: "Completed", timeSlot: "8:00 AM - 8:30 AM", time: "08:59 AM" },
];

export const CanteenProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState(INITIAL_MENU_ITEMS);
  const [timeSlots, setTimeSlots] = useState(INITIAL_TIME_SLOTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [cart, setCart] = useState([]);

  // Admin Actions
  const toggleMenuItem = (id) => {
    setMenuItems(prev => prev.map(item => item.id === id ? { ...item, active: !item.active } : item));
  };
  
  const addMenuItem = (item) => {
    setMenuItems(prev => [...prev, { ...item, id: Date.now() }]);
  };

  const deleteMenuItem = (id) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  const toggleTimeSlot = (id) => {
    setTimeSlots(prev => prev.map(slot => slot.id === id ? { ...slot, active: !slot.active } : slot));
  };

  const resetTimeSlot = (id) => {
    setTimeSlots(prev => prev.map(slot => slot.id === id ? { ...slot, booked: 0 } : slot));
  };

  const deleteTimeSlot = (id) => {
    setTimeSlots(prev => prev.filter(slot => slot.id !== id));
  };

  const addTimeSlot = (slot) => {
    setTimeSlots(prev => [...prev, { ...slot, id: Date.now(), booked: 0, active: true }]);
  };

  const updateOrderStatus = (id, status) => {
    setOrders(prev => prev.map(order => order.id === id ? { ...order, status } : order));
  };

  // User Actions
  const placeOrder = (newOrder) => {
    setOrders(prev => [newOrder, ...prev]);
    // Also increment booked count on timeslot
    if (newOrder.timeSlotId) {
      setTimeSlots(prev => prev.map(slot => slot.id === newOrder.timeSlotId ? { ...slot, booked: slot.booked + 1 } : slot));
    }
  };

  return (
    <CanteenContext.Provider value={{
      menuItems, setMenuItems, toggleMenuItem, addMenuItem, deleteMenuItem,
      timeSlots, setTimeSlots, toggleTimeSlot, resetTimeSlot, deleteTimeSlot, addTimeSlot,
      orders, setOrders, updateOrderStatus, placeOrder,
      cart, setCart
    }}>
      {children}
    </CanteenContext.Provider>
  );
};

export const useCanteen = () => useContext(CanteenContext);
