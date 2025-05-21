import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { isAuthenticated } from "../utils/auth";

const ConfirmOrder = () => {
  const baseUrl = "http://127.0.0.1:8000/api";
  const navigate = useNavigate();
  const [orderStatus, setOrderStatus] = useState({ success: false, message: "Processing order..." });
  const orderCreated = useRef(false); // Use a ref to track if order has been created

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/customer/login");
    } else if (!orderCreated.current) {
      // Only create the order if it hasn't been created yet
      createOrder();
    }
  }, []);

  const createOrder = async () => {
    // Set the ref to true immediately to prevent duplicate calls
    orderCreated.current = true;
    
    try {
      // With JWT authentication, no need to explicitly send customer ID
      // as it's determined from the authenticated user in the backend
      const response = await api.post(`/orders/`, {});
      console.log("✅ Order Response:", response.data);
      setOrderStatus({ success: true, message: "Order created successfully!" });
      
      // Clear cart data after successful order
      localStorage.removeItem("cartData");
      
      // Navigate to order success page after a slight delay
      setTimeout(() => {
        navigate("/ordersuccess");
      }, 1500);
      
    } catch (error) {
      console.error("❌ Error creating order:", error.response?.data || error);
      setOrderStatus({ 
        success: false, 
        message: error.response?.data?.detail || "Failed to create order. Please try again."
      });
      
      // If there's an error, allow the order to be created again
      orderCreated.current = false;
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <p className={`text-3xl ${orderStatus.success ? 'text-green-500' : 'text-yellow-500'} font-bold mb-4`}>
        {orderStatus.success ? "Your Order is Confirmed" : "Processing Your Order"}
      </p>
      <p className="text-gray-600">{orderStatus.message}</p>
    </div>
  );
};

export default ConfirmOrder;
