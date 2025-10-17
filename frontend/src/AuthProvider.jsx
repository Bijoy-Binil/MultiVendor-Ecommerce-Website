import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();
export const CartContext = createContext();
export const CurrencyContext = createContext();

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
  const accessToken = localStorage.getItem('accessToken')
  const refreshToken = localStorage.getItem('refreshToken')
  const handleLogout = () => {
    localStorage.removeItem("Customer_username");
    localStorage.removeItem("Customer_login");
    localStorage.removeItem("Customer_id");
    setIsLoggedIn(false);
    setCustomerId(null);
    setCustomerName(null);
    navigate("/customer/login");
  };
// ---------------- AUTH Vendor ----------------
const [isVendorLoggedIn, setIsVendorLoggedIn] = useState(
  !!localStorage.getItem("Vendor_login")
);
const [vendorId, setVendorId] = useState(
  localStorage.getItem("Vendor_id")
);
const [vendorName, setVendorName] = useState(
  localStorage.getItem("Vendor_username")
);

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
console.log("CartDataAuth==> ",cartData)
  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartData));
  }, [cartData]);

  // ---------------- CURRENCY ----------------
  const [currencyData, setCurrencyData] = useState(
    localStorage.getItem("currency") || "inr"
  );

  useEffect(() => {
    localStorage.setItem("currency", currencyData);
    console.log("AuthProvider CurrentCurrency ==> ", currencyData);
  }, [currencyData]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn,vendorId,vendorName,accessToken,refreshToken,isVendorLoggedIn,handleVendorLogout, handleLogout, customerId, customerName }}
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
