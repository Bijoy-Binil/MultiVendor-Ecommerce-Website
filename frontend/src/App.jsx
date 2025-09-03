import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SwiperReact from "./components/SwiperReact";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import Categories from "./components/Categories";
import CategoryProducts from "./components/CategoryProducts";
import AllProducts from "./components/AllProducts";
import ProductDetail from "./components/ProductDetail";
import Checkout from "./components/Checkout";
{/* Customer Panel */}
import Register from "./components/Customer/Register";
import Login from "./components/Customer/Login";
import Dashboard from "./components/Customer/Dashboard";
import Orders from "./components/Customer/Orders";
import OrderSuccess from "./components/OrderSuccess";
import OrderFailure from "./components/OrderFailure";


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:category_slug/:category_id" element={<CategoryProducts />} />
        <Route path="/product/:product_slug/:product_id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* Customer */}
       <Route path="/customer/register" element={<Register />} />
       <Route path="/customer/login" element={<Login />} />
       <Route path="/customer/dashboard" element={<Dashboard />} />
       <Route path="/customer/orders" element={<Orders />} />
       <Route path="/order/success" element={<OrderSuccess />} />
       <Route path="/order/failure" element={<OrderFailure />} />

      </Routes>
 
      <Footer />
    </>
  );
}

export default App;
