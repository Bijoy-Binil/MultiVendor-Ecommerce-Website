import React, { useContext, useState } from "react";
import { AuthContext, CurrencyContext } from "../AuthProvider";
import axios from "axios";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
const ConfirmOrder = () => {
  const { customerId } = useContext(AuthContext);
  const baseUrl = "http://127.0.0.1:8000/api/";
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState("");
  const [orderAmount, setOrderAmount] = useState(0);
  const [payMethod, setPayMethod] = useState("");
  const { currencyData } = useContext(CurrencyContext);

  // Total
  let prevCart = localStorage.getItem("cartData");
  let carts = prevCart ? JSON.parse(prevCart) : [];
  var total_amount = 0;
  var total_usd_amount = 0;
  carts.map((cart, index) => {
    total_amount += parseFloat(cart.product.price);
    total_usd_amount += parseFloat(cart.product.usd_price);
  });
  // Create order in Django
  const createOrder = async () => {
    try {
      const orderRes = await axios.post(`${baseUrl}orders/`, {
        customer: customerId,
        total_amount: total_amount,
        total_usd_amount: total_usd_amount,
      });

      const newOrderId = orderRes.data.id;
      if (currencyData == "usd") {
        setOrderAmount(orderRes.data.total_usd_amount);
      } else {
        setOrderAmount(orderRes.data.total_amount);
      }
      setOrderId(newOrderId);

   
      // Add order items
      let prevCart = localStorage.getItem("cartData");
      let carts = prevCart ? JSON.parse(prevCart) : [];

      for (const cart of carts) {
        await axios.post(`${baseUrl}order-items/`, {
          order: newOrderId,
          product: cart.product.id,
          qty: 1,
          price: cart.product.price,
          usd_price: cart.product.usd_price,
        });
      }

      localStorage.removeItem("cartData");
      return newOrderId;
    } catch (err) {
      console.error("Error creating order:", err);
    }
  };

  // Update order status in Django
  const updateOrderStatus = async (orderId, status) => {
    try {
      const res = await axios.post(`${baseUrl}update-order-status/${orderId}/`);
      console.log("Order status updated:", res.data);
    } catch (err) {
      console.error("Order status update failed:", err);
    }
  };

  // Handle Pay Now button
  const PayNowButton = async () => {
    if (!payMethod) {
      alert("Select Payment Method !!");
      return;
    }

    const newOrderId = await createOrder();
    setOrderId(newOrderId);
    console.log("Selected payment method:", payMethod);
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-4 offset-4">
          <div className="card text-center py-3">
            <h3>
              <i className="fa fa-check-circle text-success"></i> Your order has been confirmed!!
            </h3>
            <h5>ORDER ID: {orderId}</h5>
          </div>

          <div className="card p-3 mt-4">
            <form>
              {currencyData == "usd" && (
                <>
                  <label>
                    <input type="radio" onChange={() => setPayMethod("paypal")} name="payMethod" />
                    PayPal
                  </label>
                  <br />

                  <label>
                    <input type="radio" onChange={() => setPayMethod("stripe")} name="payMethod" />
                    Stripe
                  </label>
                  <br />
                </>
              )}

              {currencyData != "usd" && (
                <>
                  {" "}
                  <label>
                    <input type="radio" onChange={() => setPayMethod("razorpay")} name="payMethod" />
                    RazorPay
                  </label>
                  <br />{" "}
                </>
              )}

              {/* <label>
                <input
                  type="radio"
                  onChange={() => setPayMethod("paytm")}
                  name="payMethod"
                />
                Paytm
              </label>
              <br /> */}

              <button type="button" onClick={PayNowButton} className="btn btn-sm btn-success mt-3 mb-3">
                Next
              </button>
            </form>

            {payMethod === "paypal" && orderId && (
              <PayPalScriptProvider
                options={{
                  "client-id": "AcR1hoIkPE_TErs-tmGk6v2GKZOb--ZbA6IBNMXd057qK3K1ayLbwRAsPBIB1R8gDhuDC8zvZEzpkz-3",
                  currency: "USD",
                  intent: "capture",
                }}
              >
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            currency_code: "USD",
                          value: orderAmount.toString(),

                          },
                        },
                      ],
                    });
                  }}
                  onApprove={async (data, actions) => {
                    try {
                      const details = await actions.order.capture();
                      navigate("/order/success");
                      console.log("✅ Payment captured:", details);

                      // Update Django after successful PayPal payment
                      updateOrderStatus(orderId, "paid");
                    } catch (error) {
                      console.error("Payment error:", error);
                      navigate("/order/failure");
                    }
                  }}
                />
              </PayPalScriptProvider>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
