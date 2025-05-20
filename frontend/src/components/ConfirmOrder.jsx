import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ConfirmOrder = () => {
  const baseUrl = "http://127.0.0.1:8000/api";
  const navigate = useNavigate();
  const customerId = localStorage.getItem("customer_id");

  useEffect(() => {
    if (!customerId) {
      navigate("/customer/login");
    } else {
      createOrder();
    }
  }, [customerId]);

  const createOrder = async () => {
    console.log("📦 Customer ID:", customerId);
    const formData = new FormData();
    formData.append("customer", customerId);

    try {
      const response = await axios.post(`${baseUrl}/orders/`, formData);
      console.log("✅ Order Response:", response.data);
    } catch (error) {
      console.error("❌ Error creating order:", error.response?.data || error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-3xl text-green-500 font-bold">
        Your Order is Confirmed
      </p>
    </div>
  );
};

export default ConfirmOrder;
