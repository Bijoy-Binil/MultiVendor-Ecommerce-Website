import React, { useContext, useMemo, useState } from "react";
import { AuthContext, CurrencyContext } from "../AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);
console.log("Stripe key:", stripePromise);

// ---------------- Stripe Payment Form ----------------
const StripeCheckoutForm = ({ orderId, orderAmount, updateOrderStatus }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleStripePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("accessToken");

      // Create PaymentIntent on backend
      const res = await axios.post(
        "http://127.0.0.1:8000/api/stripe/create-payment-intent/",
        { amount: orderAmount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const clientSecret = res.data.client_secret;
      const cardElement = elements.getElement(CardElement);

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
      } else if (paymentIntent.status === "succeeded") {
        // Confirm order in backend
        await axios.post(
          "http://127.0.0.1:8000/api/stripe/confirm-order/",
          { payment_intent_id: paymentIntent.id, order_id: orderId },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        updateOrderStatus(orderId, "paid");
        localStorage.removeItem("cartData");
        window.location.href = "/order/success";
      }
    } catch (err) {
      console.error("Stripe payment error:", err);
      setError("Payment failed. Try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleStripePayment}>
      <CardElement className="mb-3 p-2 border rounded" />
      <button type="submit" disabled={!stripe || loading} className="btn btn-success">
        {loading ? "Processing..." : `Pay $${orderAmount.toFixed(2)}`}
      </button>
      {error && <p className="text-danger mt-2">{error}</p>}
    </form>
  );
};

// ---------------- ConfirmOrder Component ----------------
const ConfirmOrder = () => {
  const { customerId } = useContext(AuthContext);
  const { currencyData } = useContext(CurrencyContext);
  const baseUrl = "http://127.0.0.1:8000/api/";
  const navigate = useNavigate();

  const [orderId, setOrderId] = useState("");
  const [orderAmount, setOrderAmount] = useState(0);
  const [payMethod, setPayMethod] = useState("");

  // Cart data from localStorage
  const carts = useMemo(() => {
    const prevCart = localStorage.getItem("cartData");
    return prevCart ? JSON.parse(prevCart) : [];
  }, []);

  // Totals
  const { total_amount, total_usd_amount } = useMemo(() => {
    const totals = carts.reduce(
      (acc, item) => {
        const price = Number(item?.product?.price) || 0;
        const usd = Number(item?.product?.usd_price) || 0;
        return {
          total_amount: acc.total_amount + price,
          total_usd_amount: acc.total_usd_amount + usd,
        };
      },
      { total_amount: 0, total_usd_amount: 0 }
    );
    return totals;
  }, [carts]);

  // Create order in backend
  const createOrder = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const orderRes = await axios.post(
        `${baseUrl}orders/`,
        {
          total_amount,
          total_usd_amount,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newOrderId = orderRes.data.id;
      setOrderId(newOrderId);
      setOrderAmount(currencyData === "usd" ? Number(orderRes.data.total_usd_amount) : Number(orderRes.data.total_amount));

      // Add order items
      for (const cart of carts) {
        await axios.post(
          `${baseUrl}order-items/`,
          {
            order: newOrderId,
            product: cart.product.id,
            qty: 1,
            price: cart.product.price,
            usd_price: cart.product.usd_price,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      return newOrderId;
    } catch (err) {
      console.error("Error creating order:", err);
    }
  };

  // Update order status (called by Stripe or PayPal)
  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.post(`${baseUrl}update-order-status/${orderId}/`, { status });
    } catch (err) {
      console.error("Order status update failed:", err);
    }
  };

  const handlePayNow = async () => {
    if (!payMethod) {
      alert("Select Payment Method !!");
      return;
    }
    await createOrder();
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
            {/* Payment Method Selection */}
            <form>
              {currencyData === "usd" ? (
                <>
                  <label>
                    <input type="radio" onChange={() => setPayMethod("paypal")} name="payMethod" /> PayPal
                  </label>
                  <br />
                  <label>
                    <input type="radio" onChange={() => setPayMethod("stripe")} name="payMethod" /> Stripe
                  </label>
                  <br />
                </>
              ) : (
                <>
                  <label>
                    <input type="radio" onChange={() => setPayMethod("razorpay")} name="payMethod" /> RazorPay
                  </label>
                  <br />
                </>
              )}
              <button type="button" onClick={handlePayNow} className="btn btn-sm btn-success mt-3 mb-3">
                Next
              </button>
            </form>

            {/* PayPal */}
            {payMethod === "paypal" && orderId && orderAmount > 0 && (
              <PayPalScriptProvider
                options={{
                  "client-id": "AcR1hoIkPE_TErs-tmGk6v2GKZOb--ZbA6IBNMXd057qK3K1ayLbwRAsPBIB1R8gDhuDC8zvZEzpkz-3", // replace with your PayPal sandbox key
                  currency: "USD",
                  intent: "capture",
                }}
              >
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [{ amount: { currency_code: "USD", value: orderAmount.toFixed(2) } }],
                    });
                  }}
                  onApprove={async (data, actions) => {
                    const details = await actions.order.capture();
                    await updateOrderStatus(orderId, "paid"); // <-- update backend
                    localStorage.removeItem("cartData");
                    navigate("/order/success");
                  }}
                  onError={(err) => {
                    console.error(err);
                    navigate("/order/failure");
                  }}
                />
              </PayPalScriptProvider>
            )}

            {/* Stripe */}
            {payMethod === "stripe" && orderId && orderAmount > 0 && (
              <Elements stripe={stripePromise}>
                <StripeCheckoutForm orderId={orderId} orderAmount={orderAmount} updateOrderStatus={updateOrderStatus} />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
