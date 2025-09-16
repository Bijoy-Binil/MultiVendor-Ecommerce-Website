import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "./../images/logo.jpg";
import { AuthContext, CartContext } from "../AuthProvider";
import { CurrencyContext } from "../AuthProvider";

const Checkout = () => {
  const { cartData, setCartData } = useContext(CartContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [cartButtonClick, setCartButtonClick] = useState(false);
  const [products, setProducts] = useState([]);
  const { currencyData, setCurrencyData } = useContext(CurrencyContext);

  const cartRemoveButtonHandler = (product_id) => {
    let prevCart = localStorage.getItem("cartData");
    let carts = prevCart ? JSON.parse(prevCart) : [];
    let updatedCart = carts.filter((cart) => cart.product.id !== product_id);
    localStorage.setItem("cartData", JSON.stringify(updatedCart));
    setCartButtonClick(true);
  };

  // ✅ Use useEffect to sync cart after remove button click
  useEffect(() => {
    if (cartButtonClick) {
      let prevCart = localStorage.getItem("cartData");
      let carts = prevCart ? JSON.parse(prevCart) : [];
      setCartData(carts);
      setCartButtonClick(false);
    }
  }, [cartButtonClick, setCartData]);

  let sum = 0;
  cartData.map((item) => {
    if (currencyData === "inr" || currencyData === undefined) {
      sum += parseFloat(item.product.price) * (item.qty || 1);
    } else if (currencyData === "usd") {
      sum += parseFloat(item.product.usd_price) * (item.qty || 1);
    }
  });
  return (
    <div className="container mt-4">
      <h3 className="mb-4">All Items {cartData.length}</h3>
      <div className="row">
        <div className="col-12">
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th className="text-center">#</th>
                  <th>Product</th>
                  <th className="text-end">Price</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartData.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center">{index + 1}</td>
                    <td>
                      <Link className="d-flex align-items-center text-decoration-none text-dark">
                        <img
                          src={item.product.image}
                          className="img-fluid rounded me-3"
                          style={{ width: "80px", height: "80px", objectFit: "cover" }}
                          alt="Product"
                        />
                        <p className="mb-0">{item.product.title}</p>
                      </Link>
                    </td>
                    {
                      (currencyData == "inr" || currencyData==undefined) &&   <td className="text-end">₹{item.product.price}</td>
                    }
                    {
                      (currencyData == "usd" || currencyData==undefined) &&   <td className="text-end">${item.product.usd_price}</td>
                    }
                   
                    <td className="text-center">
                      <button
                        type="button"
                        onClick={() => cartRemoveButtonHandler(item.product.id)}
                        className="btn btn-sm btn-danger rounded-pill shadow-sm mx-2"
                      >
                        <i className="fa-solid fa-cart-shopping me-2"></i>
                        Remove from cart
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th></th>
                  <th>Total</th>
                     {
                      (currencyData == "inr" || currencyData==undefined) &&   <th className="text-end">Rs. {sum}</th>
                    }
                    {
                      (currencyData == "usd" || currencyData==undefined) &&   <th className="text-end">${sum}</th>
                    }
                   
                  
                  <th></th>
                </tr>
                <tr>
                  {cartData.length === 0 ? (
                    <td colSpan="4" className="text-center">
                      <Link to="/" className="btn btn-info mx-2">
                        Home
                      </Link>
                    </td>
                  ) : (
                    <td colSpan="4" className="text-end">
                      <Link to="/categories" className="btn btn-secondary mx-2">
                        Continue Shopping
                      </Link>
                      {isLoggedIn ? (
                        <Link to="/confirm-order" className="btn btn-success mx-2">
                          Proceed to payment
                        </Link>
                      ) : (
                        <Link to="/customer/login" className="btn btn-success mx-2">
                          Proceed to payment
                        </Link>
                      )}
                    </td>
                  )}
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
