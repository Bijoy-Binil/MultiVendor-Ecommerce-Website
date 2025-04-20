import React from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Categories from "./components/Categories";
import Categoryproducts from "./components/Categoryproducts";
import { Routes, Route } from "react-router-dom";
import AllProducts from "./components/AllProducts";
import ProductDetail from "./components/ProductDetail";
import Checkout from "./components/Checkout";

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
        
      </Routes>

      <Footer />
    </>
  );
}

export default App;
