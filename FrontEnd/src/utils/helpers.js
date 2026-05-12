// ─── Order ID Generator ───────────────────────────────────────────────────────
export const generateOrderId = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const rand = (n) =>
    Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `#CB${rand(5)}`;
};

// ─── Currency ─────────────────────────────────────────────────────────────────
export const formatCurrency = (amount) =>
  `₹${Number(amount).toFixed(2)}`;

// ─── Date & Time ─────────────────────────────────────────────────────────────
export const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export const formatTime = (date) =>
  new Date(date).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

export const formatDateTime = (date) => `${formatDate(date)}, ${formatTime(date)}`;

// ─── Text ─────────────────────────────────────────────────────────────────────
export const truncate = (str, max = 50) =>
  str && str.length > max ? `${str.slice(0, max)}…` : str;

export const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

// ─── Cart ─────────────────────────────────────────────────────────────────────
export const calcCartTotal = (cart) =>
  cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const calcCartCount = (cart) =>
  cart.reduce((sum, item) => sum + item.quantity, 0);

// ─── Misc ─────────────────────────────────────────────────────────────────────
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
