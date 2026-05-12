import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

// Layouts
import Home from "../pages/Home.jsx";
import AdminLayout from "../pages/admin/AdminLayout.jsx";

// User pages
import LandingPage from "../components/LandingPage.jsx";
import Cart from "../pages/Cart.jsx";
import Orders from "../pages/Orders.jsx";
import Profile from "../pages/Profile.jsx";

// Admin pages
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import AdminOrders from "../pages/admin/AdminOrders.jsx";
import AdminMenu from "../pages/admin/AdminMenu.jsx";
import AdminSlots from "../pages/admin/AdminSlots.jsx";

// Auth pages
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) return null; // Or a loading spinner

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppRoutes = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <Routes>
      {/* ── Auth ────────────────────────────────────────── */}
      <Route 
        path="/login" 
        element={!isAuthenticated ? <Login /> : <Navigate to={isAdmin ? "/admin" : "/"} replace />} 
      />
      <Route 
        path="/register" 
        element={!isAuthenticated ? <Register /> : <Navigate to="/" replace />} 
      />

      {/* ── User layout (Protected) ─────────────────────── */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            {/* If Admin accidentally lands on user root, send them to admin panel */}
            {isAdmin ? <Navigate to="/admin" replace /> : <Home />}
          </ProtectedRoute>
        }
      >
        <Route index element={<LandingPage showHero={true} />} />
        <Route path="menu" element={<LandingPage showHero={false} />} />
        <Route path="cart" element={<Cart />} />
        <Route path="orders" element={<Orders />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* ── Admin layout (Admin Only) ────────────────────── */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly={true}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="menu" element={<AdminMenu />} />
        <Route path="slots" element={<AdminSlots />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to={isAdmin ? "/admin" : "/"} replace />} />
    </Routes>
  );
};

export default AppRoutes;
