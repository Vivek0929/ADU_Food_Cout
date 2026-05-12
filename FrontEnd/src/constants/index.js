// ─── API ──────────────────────────────────────────────────────────────────────
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// ─── Food Categories ──────────────────────────────────────────────────────────
export const CATEGORIES = ["All", "Breakfast", "Lunch", "Snacks", "Beverages", "Desserts"];

// ─── Order Status ─────────────────────────────────────────────────────────────
export const ORDER_STATUSES = ["Pending", "Preparing", "Ready", "Completed", "Cancelled"];

export const STATUS_COLORS = {
  Pending:   { bg: "bg-yellow-100",  text: "text-yellow-700",  dot: "bg-yellow-500"  },
  Preparing: { bg: "bg-orange-100",  text: "text-orange-600",  dot: "bg-orange-500"  },
  Ready:     { bg: "bg-green-100",   text: "text-green-700",   dot: "bg-green-500"   },
  Completed: { bg: "bg-slate-100",   text: "text-slate-500",   dot: "bg-slate-400"   },
  Cancelled: { bg: "bg-red-50",      text: "text-red-600",     dot: "bg-red-500"     },
};

// ─── Local Storage Keys ───────────────────────────────────────────────────────
export const TOKEN_KEY  = "canteen_token";
export const USER_KEY   = "canteen_user";

// ─── Default Pagination ───────────────────────────────────────────────────────
export const PAGE_SIZE = 10;

// ─── Routes ───────────────────────────────────────────────────────────────────
export const ROUTES = {
  HOME:     "/",
  MENU:     "/menu",
  CART:     "/cart",
  ORDERS:   "/orders",
  PROFILE:  "/profile",
  LOGIN:    "/login",
  REGISTER: "/register",
  ADMIN:    "/admin",
};
