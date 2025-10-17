import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext, CartContext, CurrencyContext } from "../AuthProvider";
const Header = () => {
  const { 
    handleLogout, isLoggedIn, customerName, customerId,
    handleVendorLogout, isVendorLoggedIn, vendorName, vendorId 
  } = useContext(AuthContext);
  const { cartData } = useContext(CartContext);
  const { currencyData, setCurrencyData } = useContext(CurrencyContext);

  // Change Currency
  const ChangeCurrency = (e) => {
    const _currency = e.target.value;
    setCurrencyData(_currency); // updates context + localStorage (from AuthProvider)
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <i className="fa fa-store me-2"></i>Optimus Store
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="fa fa-home me-1"></i>Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/categories">
                <i className="fa fa-th-large me-1"></i>Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                <i className="fa fa-box me-1"></i>All Products
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav">
            {/* Cart - Always visible for customers */}
            {!isVendorLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link position-relative" to="/checkout">
                  <i className="fa fa-shopping-cart me-1"></i>
                  Cart 
                  {cartData?.length > 0 && (
                    <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                      {cartData.length}
                    </span>
                  )}
                </Link>
              </li>
            )}

            {/* Customer Section */}
            {isLoggedIn && !isVendorLoggedIn && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  href="#"
                  id="customerDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fa fa-user-circle me-2"></i>
                  {customerName || 'My Account'}
                </a>
                <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-3 p-2" aria-labelledby="customerDropdown">
                  <li>
                    <Link className="dropdown-item d-flex align-items-center rounded-2 py-2" to="/customer/dashboard">
                      <i className="fa fa-tachometer-alt me-2 text-primary"></i> Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item d-flex align-items-center rounded-2 py-2" to="/customer/orders">
                      <i className="fa fa-shopping-bag me-2 text-info"></i> My Orders
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item d-flex align-items-center rounded-2 py-2" to="/customer/wishlist">
                      <i className="fa fa-heart me-2 text-danger"></i> Wishlist
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item d-flex align-items-center rounded-2 py-2" to="/customer/profile">
                      <i className="fa fa-user me-2 text-secondary"></i> Profile
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <Link
                      className="dropdown-item d-flex align-items-center rounded-2 py-2"
                      onClick={handleLogout}
                      to="/customer/login"
                    >
                      <i className="fa fa-sign-out-alt me-2 text-danger"></i> Logout
                    </Link>
                  </li>
                </ul>
              </li>
            )}

            {/* Vendor Section */}
            {isVendorLoggedIn && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  href="#"
                  id="vendorDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fa fa-store me-2"></i>
                  {vendorName || 'Vendor Panel'}
                </a>
                <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-3 p-2" aria-labelledby="vendorDropdown">
                  <li>
                    <Link className="dropdown-item d-flex align-items-center rounded-2 py-2" to="/seller/dashboard">
                      <i className="fa fa-tachometer-alt me-2 text-primary"></i> Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item d-flex align-items-center rounded-2 py-2" to="/seller/products">
                      <i className="fa fa-box me-2 text-success"></i> My Products
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item d-flex align-items-center rounded-2 py-2" to="/seller/orders">
                      <i className="fa fa-shopping-cart me-2 text-info"></i> Orders
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item d-flex align-items-center rounded-2 py-2" to="/seller/customers">
                      <i className="fa fa-users me-2 text-warning"></i> Customers
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item d-flex align-items-center rounded-2 py-2" to="/seller/reports">
                      <i className="fa fa-chart-bar me-2 text-info"></i> Reports
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item d-flex align-items-center rounded-2 py-2" to="/seller/profile">
                      <i className="fa fa-user me-2 text-secondary"></i> Profile
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <Link
                      className="dropdown-item d-flex align-items-center rounded-2 py-2"
                      onClick={handleVendorLogout}
                      to="/seller/login"
                    >
                      <i className="fa fa-sign-out-alt me-2 text-danger"></i> Logout
                    </Link>
                  </li>
                </ul>
              </li>
            )}

            {/* Guest User Section */}
            {!isLoggedIn && !isVendorLoggedIn && (
              <>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="guestDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa fa-user me-1"></i>Account
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-3 p-2" aria-labelledby="guestDropdown">
                    <li>
                      <Link className="dropdown-item d-flex align-items-center rounded-2 py-2" to="/customer/register">
                        <i className="fa fa-user-plus me-2 text-primary"></i> Register
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item d-flex align-items-center rounded-2 py-2" to="/customer/login">
                        <i className="fa fa-sign-in-alt me-2 text-success"></i> Login
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="sellerDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa fa-store me-1"></i>Seller
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-3 p-2" aria-labelledby="sellerDropdown">
                    <li>
                      <Link className="dropdown-item d-flex align-items-center rounded-2 py-2" to="/seller/register">
                        <i className="fa fa-user-plus me-2 text-primary"></i> Register as Seller
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item d-flex align-items-center rounded-2 py-2" to="/seller/login">
                        <i className="fa fa-sign-in-alt me-2 text-success"></i> Seller Login
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            )}

            {/* Currency Selector */}
            <li className="nav-item">
              <div className="nav-link">
                <select
                  onChange={ChangeCurrency}
                  className="form-select form-select-sm"
                  value={currencyData}
                  style={{minWidth: '80px'}}
                >
                  <option value="inr">₹ INR</option>
                  <option value="usd">$ USD</option>
                </select>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
