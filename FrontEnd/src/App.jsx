import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CanteenProvider } from "./context/CanteenContext";
import Home from "./pages/Home";
import LandingPage from "./components/LandingPage";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";

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
          <Route path="/" element={<Home />}>
            <Route index element={<LandingPage showHero={true} />} />
            <Route path="menu" element={<LandingPage showHero={false} />} />
            <Route path="cart" element={<Cart />} />
            <Route path="orders" element={<Orders />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="menu" element={<AdminMenu />} />
            <Route path="slots" element={<AdminSlots />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CanteenProvider>
  );
}

export default App;