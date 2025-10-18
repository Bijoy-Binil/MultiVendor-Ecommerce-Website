import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();
export const CartContext = createContext();
export const CurrencyContext = createContext();

const API_URL = "http://127.0.0.1:8000/api/";

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // ---------------- AUTH Customer ----------------
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("Customer_login")
  );
  const [customerId, setCustomerId] = useState(
    localStorage.getItem("Customer_id")
  );
  const [customerName, setCustomerName] = useState(
    localStorage.getItem("Customer_username")
  );
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"));
    console.log("atoken==>",accessToken)
    console.log("rtoken==>",refreshToken)
  const handleLogout = () => {
    localStorage.removeItem("Customer_username");
    localStorage.removeItem("Customer_login");
    localStorage.removeItem("Customer_id");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    setCustomerId(null);
    setCustomerName(null);
    setAccessToken(null);
    setRefreshToken(null);
    navigate("/customer/login");
  };

  // ---------------- AUTH Vendor ----------------
  const [isVendorLoggedIn, setIsVendorLoggedIn] = useState(
    !!localStorage.getItem("Vendor_login")
  );
  const [vendorId, setVendorId] = useState(localStorage.getItem("Vendor_id"));
  const [vendorName, setVendorName] = useState(localStorage.getItem("Vendor_username"));

  const handleVendorLogout = () => {
    localStorage.removeItem("Vendor_username");
    localStorage.removeItem("Vendor_login");
    localStorage.removeItem("Vendor_id");
    setIsVendorLoggedIn(false);
    setVendorId(null);
    setVendorName(null);
    navigate("/seller/login");
  };

  // ---------------- CART ----------------
  const [cartData, setCartData] = useState(() => {
    const savedCart = localStorage.getItem("cartData");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartData));
  }, [cartData]);

  // ---------------- CURRENCY ----------------
  const [currencyData, setCurrencyData] = useState(
    localStorage.getItem("currency") || "inr"
  );
  useEffect(() => {
    localStorage.setItem("currency", currencyData);
  }, [currencyData]);

  // ---------------- REFRESH TOKEN ----------------
  const refreshAccessToken = async () => {
    if (!refreshToken) return null;
    try {
      const res = await axios.post(`${API_URL}token/refresh/`, {
        refresh: refreshToken,
      });
      setAccessToken(res.data.access);
      localStorage.setItem("accessToken", res.data.access);

  
      return res.data.access;
    } catch (err) {
      console.error("Refresh token failed:", err);
      handleLogout();
      return null;
    }
  };

  // Optional: automatically refresh token before expiry (every 4 mins)
  useEffect(() => {
    const interval = setInterval(() => {
      if (refreshToken) refreshAccessToken();
    }, 4 * 60 * 1000); // 4 minutes
    return () => clearInterval(interval);
  }, [refreshToken]);

  return (
    <AuthContext.Provider
      value={{ 
        isLoggedIn, setIsLoggedIn, customerId, setCustomerId, customerName, setCustomerName,
        isVendorLoggedIn, setIsVendorLoggedIn, vendorId, setVendorId, vendorName, setVendorName,
        accessToken, refreshToken,
        handleVendorLogout, handleLogout,
        refreshAccessToken
      }}
    >
      <CartContext.Provider value={{ cartData, setCartData }}>
        <CurrencyContext.Provider value={{ currencyData, setCurrencyData }}>
          {children}
        </CurrencyContext.Provider>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
