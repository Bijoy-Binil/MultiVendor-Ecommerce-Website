import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { UserContext, CartContext } from './Context.jsx';

const checkCustomer = localStorage.getItem("customer_login")
const cartData = JSON.parse(localStorage.getItem("cartData"))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserContext.Provider value={{ login: checkCustomer }}>
        <CartContext.Provider value={{ cartData }}>
          <App />
        </CartContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  </StrictMode>
);
