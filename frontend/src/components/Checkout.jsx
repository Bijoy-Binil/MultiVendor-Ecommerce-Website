import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext, UserContext } from "../../src/Context";

const Checkout = () => {
  const { cartData, removeFromCart, totalPrice } = useContext(CartContext);
  const { isLoggedIn } = useContext(UserContext);
  const items = cartData || [];

  // Calculate total with quantity
  const calculatedTotal = items.reduce((sum, item) => {
    return sum + (parseFloat(item.product.price) * (item.qty || 1));
  }, 0);

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 text-center sm:text-left">
        All Items ({items.length})
      </h1>

      <div className="w-full overflow-x-auto rounded-lg shadow-xl bg-white">
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-sky-800 text-white">
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
                Quantity
              </th>
              <th className="py-5 px-8 border-b text-lg font-semibold text-left">
                Subtotal
              </th>
              <th className="py-5 px-8 border-b text-lg font-semibold text-left">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {items.map((data, index) => (
              <tr key={data.product.id} className="hover:bg-gray-100 transition-all duration-200">
                <td className="py-5 px-8 border-b border-gray-300 text-gray-800 font-medium">
                  {index + 1}
                </td>
                <td className="py-5 px-8 border-b border-gray-300 flex items-center gap-6">
                  <Link to={`/productDetail/product/${data.product.id}`} className="flex items-center gap-6 group">
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
                <td className="py-5 px-8 border-b border-gray-300 text-gray-700 font-semibold">
                  {data.qty || 1}
                </td>
                <td className="py-5 px-8 border-b border-gray-300 text-gray-700 font-semibold">
                  ₹ {((data.qty || 1) * parseFloat(data.product.price)).toFixed(2)}
                </td>
                <td className="py-5 px-8 border-b border-gray-300 text-center">
                  <button
                    onClick={() => removeFromCart(data.product.id)}
                    aria-label="Remove from Cart"
                    className="px-4 py-2 text-xs hover:bg-red-700 active:bg-red-400 cursor-pointer bg-red-500 text-white rounded-md transition"
                  >
                    <i className="fa-solid fa-trash mr-2 "></i>Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

          {items.length === 0 ? (
            <tfoot>
              <tr>
                <td colSpan="6" className="py-8 px-8 text-center text-gray-500">
                  Your cart is empty.
                </td>
              </tr>
            </tfoot>
          ) : (
            <tfoot>
              <tr className="bg-gray-50">
                <td className="py-5 px-8 border-t border-gray-300"></td>
                <td className="py-5 px-8 border-t border-gray-300"></td>
                <td className="py-5 px-8 border-t border-gray-300"></td>
                <td className="py-5 px-8 border-t border-gray-300 text-right font-semibold text-gray-800">
                  Total
                </td>
                <td className="py-5 px-8 border-t border-gray-300 text-gray-800 font-bold">
                  ₹ {calculatedTotal.toFixed(2)}
                </td>
                <td className="py-5 px-8 border-t border-gray-300"></td>
              </tr>

              <tr>
                <td colSpan="6" className="py-8 px-8 text-center sm:text-right space-x-4">
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
