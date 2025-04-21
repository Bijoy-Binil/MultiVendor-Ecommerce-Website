import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  // State to handle mobile menu toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <nav className="bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            {/* Mobile Menu Button */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-400 hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            {/* Logo and Links for larger screens */}
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="text-white text-2xl font-bold">
               <Link to="/"><span className="text-blue-500">Multi</span>Vendor</Link> 
              </div>

              {/* Links on larger screens */}
              <div className="hidden sm:block sm:ml-6">
                <div className="flex  mx-250 space-x-4">
                  <Link
                    to="/"
                    className="text-white   hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </Link>

                  <Link
                    to="/categories"
                    className="text-white  hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Categories
                  </Link>

                  <Link
                    to="/checkout"
                    className="text-white w-21 flex justify-center  hover:bg-gray-700 hover:text-white  py-2 rounded-md text-sm font-medium"
                  >
                   My Cart (4)
                  </Link>
                  <div className="relative inline-block text-left">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Menu
      </button>

      {/* Dropdown Items */}
      {isOpen && (
      <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
          <Link
            to="/login"
            className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
          >
            Register
          </Link>
          <Link
            to="/customer/dashboard"
            className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
          >
            Dashboard
          </Link>
       
          <Link
            to="#"
            className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
          >
            Logout
          </Link>
        </div>
      )}
    </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`sm:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/login"
              className="text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Register
            </Link>
            <Link
              to="/customer/dashboard"
              className="text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/login"
              className="text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Logout
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
