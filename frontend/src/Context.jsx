import { createContext, useState, useEffect } from 'react';

// User Context
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("customer_login") === "true");
  const [user, setUser] = useState({
    id: localStorage.getItem("customer_id"),
    username: localStorage.getItem("customer_username")
  });

  useEffect(() => {
    // Update context when localStorage changes
    const checkLoginStatus = () => {
      setIsLoggedIn(localStorage.getItem("customer_login") === "true");
      setUser({
        id: localStorage.getItem("customer_id"),
        username: localStorage.getItem("customer_username")
      });
    };

    // Listen for storage events to update context when another tab changes localStorage
    window.addEventListener('storage', checkLoginStatus);
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  return (
    <UserContext.Provider value={{ isLoggedIn, user, setIsLoggedIn, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Cart Context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cartData")) || [];
    } catch (error) {
      console.error("Error parsing cart data:", error);
      return [];
    }
  });

  useEffect(() => {
    // Update localStorage when cartData changes
    localStorage.setItem("cartData", JSON.stringify(cartData));
    
    // Create a custom event to notify other components of cart changes
    const event = new CustomEvent('cartUpdated', { detail: cartData });
    window.dispatchEvent(event);
  }, [cartData]);

  useEffect(() => {
    // Listen for storage events to update context when another tab changes localStorage
    const handleStorageChange = (e) => {
      if (e.key === "cartData") {
        try {
          setCartData(JSON.parse(e.newValue) || []);
        } catch (error) {
          console.error("Error parsing cart data from storage event:", error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Cart operations
  const addToCart = (product) => {
    // Check if product is already in cart
    const existingItem = cartData.find(item => item.product.id === product.id);
    
    if (existingItem) {
      // Update quantity if product already exists
      setCartData(cartData.map(item => 
        item.product.id === product.id 
          ? { ...item, qty: (item.qty || 1) + 1 } 
          : item
      ));
    } else {
      // Add new product with qty 1
      setCartData([...cartData, { 
        product: {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image || '',
        },
        qty: 1
      }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartData(cartData.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCartData([]);
  };

  const updateQuantity = (productId, qty) => {
    setCartData(cartData.map(item => 
      item.product.id === productId ? { ...item, qty } : item
    ));
  };

  return (
    <CartContext.Provider value={{ 
      cartData, 
      addToCart, 
      removeFromCart, 
      clearCart,
      updateQuantity,
      totalItems: cartData.length,
      totalPrice: cartData.reduce((total, item) => total + (parseFloat(item.product.price) * (item.qty || 1)), 0)
    }}>
      {children}
    </CartContext.Provider>
  );
};

