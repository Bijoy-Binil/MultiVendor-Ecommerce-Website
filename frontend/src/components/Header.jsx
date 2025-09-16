import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext, CartContext, CurrencyContext } from "../AuthProvider";
const Header = () => {
  const { handleLogout, isLoggedIn } = useContext(AuthContext);
  const { cartData } = useContext(CartContext);
  const { currencyData, setCurrencyData } = useContext(CurrencyContext);

  // Change Currency
  const ChangeCurrency = (e) => {
    const _currency = e.target.value;
    setCurrencyData(_currency); // updates context + localStorage (from AuthProvider)
  };



  return (
    <nav className="navbar navbar-expand-lg navbar- bg-info">
      <div className="container">
        <Link className="navbar-brand" to="/">Optimus store</Link>

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
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link active" to="/categories">Categories</Link>
            </li>

            {/* Account Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="accountDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                My Account
              </a>
              <ul
                className="dropdown-menu shadow-lg border-0 rounded-3 p-2"
                aria-labelledby="accountDropdown"
              >
                {isLoggedIn ? (
                  <>
                    <li>
                      <Link className="dropdown-item d-flex align-items-center rounded-2 py-2" to="/customer/dashboard">
                        <i className="fa fa-tachometer-alt me-2 text-warning"></i> Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item d-flex align-items-center rounded-2 py-2"
                        onClick={handleLogout}
                        to="/customer/login"
                      >
                        <i className="fa fa-sign-out-alt me-2 text-danger"></i> Logout
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </ul>
            </li>

            {/* Cart */}
            <li className="nav-item">
              <Link className="nav-link active" to="/checkout">
                My Cart {cartData?.length || 0}
              </Link>
            </li>

            {/* Seller Panel */}
            <li className="nav-item dropdown">
              {!isLoggedIn && (
                <>
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="sellerDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Seller Panel
                  </a>
                  <ul
                    className="dropdown-menu shadow-lg border-0 rounded-3 p-2"
                    aria-labelledby="sellerDropdown"
                  >
                    <li>
                      <Link className="dropdown-item d-flex align-items-center rounded-2 py-2" to="/seller/register">
                        <i className="fa fa-user-plus me-2 text-primary"></i> Register
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item d-flex align-items-center rounded-2 py-2" to="/seller/login">
                        <i className="fa fa-sign-in-alt me-2 text-success"></i> Login
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <Link className="dropdown-item d-flex align-items-center rounded-2 py-2" to="/seller/dashboard">
                        <i className="fa fa-tachometer-alt me-2 text-warning"></i> Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item d-flex align-items-center rounded-2 py-2" to="/seller/logout">
                        <i className="fa fa-sign-out-alt me-2 text-danger"></i> Logout
                      </Link>
                    </li>
                  </ul>
                </>
              )}
            </li>

            {/* New Order (example when not logged in) */}
            <li className="nav-item">
              {!isLoggedIn && (
                <Link className="nav-link active" to="/checkout">
                  New Order (4)
                </Link>
              )}
            </li>

            {/* Currency Selector */}
            <li>
              <div className="nav-link">
                <select
                  onChange={ChangeCurrency}
                  className="nav-item"
                  value={currencyData} // bound to context
                >
                  <option value="inr">INR</option>
                  <option value="usd">USD</option>
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
