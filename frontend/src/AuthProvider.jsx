import React, { createContext, useState } from 'react'
import { useNavigate } from "react-router-dom"


export const AuthContext = createContext()
export const CartContext = createContext()


const AuthProvider = ({ children }) => {
  const navigate = useNavigate()

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("Customer_login")
  )
  const [customerId, setCustomerId] = useState(
    localStorage.getItem("Customer_id")
  )
  const [customerName, setCustomerName] = useState(
    localStorage.getItem("Customer_username")
  )
  console.log("ProviderLogin==>", isLoggedIn)
  console.log("ProviderCustomerName==>", customerName)
  console.log("ProviderCustomerId==>", customerId)

  const handleLogout = (e) => {

    localStorage.removeItem("Customer_username")
    localStorage.removeItem("Customer_login")
    navigate("/customer/login")
  }

  const [cartData, setCartData] = useState(() => {
  const savedCart = localStorage.getItem("cartData");
  console.log("AuthProvider checkCart ==> ", savedCart)
  return savedCart ? JSON.parse(savedCart) : [];  // never null
});

  return (
    <div>

      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, handleLogout,customerId , customerName }} >
        <CartContext.Provider value={{ cartData, setCartData }}>
          {children}
        </CartContext.Provider>
      </AuthContext.Provider>





    </div>
  )
}

export default AuthProvider