import React, { useContext, useEffect } from "react";
import { AuthContext } from "../AuthProvider";
import axios from "axios";

const ConfirmOrder = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";
  const { customerId } = useContext(AuthContext);

  const createOrder = async () => {
    try {
      // 1. Create order
      const orderRes = await axios.post(`${baseUrl}orders/`, {
        customer: customerId,
      });
      const orderId = orderRes.data.id;
      console.log("Order created:", orderId);

      // 2. Get cart from localStorage
      let prevCart = localStorage.getItem("cartData");
      let carts = prevCart ? JSON.parse(prevCart) : [];

      // 3. Create order items
      for (const cart of carts) {
        const itemData = {
          order: orderId,
          product: cart.product.id,
          qty: 1, // or cart.qty if you store it
          price: cart.product.price,
        };

        const itemRes = await axios.post(`${baseUrl}order-items/`, itemData);
        console.log("Order item created:", itemRes.data);
      }

      // 4. Clear cart after success
      localStorage.removeItem("cartData");

    } catch (err) {
      console.error("Error creating order:", err);
    }
  };

  useEffect(() => {
    createOrder();
  }, []);

  return (
    <div>
      <h1>Your order has been confirmed!!</h1>
    </div>
  );
};

export default ConfirmOrder;
