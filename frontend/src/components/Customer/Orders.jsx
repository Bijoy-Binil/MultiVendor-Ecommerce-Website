import React from 'react';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

const Orders = () => {
  return (
    <>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4  sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-semibold mb-6 text-center sm:text-left">
          Your Orders
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
              {[
                { id: 1, name: 'Django' },
                { id: 2, name: 'Drf' },
                { id: 3, name: 'Python' },
                { id: 4, name: 'Flask' },
              ].map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{product.id}</td>
                  <td className="py-3 px-4 border-b flex items-center gap-3 sm:gap-4">
                    <Link to="#">
                      <img
                        className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded"
                        src="https://plus.unsplash.com/premium_photo-1742455147775-4f5f6c09011b?q=80&w=1974&auto=format&fit=crop"
                        alt={product.name}
                      />
                    </Link>
                    <Link to="#"><span>{product.name}</span></Link>
                  </td>
                  <td className="py-3 px-4 border-b">Rs 500</td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr className="bg-gray-100 font-semibold">
                <td className="py-3 px-4 border-t"></td>
                <td className="py-3 px-4 border-t text-right">Total</td>
                <td className="py-3 px-4 border-t">Rs 2000</td>
              </tr>
              <tr>
                <td colSpan="3" className="py-5 px-4">
                  <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
                    <Link to="/categories">
                      <button className="w-full sm:w-auto px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition">
                        Continue Shopping
                      </button>
                    </Link>
                    <Link to="/payment">
                      <button className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                        Proceed to Payment
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
};

export default Orders;
