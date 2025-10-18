import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";

// 🌐 Common Layout
import Header from "./components/Header";
import Footer from "./components/Footer";
import SwiperReact from "./components/SwiperReact";

// 🏠 Public Pages
import Home from "./components/Home";
import Categories from "./components/Categories";
import CategoryProducts from "./components/CategoryProducts";
import AllProducts from "./components/AllProducts";
import TagProducts from "./components/TagProducts";
import ProductDetail from "./components/ProductDetail";
import Checkout from "./components/Checkout";
import ConfirmOrder from "./components/ConfirmOrder";
import OrderSuccess from "./components/OrderSuccess";
import OrderFailure from "./components/OrderFailure";

// 👤 Customer Panel
import Register from "./components/Customer/Register";
import Login from "./components/Customer/Login";
import Dashboard from "./components/Customer/Dashboard";
import Orders from "./components/Customer/Orders";
import Wishlist from "./components/Customer/Wishlist";
import ChangePassword from "./components/Customer/ChangePassword";
import Profile from "./components/Customer/Profile";
import Address from "./components/Customer/Address";
import AddAddress from "./components/Customer/AddAddress";
import UpdateAddress from "./components/Customer/UpdateAddress";

// 🛍️ Seller Panel
import SellerLogin from "./components/Seller/SellerLogin";
import SellerRegister from "./components/Seller/SellerRegister";
import SellerDashboard from "./components/Seller/SellerDashboard";
import SellerProducts from "./components/Seller/SellerProducts";
import AddProduct from "./components/Seller/AddProduct";
import UpdateProduct from "./components/Seller/UpdateProduct";
import VendorOrders from "./components/Seller/VendorOrders";
import Customers from "./components/Seller/Customers";
import CustomerOrder from "./components/Seller/CustomerOrder";
import Reports from "./components/Seller/Reports";
import SellerChangePassword from "./components/Seller/SellerChangePassword";
import SellerProfile from "./components/Seller/SellerProfile";

// 🔐 Auth Context
import AuthProvider from "./AuthProvider";
import DailyReport from "./components/Seller/DailyReport";
import YearlyReport from "./components/Seller/YearlyReport";
import MonthlyReport from "./components/Seller/MonthlyReport";
import AddReview from "./components/Customer/AddReview";
import AllVendors from "./components/AllVendors";
import VendorDetail from "./components/Seller/VendorDetail";

function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <Routes>
          {/* 🌐 Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/categories" element={<Categories />} />
          <Route
            path="/category/:category_slug/:category_id"
            element={<CategoryProducts />}
          />
          <Route path="/products/:tag" element={<TagProducts />} />
          <Route
            path="/product/:product_slug/:product_id"
            element={<ProductDetail />}
          />
          <Route path="/seller/:slug/:id" element={<VendorDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirm-order" element={<ConfirmOrder />} />

          {/* ✅ Order status pages */}
          <Route path="/order/success" element={<OrderSuccess />} />
          <Route path="/order/failure" element={<OrderFailure />} />

          {/* 👤 Customer Routes */}
          <Route path="/customer/register" element={<Register />} />
          <Route path="/customer/login" element={<Login />} />
          <Route path="/customer/dashboard" element={<Dashboard />} />
          <Route path="/customer/orders" element={<Orders />} />
          <Route path="/customer/wishlist" element={<Wishlist />} />
          <Route
            path="/customer/changepassword"
            element={<ChangePassword />}
          />
          <Route path="/customer/profile" element={<Profile />} />
          <Route path="/customer/address" element={<Address />} />
          <Route path="/customer/add-address" element={<AddAddress />} />
          <Route
            path="/customer/update-address/:address_id"
            element={<UpdateAddress />}
          />

          {/* 🛍️ Seller Routes */}
          <Route path="/seller/login" element={<SellerLogin />} />
          <Route path="/seller/register" element={<SellerRegister />} />
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/seller/products" element={<SellerProducts />} />
          <Route path="/sellers" element={<AllVendors />} />
          <Route
            path="/seller/update-products/:productId"
            element={<UpdateProduct />}
          />
          <Route path="/seller/add-products" element={<AddProduct />} />
          <Route path="/seller/orders" element={<VendorOrders />} />
          <Route path="/seller/customers" element={<Customers />} />
          <Route
            path="/seller/:customer_id/order"
            element={<CustomerOrder />}
          />
          <Route path="/seller/reports" element={<Reports />} />
          <Route
            path="/seller/change-password"
            element={<SellerChangePassword />}
          />
          <Route path="/seller/profile" element={<SellerProfile />} />
        {/* Individual Report Routes */}
        <Route path="/seller/daily/report" element={<DailyReport />} />
        <Route path="/seller/monthly/report" element={<MonthlyReport />} />
        <Route path="/seller/yearly/report" element={<YearlyReport />} />
        <Route path="/customer/product-rating/:product_id" element={<AddReview />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
