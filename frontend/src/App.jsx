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
{
  /* Customer Panel */
}
import Register from "./components/Customer/Register";
import Login from "./components/Customer/Login";
import Dashboard from "./components/Customer/Dashboard";
import Orders from "./components/Customer/Orders";
import OrderSuccess from "./components/OrderSuccess";
import OrderFailure from "./components/OrderFailure";
import Wishlist from "./components/Customer/Wishlist";
import ChangePassword from "./components/Customer/ChangePassword";
import Profile from "./components/Customer/Profile";
import Address from "./components/Customer/Address";
{
  /* Seller Panel */
}
import AddAddress from "./components/Customer/AddAddress";
import SellerLogin from "./components/Seller/SellerLogin";
import SellerRegister from "./components/Seller/SellerRegister";
import SellerDashboard from "./components/Seller/SellerDashboard";
import SellerProducts from "./components/Seller/SellerProducts";
import AddProduct from "./components/Seller/AddProduct";
import VendorOrders from "./components/Seller/VendorOrders";
import Customers from "./components/Seller/Customers";
import Reports from "./components/Seller/Reports";
import SellerChangePassword from "./components/Seller/SellerChangePassword";
import SellerProfile from "./components/Seller/SellerProfile";
import TagProducts from "./components/TagProducts";
import AuthProvider from "./AuthProvider";
import ConfirmOrder from "./components/ConfirmOrder";
import UpdateAddress from "./components/Customer/UpdateAddress";
import UpdateProduct from "./components/Seller/UpdateProduct";


function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:category_slug/:category_id" element={<CategoryProducts />} />
          <Route path="/products/:tag" element={<TagProducts />} />
          <Route path="/product/:product_slug/:product_id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* Customer */}
          <Route path="/customer/register" element={<Register />} />
          <Route path="/customer/login" element={<Login />} />

          <Route path="/customer/dashboard" element={<Dashboard />} />
          <Route path="/customer/orders" element={<Orders />} />
          <Route path="/customer/wishlist" element={<Wishlist />} />
          <Route path="/customer/changepassword" element={<ChangePassword />} />
          <Route path="/customer/profile" element={<Profile />} />
          <Route path="/customer/address" element={<Address />} />
          <Route path="/customer/add-address" element={<AddAddress />} />
          <Route path="/customer/update-address/:address_id" element={<UpdateAddress />} />
          {/* Order status */}
          <Route path="/order/success" element={<OrderSuccess />} />
          <Route path="/order/failure" element={<OrderFailure />} />
          {/* Seller Panel */}
          <Route path="/seller/login" element={<SellerLogin />} />
          <Route path="/seller/register" element={<SellerRegister />} />
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/seller/products" element={<SellerProducts />} />
          <Route path="/seller/update-products/:productId" element={<UpdateProduct />} />
          <Route path="/seller/add-products" element={<AddProduct />} />
          <Route path="/seller/orders" element={<VendorOrders />} />
          <Route path="/seller/customers" element={<Customers />} />
          <Route path="/seller/reports" element={<Reports />} />
          <Route path="/seller/change-password" element={<SellerChangePassword />} />
          <Route path="/seller/profile" element={<SellerProfile />} />
          <Route path="/confirm-order" element={<ConfirmOrder />} />
        </Routes>

        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
