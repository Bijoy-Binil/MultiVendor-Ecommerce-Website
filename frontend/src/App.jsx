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
import AddressList from "./components/Customer/AddressList";
import AddAddress from "./components/Customer/AddAddress";
{/*Seller panel*/}
import SellerLogin from "./components/Seller/SellerLogin";
import SellerRegister from "./components/Seller/SellerRegister";
import SellerDashboard from "./components/Seller/SellerDashboard";

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
        {/*Customer Routes*/}      
        <Route path="/customer/login" element={<Login />} />
        <Route path="/customer/register" element={<Register />} />
        <Route path="/customer/dashboard" element={<Dashboard />} />
        <Route path="/customer/orders" element={<Orders />} />
        <Route path="/ordersuccess" element={<OrderSuccess />} />
        <Route path="/orderfailed" element={<OrderFailure />} />
        <Route path="customer/wishlist" element={<Wishlist />} />
        <Route path="customer/profile" element={<Profile />} />
        <Route path="customer/changepassword" element={<ChangePassword/>} />
        <Route path="customer/addresses" element={<AddressList/>} />
        <Route path="customer/add-address" element={<AddAddress/>} />
        {/*Seller Routes*/}
        <Route path="/seller/login" element={<SellerLogin/>} />
        <Route path="/seller/register" element={<SellerRegister />} />
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
