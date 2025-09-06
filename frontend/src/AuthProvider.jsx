import React, { createContext, useState } from 'react'
import { useNavigate } from "react-router-dom" 


export const AuthContext = createContext()


const AuthProvider = ({children}) => {
const navigate=useNavigate()

 const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("Customer_login")
 )
console.log("ProviderLogin==>",isLoggedIn)

const handleLogout = (e) => {
    
    localStorage.removeItem("Customer_username")
    localStorage.removeItem("Customer_login")
    navigate("/customer/login")
  }

  return (
    <div>

<AuthContext.Provider value={{isLoggedIn,setIsLoggedIn,handleLogout}} >
{children}
</AuthContext.Provider>

    </div>
  )
}

export default AuthProvider