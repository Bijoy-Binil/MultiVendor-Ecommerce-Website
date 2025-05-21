import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext, UserContext } from "../../src/Context";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOpenSeller, setIsOpenSeller] = useState(false);
  const [isOpenAccount, setIsOpenAccount] = useState(false);

  const { cartData, totalItems } = useContext(CartContext);
  const { isLoggedIn, user } = useContext(UserContext);
  const username = user?.username;

  // Listen for cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      // Force re-render when cart is updated
      // This is handled by context now, but this ensures any custom events also trigger updates
      console.log("Cart updated");
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

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
            <NavLink to="/" label="Home" />
            <NavLink to="/categories" label="Categories" />

            {/* Vendor Panel Dropdown */}
            <Dropdown
              label="Vendor Panel"
              isOpen={isOpenSeller}
              toggle={() => setIsOpenSeller(!isOpenSeller)}
              links={[
                { to: "/seller/login", label: "Login" },
                { to: "/seller/register", label: "Register" },
                { to: "/seller/dashboard", label: "Dashboard" },
                { to: "#", label: "Logout" },
              ]}
            />

            {/* My Account Dropdown */}
            <Dropdown
              label="My Account"
              isOpen={isOpenAccount}
              toggle={() => setIsOpenAccount(!isOpenAccount)}
              links={
                isLoggedIn
                  ? [
                      { to: "/customer/dashboard", label: "Dashboard" },
                      { to: "/customer/logout", label: "Logout" },
                    ]
                  : [
                      { to: "/customer/login", label: "Login" },
                      { to: "/customer/register", label: "Register" },
                    ]
              }
            />

            <NavLink to="/checkout" label={`My Cart (${totalItems || 0})`} />

            <NavLink to="/checkout" label="New Orders (5)" />
            {username && <p className="text-white font-semibold">{username}</p>}
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
          <MobileLink to="/" label="Home" />
          <MobileLink to="/categories" label="Categories" />
          {isLoggedIn ? (
            <>
              <MobileLink to="/customer/dashboard" label="Dashboard" />
              <MobileLink to="/customer/logout" label="Logout" />
            </>
          ) : (
            <>
              <MobileLink to="/customer/login" label="Login" />
              <MobileLink to="/customer/register" label="Register" />
            </>
          )}
          <MobileLink to="/checkout" label={`My Cart (${totalItems || 0})`} />
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, label }) => (
  <Link
    to={to}
    className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
  >
    {label}
  </Link>
);

const Dropdown = ({ label, isOpen, toggle, links }) => (
  <div className="relative">
    <button
      onClick={toggle}
      className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
    >
      {label}
    </button>
    {isOpen && (
      <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
        {links.map((link, idx) => (
          <Link
            key={idx}
            to={link.to}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            {link.label}
          </Link>
        ))}
      </div>
    )}
  </div>
);

const MobileLink = ({ to, label }) => (
  <Link to={to} className="block text-white py-2">
    {label}
  </Link>
);

export default Header;
