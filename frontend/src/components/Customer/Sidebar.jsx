import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
     <div className="max-w-7xl mx-auto mt-6 px-4">
     <div className="flex flex-col md:flex-row gap-6">
    <div className="w-full md:w-1/4">
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-4">My Account</h2>
        <ul className="space-y-2">
          <li>
            <Link
              to="/customer/dashboard"
              className="block px-4 font-semibold py-2 rounded text-white bg-sky-700 hover:text-white transition"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
               to="/customer/orders"
              className="block px-4 py-2 rounded hover:text-green-400 transition"
            >
              Orders
            </Link>
          </li>
          <li>
            <Link
              to="/customer/wishlist"
              className="block px-4 py-2 rounded hover:text-green-400 transition"
            >
              Wishlist
            </Link>
          </li>
          <li>
            <Link
            to="/customer/profile"
              className="block px-4 py-2 rounded hover:text-green-400 transition"
            >
              Profiles
            </Link>
            <Link
             to="/customer/changepassword"
              className="block px-4 py-2 rounded hover:text-green-400 transition"
            >
              Change Password
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="block px-4 py-2 rounded hover:text-green-400 transition"
            >
              Address
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="block px-4 py-2 font-semibold text-red-500 rounded transition"
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
    </div>
    </div>
    </>
  );
};

export default Sidebar;
