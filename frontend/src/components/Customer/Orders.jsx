import React, { useEffect, useState } from "react";
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

const Orders = () => {
    const baseUrl = "http://127.0.0.1:8000/api";
    const [orderItems,setOrderItems]=useState([])
    const CustomerId=localStorage.getItem("customer_id")
    console.log(CustomerId);
      useEffect(() => {
        FetchData(baseUrl + "/customer/" + CustomerId + "/order-items/");
      }, []);
    
      const FetchData = (baseUrl) => {
        fetch(baseUrl)
          .then((res) => res.json())
          .then((data) => {
          console.log(data.results);
          setOrderItems(data.results)
          });
      };
  return (
    <>
      {/* Sidebar */}
      <Sidebar />
      <div className="max-w-7xl mx-auto mb-[60px] md:mb-[90px] md:mr-5 px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Main Content */}
          <div className="w-full md:w-3/4 mx-auto md:mx-25 -mt-[20px] md:-mt-[360px]">
            <h1 className="text-2xl font-semibold mb-6 text-center sm:text-left">
              Your Orders
            </h1>

            <div className="w-full overflow-x-auto">
              <table className="min-w-[600px] w-full bg-white text-sm sm:text-base border-separate border-spacing-y-2">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 uppercase tracking-wide">
                    <th className="py-3 px-4 border border-gray-200 rounded-l-lg">Name</th>
                    <th className="py-3 px-4 border border-gray-200">Product</th>
                    <th className="py-3 px-4 border border-gray-200">Price</th>
                    <th className="py-3 px-4 border border-gray-200">Action</th>
                    <th className="py-3 px-4 border border-gray-200 rounded-r-lg">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    orderItems.map((product) => (
                    <tr key={product.id} className="bg-white shadow-sm rounded hover:bg-gray-50 transition">
                      <td className="py-3 px-4 border border-gray-200">{product.product.title}</td>
                      <td className="py-3 px-4 border border-gray-200 flex items-center gap-4">
                        <Link to="#">
                          <img
                            className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded"
                            src={product.product.image}
                            alt={product.name}
                          />
                        </Link>
                        <Link to="#" className="text-blue-600 hover:underline">
                          <span>{product.name}</span>
                        </Link>
                      </td>
                      <td className="py-3 px-4 border border-gray-200">{product.price}</td>
                      <td className="py-3 px-4 border border-gray-200">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm px-3 py-1 rounded-full transition">
                          Download
                        </button>
                      </td>
                      <td className="py-3 px-4 border border-gray-200">
                        <button className="text-green-700 font-semibold text-xs sm:text-sm px-3 py-1 rounded-full bg-green-100 flex items-center gap-1">
                          <i className="fa fa-check-circle"></i> Completed
                        </button>
                      </td>
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
        </div>
      </div>
    </>
  );
};

export default Orders;
