import React from "react";
import "./App.css";

{/*Websites*/}
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Categories from "./components/Categories";
import Categoryproducts from "./components/Categoryproducts";
import { Routes, Route } from "react-router-dom";
import AllProducts from "./components/AllProducts";
import ProductDetail from "./components/ProductDetail";
import Checkout from "./components/Checkout";

{/*Customers panel*/}
import Login from "./components/Customer/Login";
import Register from "./components/Customer/Register";
import Dashboard from "./components/Customer/Dashboard";
import Orders from "./components/Customer/Orders";
import OrderSuccess from "./components/OrderSuccess";
import OrderFailure from "./components/Customer/OrderFailure";
import Wishlist from "./components/Customer/Wishlist";
import Profile from "./components/Customer/Profile";
import ChangePassword from "./components/Customer/ChangePassword";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/" element={<AllProducts/>} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:category_slug/:category_id" element={<Categoryproducts />} />
        <Route path="/productDetail/:category_slug/:product_id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/customer/dashboard" element={<Dashboard />} />
        <Route path="/customer/orders" element={<Orders />} />
        <Route path="/ordersuccess" element={<OrderSuccess />} />
        <Route path="/orderfailed" element={<OrderFailure />} />
        <Route path="customer/wishlist" element={<Wishlist />} />
        <Route path="customer/profile" element={<Profile />} />
        <Route path="customer/changepassword" element={<ChangePassword/>} />
        
      </Routes>

      <Footer />
    </>
  );
}

export default App;
