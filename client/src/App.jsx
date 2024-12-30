import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import LoginAuth from "./pages/auth/login"; // Ensure this is a React component
import RegisterAuth from "./pages/auth/register"; // Ensure this is a React component
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProduct from "./pages/admin-view/product";
import AdminOrders from "./pages/admin-view/orders";
import AdminViewFeatures from "./pages/admin-view/features";
import ShoppingLayout from "./components/shopping-view/layout";
import ShoppingView from "./pages/shopping-view/home";
import NotFound from "./pages/not_found";
import ShopListing from "./pages/shopping-view/listing";
import UserAccount from "./pages/shopping-view/account";
import Checkout from "./pages/shopping-view/checkout";
import CheckAuth from "./components/common/check-auth";

function App() {
  const [count, setCount] = useState(0);
  const isAuthenticated = false;
  const user = null;

  return (

      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route
          path="/auth"
          element={
            <CheckAuth>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="register" element={<RegisterAuth />} />
          <Route path="login" element={<LoginAuth />} />
        </Route>
        <Route path="/admin" element={<CheckAuth><AdminLayout /></CheckAuth>}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="product" element={<AdminProduct />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminViewFeatures />} />
        </Route>
        <Route path="/shop" element={<CheckAuth><ShoppingLayout /></CheckAuth>}>
          <Route path="home" element={<ShoppingView />} />
          <Route path="list" element={<ShopListing />} />
          <Route path="account" element={<UserAccount />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
  )
}

export default App;
