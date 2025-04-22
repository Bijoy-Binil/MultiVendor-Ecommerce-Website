import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SellerSidebar from './SellerSidebar';

const Dropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between rounded-md bg-gray-800 text-white px-4 py-2 text-sm font-medium hover:bg-gray-700 focus:outline-none"
      >
        Change Status
        <svg
          className="ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1 text-sm text-gray-700">
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Approve</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Sent</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Complete</a>
       
          </div>
        </div>
      )}
    </div>
  );
};

const Customers = () => {
  return (
    <>
      <SellerSidebar />

      <div className="max-w-7xl mx-auto mb-[60px] md:mb-[90px] md:mr-5 px-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-3/4 mx-auto md:mx-25 -mt-[20px] md:-mt-[360px]">
            <h1 className="text-2xl font-semibold mb-6 text-center sm:text-left">Your Orders</h1>

            <div className="w-full overflow-x-auto">
              <table className="min-w-[600px] w-full bg-white text-sm sm:text-base border-separate border-spacing-y-2">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 uppercase tracking-wide">
                    <th className="py-3 px-4 border border-gray-200 rounded-l-lg">#</th>
                    <th className="py-3 px-4 border border-gray-200">Name</th>
                    <th className="py-3 px-4 border border-gray-200">Email</th>
                    <th className="py-3 px-4 border border-gray-200">Phone</th>
                    <th className="py-3 px-4 border border-gray-200 rounded-r-lg">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 1, name: 'John Doe',email:"John@gmail.com",phone:2545213658 },
                    { id: 2, name: 'Alex',email:"Alex@gmail.com",phone:451254265 },
                    { id: 3, name: 'Bijoy',email:"Bijoy@gmail.com",phone:451254265 },
                    { id: 4, name: 'Binoy',email:"Binoy@gmail.com",phone:451254265 },
                    { id: 5, name: 'Harvy',email:"Harvy@gmail.com",phone:451254265 },
                    { id: 6, name: 'Haritha',email:"Haritha@gmail.com",phone:451254265 },
                    { id: 7, name: 'Berlin',email:"Berlin@gmail.com",phone:451254265 },
                    { id: 8, name: 'Helsinki',email:"Helsinki@gmail.com",phone:451254265 },
                    
                  ].map((product) => (
                    <tr key={product.id} className="bg-white shadow-sm rounded hover:bg-gray-50 transition">
                      <td className="py-3 px-4 border border-gray-200">{product.id}</td>
                      <td className="py-3 px-4 border border-gray-200 flex items-center gap-4">
                        <Link to="#">
                          <img
                            className="w-12  h-12 sm:w-16 sm:h-16 object-cover rounded"
                            src="https://plus.unsplash.com/premium_photo-1742455147775-4f5f6c09011b?q=80&w=1974&auto=format&fit=crop"
                            alt={product.name}
                          />
                        </Link>
                        <Link to="#" className="text-blue-600 font-bold hover:underline">
                          <span>{product.name}</span>
                        </Link>
                      </td>
                      <td className="py-3 px-4 border font-semibold border-gray-200">{product.email}</td>
                      <td className="py-3 px-4 border border-gray-200">
                        <button className="text text-xs sm:text-sm font-semibold px-3 py-1 rounded-xl  flex items-center gap-1">
                           {product.phone}
                        </button>
                      </td>
                      <td className="py-3 px-4 border flex  border-gray-200">
                      <button className="text-white mr-2 font-semibold  sm:text-sm px-3 py-1 rounded bg-blue-500 flex items-center gap-1">
                          Orders
                        </button>
                      <button className="text-white mr-2 font-semibold  sm:text-sm px-3 py-1 rounded bg-red-500 flex items-center gap-1">
                          Remove 
                        </button>
                      </td>
                    
                    </tr>
                  ))}
                </tbody>


              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customers;
