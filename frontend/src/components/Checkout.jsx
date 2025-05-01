import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext, UserContext } from "../../src/Context";

const Checkout = () => {
  const { cartData, setCartData } = useContext(CartContext) || {}; // null-safe
  const userContext = useContext(UserContext) || {}; // null-safe
  console.log(userContext);
  // =============CartTotal====================
  let totalPrice = 0;
  cartData.map((item) => {
    totalPrice += parseFloat(item.product.price);
  });
  // =============CartTotal====================

  const updateCart = (newCart) => {
    localStorage.setItem("cartData", JSON.stringify(newCart));
    setCartData?.(newCart);
  };
  const removeFromCart = (product_id) => {
    const currentCart = JSON.parse(localStorage.getItem("cartData")) || [];
    const updatedCart = currentCart.filter(
      (item) => item.product.id !== product_id
    );
    updateCart(updatedCart);
    setInCart(false);
  };
  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 text-center sm:text-left">
        All Items ({Array.isArray(cartData) ? cartData.length : 0})
      </h1>

      <div className="w-full  overflow-x-auto rounded-lg shadow-xl bg-white">
        <table className="min-w-full  bg-white border-collapse">
          <thead className="bg-sky-800  text-white">
            <tr>
              <th className="py-5 px-8 border-b text-lg font-semibold text-left">
                No.
              </th>
              <th className="py-5 px-8 border-b text-lg font-semibold text-left">
                Product
              </th>
              <th className="py-5 px-8 border-b text-lg font-semibold text-left">
                Price
              </th>
              <th className="py-5 px-8 border-b text-lg font-semibold text-left">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {cartData.map((data, index) => {
              return (
                <tr className="hover:bg-gray-100 transition-all duration-200">
                  <td className="py-5 px-8 border-b border-gray-300 text-gray-800 font-medium">
                    {index + 1}
                  </td>
                  <td className="py-5 px-8 border-b border-gray-300 flex items-center gap-6">
                    <Link to="#" className="flex items-center gap-6 group">
                      <img
                        className="w-20 h-20 object-cover rounded-md border-2 border-gray-200 group-hover:border-blue-400 transition-all"
                        src={data.product.image}
                        alt={data.product.title}
                      />
                      <span className="text-gray-700 pr-20 group-hover:text-blue-600 font-medium">
                        {data.product.title}
                      </span>
                    </Link>
                  </td>
                  <td className="py-5 px-8 border-b border-gray-300 text-gray-700 font-semibold">
                    ₹ {parseFloat(data.product.price).toFixed(2)}
                  </td>
                  <td className="py-5 px-8 border-b border-gray-300 text-center">
                    <button
                      onClick={() => removeFromCart(data.product.id)}
                      aria-label="Remove from Cart"
                      className="px-4 py-2 text-xs hover:bg-red-700 active:bg-red-400 cursor-pointer bg-red-500 text-white rounded-md  transition"
                    >
                      <i className="fa-solid fa-trash mr-2 "></i>Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          {cartData == 0 ? (
            <tfoot></tfoot>
          ) : (
            <tfoot>
              <tr className="bg-gray-50">
                <td className="py-5 px-8 border-t border-gray-300"></td>
                <td className="py-5 px-8 border-t border-gray-300 text-right font-semibold text-gray-800">
                  Total
                </td>
                <td className="py-5 px-8 border-t border-gray-300 text-gray-800 font-bold">
                  ₹ {totalPrice.toFixed(2)}
                </td>
                <td className="py-5 px-8 border-t border-gray-300"></td>
              </tr>

              {/* Button Row */}
              <tr>
                <td
                  colSpan="4"
                  className="py-8 px-8 text-center sm:text-right space-x-4"
                >
                  <Link to="/categories">
                    <button className="px-6 py-3 text-white bg-purple-600 rounded-lg cursor-pointer hover:bg-purple-500 transition-all font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5">
                      Continue Shopping
                    </button>
                  </Link>

                  <Link to="/confirm-order">
                    <button className="px-6 py-3 bg-teal-600 text-white rounded-lg cursor-pointer hover:bg-teal-500 transition-all font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5">
                      Proceed to Payment
                    </button>
                  </Link>

              
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
};

export default Checkout;
