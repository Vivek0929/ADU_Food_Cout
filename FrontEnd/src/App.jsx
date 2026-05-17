import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CanteenProvider } from "./context/CanteenContext";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import Home from "./pages/user/Home";
import LandingPage from "./components/LandingPage";
import UserDashboard from "./pages/user/UserDashboard";
import Cart from "./pages/user/Cart";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Login from "./pages/Login";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminMenu from "./pages/admin/AdminMenu";
import AdminSlots from "./pages/admin/AdminSlots";

function App() {
  return (
    <CanteenProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes accessible before login */}
          <Route path="/" element={<LandingPage showHero={true} />} />
          <Route path="/login" element={<Login />} />

          {/* Authenticated user routes layout */}
          <Route
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<UserDashboard showHero={true} />} />
            <Route path="/menu" element={<UserDashboard showHero={false} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Authenticated admin routes layout */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="menu" element={<AdminMenu />} />
            <Route path="slots" element={<AdminSlots />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CanteenProvider>
  );
}

export default App;