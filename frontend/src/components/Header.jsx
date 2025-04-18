import React from 'react'
import  { useState } from "react";
const Header = () => {
      // State to handle mobile menu toggle
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
      const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
      };
    
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
                <span className="text-blue-500">Multi</span>Vendor
              </div>

              {/* Links on larger screens */}
              <div className="hidden sm:block sm:ml-6">
                <div className="flex  mx-280 space-x-4">
                  <a
                    href="#"
                    className="text-white  hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </a>

                  <a
                    href="#"
                    className="text-white  hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Categories
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`sm:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#"
              className="text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </a>

            <a
              href="#"
              className="text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Categories
            </a>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header