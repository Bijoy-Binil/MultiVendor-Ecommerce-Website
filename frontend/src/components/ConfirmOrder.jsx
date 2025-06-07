import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { isAuthenticated } from "../utils/auth";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState({ success: false, message: "Processing order..." });
  const [idOrder, setIdOrder] = useState("");
  const [payMethod, setPayMethod] = useState("");
  const orderCreated = useRef(false);
  const username=localStorage.getItem("customer_username")

  useEffect(() => {
    if (!isAuthenticated()) return navigate("/customer/login");
    if (!orderCreated.current) createOrder();
  }, []);

  const createOrder = async () => {
    orderCreated.current = true;
    const cartItems = JSON.parse(localStorage.getItem("cartData") || "[]");

    if (cartItems.length === 0) {
      return setStatus({ success: false, message: "Cart is empty. Add items before ordering." });
    }

    try {
      const orderRes = await api.post("/orders/", {});
      const orderId = orderRes.data.id;
      setIdOrder(orderId.toString().padStart(4, "0"));

      await Promise.all(cartItems.map(item =>
        api.post("/order-items/", {
          order: orderId,
          product: item.product.id,
          qty: item.qty || 1,
          price: item.product.price,
        })
      ));

      setStatus({ success: true, message: "Order placed successfully!" });
      localStorage.removeItem("cartData");
    } catch (err) {
      console.error("Order error:", err);
      setStatus({
        success: false,
        message: err.response?.data?.detail || "Order failed. Try again."
      });
      orderCreated.current = false;
    }
  };

  const handlePaymentMethod = (method) => {
    setPayMethod(method);
  };

  const handlePayNow = () => {
    if (!payMethod) {
      alert("Please select a payment method.");
      return;
    }
    if (payMethod !== "PayPal") {
      console.log("Proceeding with", payMethod);
      alert(`Proceeding with ${payMethod} (integration pending).`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <p className={`text-3xl font-bold mb-4 ${status.success ? 'text-green-500' : 'text-yellow-500'}`}>
        {status.success ? `Your Order is Confirmed. Order ID: #${idOrder}` : "Processing Your Order"}
      </p>
      <p className="text-lg font-medium text-gray-700 mb-6 text-center max-w-md">{status.message}</p>

      <div className="w-full max-w-sm bg-white shadow-md rounded-2xl p-6">
        <p className="text-2xl font-bold text-center text-gray-800 mb-4">Make a Payment</p>

        <form className="space-y-4">
          {["Razorpay", "Paytm", "Stripe", "PayPal"].map((method) => (
            <label
              key={method}
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:shadow-md transition"
            >
              <input
                type="radio"
                name="payment"
                value={method}
                onChange={() => handlePaymentMethod(method)}
                className="accent-indigo-600"
              />
              <span className="text-gray-700 font-medium">{method}</span>
            </label>
          ))}

          <button
            type="button"
            onClick={handlePayNow}
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Proceed to Pay
          </button>
        </form>
      </div>
{payMethod === "PayPal" && (
  <PayPalScriptProvider options={{ clientId: "AcR1hoIkPE_TErs-tmGk6v2GKZOb--ZbA6IBNMXd057qK3K1ayLbwRAsPBIB1R8gDhuDC8zvZEzpkz-3" }}>
    <div className="mt-10 w-full max-w-md bg-white rounded-2xl shadow-lg p-6 transition-all duration-300">
      <div className="flex flex-col items-center">
        <img
          src="https://www.paypalobjects.com/webstatic/icon/pp258.png"
          alt="PayPal"
          className="w-20 h-20 mb-4"
        />
        <h2 className="text-2xl font-bold text-indigo-700 mb-2">Secure PayPal Checkout</h2>
        <p className="text-gray-600 text-sm text-center mb-6">
          You will be redirected to PayPal to complete your secure transaction.
        </p>
      </div>

      <PayPalButtons
        style={{ layout: "horizontal", color: "blue", shape: "pill", label: "paypal" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: "10.00", // 💰 Replace with dynamic total
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            alert(`Transaction completed by ${username}`);
            console.log(details);
            navigate("/ordersuccess");
          });
        }}
        onError={(err) => {
          console.error("PayPal Checkout Error:", err);
          alert("Something went wrong with the PayPal payment.");
        }}
      />
    </div>
  </PayPalScriptProvider>
)}

    </div>
  );
};

export default ConfirmOrder;
