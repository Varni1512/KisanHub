import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import User from "./pages/User";
import MedicineLayout from "./pages/MedicineLayout";
import ShopDashboard from "./components/Shopkeeper/ShopDashboard";
import ShopProducts from "./components/Shopkeeper/ShopProducts";
import ShopOrders from "./components/Shopkeeper/ShopOrders";
import ShopProfile from "./components/Shopkeeper/ShopProfile";
import Farmer from "./pages/Farmerpage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/user" element={<User />} />
        <Route path="/farmer" element={<Farmer />} />
        <Route path="/medicine" element={<MedicineLayout />}>
          <Route index element={<ShopDashboard />} />  {/* Default route */}
          <Route path="dashboard" element={<ShopDashboard />} />
          <Route path="products" element={<ShopProducts />} />
          <Route path="orders" element={<ShopOrders />} />
          <Route path="profile" element={<ShopProfile />} />
        </Route>
        {/* <Route path="/buyer" element={<Buyer />} /> */}
        {/* <Route path="/admin" element={<Admin />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
