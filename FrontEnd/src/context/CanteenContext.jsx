import { createContext, useState, useContext, useEffect } from 'react';
import { apiService } from '../services/api';

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

const INITIAL_ORDERS = [];

export const CanteenProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState(INITIAL_MENU_ITEMS);
  const [timeSlots, setTimeSlots] = useState(INITIAL_TIME_SLOTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state from backend (httpOnly cookie)
  useEffect(() => {
    let mounted = true;
    apiService.auth.getCurrentUser()
      .then(data => {
        if (!mounted) return;
        if (data && data.user) {
          setUser(data.user);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      })
      .catch(err => {
        console.error('Auth init failed', err);
        if (mounted) {
          setUser(null);
          setIsAuthenticated(false);
        }
      });
    return () => { mounted = false; };
  }, []);

  // Fetch foods from backend
  useEffect(() => {
    apiService.food.getAllFoods()
      .then(data => {
        if (Array.isArray(data)) {
          const formattedData = data
            .filter(item => item.name) // Filter out invalid items
            .map(item => ({
              ...item,
              price: Number(item.price) || 0, // Ensure price is a number for .toFixed()
              active: item.isAvailable === 1 || item.isAvailable === true,
              rating: item.rating || 4.5, // Default rating if missing
            }));

          if (formattedData.length > 0) {
            setMenuItems(formattedData);
          }
        }
      })
      .catch(err => console.error("Failed to fetch menu items:", err));
  }, []);

  // Admin Actions
  const toggleMenuItem = (id) => {
    setMenuItems(prev => prev.map(item => item.id === id ? { ...item, active: !item.active } : item));
  };

  const addMenuItem = (item) => {
    setMenuItems(prev => [...prev, { ...item, id: Date.now() }]);
  };

  const editMenuItem = (id, updatedItem) => {
    setMenuItems(prev => prev.map(item => item.id === id ? { ...item, ...updatedItem } : item));
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

  // Authentication Functions
  const login = async (email, password) => {
    try {
      const data = await apiService.auth.login(email, password);
      setUser(data.user);
      setIsAuthenticated(true);
      return data.user;
    } catch (err) {
      console.error('login error', err);
      throw err;
    }
  };

  const signup = async (email, password, name) => {
    try {
      const data = await apiService.auth.signup(email, password, name);
      setUser(data.user);
      setIsAuthenticated(true);
      return data.user;
    } catch (err) {
      console.error('signup error', err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await apiService.auth.logout();
    } catch (e) {
      console.warn('logout request failed', e);
    }
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <CanteenContext.Provider value={{
      menuItems, setMenuItems, toggleMenuItem, addMenuItem, deleteMenuItem, editMenuItem,
      timeSlots, setTimeSlots, toggleTimeSlot, resetTimeSlot, deleteTimeSlot, addTimeSlot,
      orders, setOrders, updateOrderStatus, placeOrder,
      cart, setCart,
      user, isAuthenticated, login, signup, logout
    }}>
      {children}
    </CanteenContext.Provider>
  );
};

export const useCanteen = () => useContext(CanteenContext);
