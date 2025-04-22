import React from "react";
import { Link } from "react-router-dom";

const Checkout = () => {
  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-7 text-gray-800 text-center sm:text-left">
        All Items (4)
      </h1>

      <div className="w-full overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-[600px] w-full bg-white border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-4 px-6 border-b mr-5 border-gray-200 font-bold text-sm uppercase tracking-wide">#</th>
              <th className="py-4 px-6 border-b  border-gray-200 font-bold text-sm uppercase tracking-wide">Product</th>
              <th className="py-4 px-6 border-b border-gray-200 font-bold text-sm uppercase tracking-wide">Price</th>
            </tr>
          </thead>
          <tbody>
            {/* Product 1 */}
            <tr className="hover:bg-gray-50 transition-colors duration-200">
              <td className="py-4 px-6 border-b border-gray-100 text-gray-600">1</td>
              <td className="py-4 px-6 border-b border-gray-100 flex items-center gap-4">
                <Link to="#" className="flex items-center gap-4 group">
                  <img
                    className="w-16 h-16 object-cover ml-105 rounded-md border-2 border-gray-100 group-hover:border-blue-200 transition-all"
                    src="https://plus.unsplash.com/premium_photo-1742455147775-4f5f6c09011b?q=80&w=1974&auto=format&fit=crop"
                    alt="Django"
                  />
                  <span className="text-gray-700  group-hover:text-blue-600 font-medium transition-colors">Django</span>
                </Link>
              </td>
              <td className="py-4 px-6 border-b border-gray-100 text-gray-700 font-semibold">Rs 500</td>
            </tr>
            {/* Product 2 */}
            <tr className="hover:bg-gray-50  transition-colors duration-200">
              <td className="py-4 px-6 border-b border-gray-100 text-gray-600">1</td>
              <td className="py-4 px-6 border-b border-gray-100 flex items-center gap-4">
                <Link to="#" className="flex items-center gap-4 group">
                  <img
                    className="w-16 h-16 ml-105 object-cover rounded-md border-2 border-gray-100 group-hover:border-blue-200 transition-all"
                    src="https://plus.unsplash.com/premium_photo-1742455147775-4f5f6c09011b?q=80&w=1974&auto=format&fit=crop"
                    alt="Django"
                  />
                  <span className="text-gray-700 group-hover:text-blue-600 font-medium transition-colors">Django</span>
                </Link>
              </td>
              <td className="py-4 px-6 border-b border-gray-100 text-gray-700 font-semibold">Rs 500</td>
            </tr>

            {/* Repeat other product rows with same styling */}

          </tbody>

          <tfoot>
            {/* Total Row */}
            <tr className="bg-gray-50">
              <td className="py-4 px-6 border-t border-gray-200"></td>
              <td className="py-4 px-6 border-t border-gray-200 text-right font-semibold text-gray-700">Total</td>
              <td className="py-4 px-6 border-t border-gray-200 text-gray-800 font-bold">Rs 2000</td>
            </tr>

            {/* Button Row */}
            <tr>
              <td colSpan="3" className="py-6 px-6 text-center sm:text-right space-x-4">
                <Link to="/categories">
                  <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all font-medium shadow-sm hover:shadow-md">
                    Continue Shopping
                  </button>
                </Link>
                <Link to="/payment">
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium shadow-sm hover:shadow-md hover:-translate-y-0.5">
                    Proceed to Payment
                  </button>
                </Link>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Checkout;