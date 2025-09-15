import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();
export const CartContext = createContext();
export const CurrencyContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // ---------------- AUTH ----------------
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("Customer_login")
  );
  const [customerId, setCustomerId] = useState(
    localStorage.getItem("Customer_id")
  );
  const [customerName, setCustomerName] = useState(
    localStorage.getItem("Customer_username")
  );

  const handleLogout = () => {
    localStorage.removeItem("Customer_username");
    localStorage.removeItem("Customer_login");
    localStorage.removeItem("Customer_id");
    setIsLoggedIn(false);
    setCustomerId(null);
    setCustomerName(null);
    navigate("/customer/login");
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
      value={{ isLoggedIn, setIsLoggedIn, handleLogout, customerId, customerName }}
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
