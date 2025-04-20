import React from "react";
import { Link } from "react-router-dom";

const Checkout = () => {
  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-semibold mb-7 text-center sm:text-left">
        All Items (4)
      </h1>

      <div className="w-full overflow-x-auto">
        <table className="min-w-[600px] w-full bg-white border border-gray-200 text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4 border-b">#</th>
              <th className="py-3 px-4 border-b">Product</th>
              <th className="py-3 px-4 border-b">Price</th>
            </tr>
          </thead>
          <tbody>
            {/* Product 1 */}
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b">1</td>
              <td className="py-3 px-4 border-b flex items-center gap-3 sm:gap-4">
                <Link to="#">
                  <img
                    className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded"
                    src="https://plus.unsplash.com/premium_photo-1742455147775-4f5f6c09011b?q=80&w=1974&auto=format&fit=crop"
                    alt="Django"
                  />
                </Link>
                <Link to="#"><span>Django</span></Link>
              </td>
              <td className="py-3 px-4 border-b">Rs 500</td>
            </tr>

            {/* Product 2 */}
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b">2</td>
              <td className="py-3 px-4 border-b flex items-center gap-3 sm:gap-4">
                <Link to="#">
                  <img
                    className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded"
                    src="https://plus.unsplash.com/premium_photo-1742455147775-4f5f6c09011b?q=80&w=1974&auto=format&fit=crop"
                    alt="Drf"
                  />
                </Link>
                <Link to="#"><span>Drf</span></Link>
              </td>
              <td className="py-3 px-4 border-b">Rs 500</td>
            </tr>

            {/* Product 3 */}
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b">3</td>
              <td className="py-3 px-4 border-b flex items-center gap-3 sm:gap-4">
                <Link to="#">
                  <img
                    className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded"
                    src="https://plus.unsplash.com/premium_photo-1742455147775-4f5f6c09011b?q=80&w=1974&auto=format&fit=crop"
                    alt="Python"
                  />
                </Link>
                <Link to="#"><span>Python</span></Link>
              </td>
              <td className="py-3 px-4 border-b">Rs 500</td>
            </tr>

            {/* Product 4 */}
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b">4</td>
              <td className="py-3 px-4 border-b flex items-center gap-3 sm:gap-4">
                <Link to="#">
                  <img
                    className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded"
                    src="https://plus.unsplash.com/premium_photo-1742455147775-4f5f6c09011b?q=80&w=1974&auto=format&fit=crop"
                    alt="Flask"
                  />
                </Link>
                <Link to="#"><span>Flask</span></Link>
              </td>
              <td className="py-3 px-4 border-b">Rs 500</td>
            </tr>
          </tbody>

          <tfoot>
            {/* Total Row */}
            <tr className="bg-gray-100 font-semibold">
              <td className="py-3 px-4 border-t"></td>
              <td className="py-3 px-4 border-t text-right">Total</td>
              <td className="py-3 px-4 border-t">Rs 2000</td>
            </tr>

            {/* Button Row */}
            <tr>
              <td colSpan="3" className="py-5 px-4 text-center sm:text-right space-x-3">
                <Link to="/categories">
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition">
                    Continue Shopping
                  </button>
                </Link>
                <Link to="/payment">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
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
