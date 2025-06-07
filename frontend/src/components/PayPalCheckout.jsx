import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PayPalCheckout() {
  return (
    <PayPalScriptProvider options={{ clientId: "YOUR-SANDBOX-CLIENT-ID" }}>
      <div className="max-w-md mx-auto mt-10 p-4 shadow rounded">
        <h2 className="text-2xl font-bold mb-4">Pay with PayPal</h2>
        <PayPalButtons
          style={{ layout: "horizontal" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: "10.00", // 💰 Change this to your order amount
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              alert(`Transaction completed by ${details.payer.name.given_name}`);
              console.log(details);
              // 👉 Handle order success (save to DB, redirect, etc.)
            });
          }}
          onError={(err) => {
            console.error("PayPal Checkout Error:", err);
            alert("Something went wrong with the payment.");
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
}
