import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext, UserContext } from "../../src/Context";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOpenSeller, setIsOpenSeller] = useState(false);
  const [isOpenAccount, setIsOpenAccount] = useState(false);

  const { cartData, setCartData } = useContext(CartContext) || {}; // null-safe
  const userContext = useContext(UserContext) || {}; // null-safe
  console.log(userContext);

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center relative">
          {/* Logo */}
          <div className="text-white text-2xl font-bold">
            <Link to="/">
              <span className="text-blue-500">Multi</span>Vendor
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center space-x-6">
            <Link
              to="/"
              className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/categories"
              className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Categories
            </Link>

            {/* Vendor Panel Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsOpenSeller(!isOpenSeller)}
                className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Vendor Panel
              </button>
              {isOpenSeller && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                  <Link
                    to="/seller/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Login
                  </Link>
                  <Link
                    to="/seller/register"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Register
                  </Link>
                  <Link
                    to="/seller/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>

            {/* My Account Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsOpenAccount(!isOpenAccount)}
                className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                My Account
              </button>
              {isOpenAccount && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                  {userContext.login ? (
                    <>
                      <Link
                        to="/customer/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/customer/logout"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/customer/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Login
                      </Link>
                      <Link
                        to="/customer/register"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            <Link
              to="/checkout"
              className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              My Cart ({Array.isArray(cartData) ? cartData.length : 0})
            </Link>

            <Link
              to="/checkout"
              className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              New Orders (5)
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-gray-400 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="sm:hidden px-4 pt-2 pb-4 space-y-2">
          <Link to="/" className="block text-white py-2">
            Home
          </Link>
          <Link to="/categories" className="block text-white py-2">
            Categories
          </Link>
          {!isLoggedIn && (
            <>
              <Link to="/customer/login" className="block text-white py-2">
                Login
              </Link>
              <Link to="/customer/register" className="block text-white py-2">
                Register
              </Link>
            </>
          )}
          {isLoggedIn && (
            <>
              <Link to="/customer/dashboard" className="block text-white py-2">
                Dashboard
              </Link>
              <Link to="/customer/logout" className="block text-white py-2">
                Logout
              </Link>
            </>
          )}
          <Link to="/checkout" className="block text-white py-2">
            My Cart ({cartData.length})
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
