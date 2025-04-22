import React from "react";
import SellerSidebar from "./SellerSidebar";
import { Link } from "react-router-dom";

const SellerProducts = () => {
  return (
    <>
      {/* Sidebar */}
      <SellerSidebar />

      <div className="max-w-7xl mx-auto mb-[60px] md:mb-[90px] md:mr-5 px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Main Content */}
          <div className="w-full md:w-3/4 mx-auto md:mx-10 -mt-[20px] md:-mt-[360px]">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h1 className="text-2xl font-semibold mb-6 text-center sm:text-left">
                Products
              </h1>
              <div>
                <Link
                  to="/seller/add-product"
                  className="flex justify-self-end my-2 sm:justify-start w-full sm:w-fit gap-2 border border-blue-500 bg-blue-700 text-white hover:bg-blue-600 px-4 py-2 rounded-xl transition"
                >
                  <i className="fa fa-plus-circle"></i>
                  Add Products
                </Link>
              </div>


              <div className="w-full overflow-x-auto">
                <table className="min-w-[600px] w-full bg-white text-sm sm:text-base border-separate border-spacing-y-2">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700 uppercase tracking-wide">
                      <th className="py-3 px-4 border border-gray-200 rounded-l-lg">#</th>
                      <th className="py-3 px-4 border border-gray-200">Product</th>
                      <th className="py-3 px-4 border border-gray-200">Price</th>
                      <th className="py-3 px-4 border border-gray-200">Status</th>
                      <th className="py-3 px-4 border border-gray-200 rounded-r-lg">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 1, name: "Django" },
                      { id: 2, name: "Drf" },
                      { id: 3, name: "Python" },
                      { id: 4, name: "Flask" },
                    ].map((product) => (
                      <tr key={product.id} className="bg-white shadow-sm rounded hover:bg-gray-50 transition">
                        <td className="py-3 px-4 border border-gray-200">{product.id}</td>
                        <td className="py-3 px-4 border border-gray-200">
                          <Link to="#" className="text-blue-600 hover:underline">{product.name}</Link>
                        </td>
                        <td className="py-3 px-4 border border-gray-200">Rs 500</td>
                        <td className="py-3 px-4 border border-gray-200 text-green-600">Published</td>
                        <td className="py-3 px-4 border border-gray-200 space-x-2">
                          <a className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold cursor-pointer">
                            View
                          </a>
                          <a className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-1 rounded-full text-xs font-semibold cursor-pointer">
                            Edit
                          </a>
                          <a className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold cursor-pointer">
                            Delete
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>

 
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerProducts;
