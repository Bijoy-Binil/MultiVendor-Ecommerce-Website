import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CurrencyContext, AuthContext, CartContext } from "../AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";

const SingleProduct = ({ product }) => {
  const { currencyData } = useContext(CurrencyContext);
  const { isLoggedIn, customerId } = useContext(AuthContext);
  const { cartData, setCartData } = useContext(CartContext);

  const [inCart, setInCart] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);

  const wishlistUrl = "http://127.0.0.1:8000/api/wishlists/";
  const checkWishlistUrl = "http://127.0.0.1:8000/api/check-in-wishlists/";

  // -------------------------
  // ✅ Check Cart and Wishlist on Load
  // -------------------------
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cartData")) || [];
    const exists = cart.some((item) => item.product.id === product.id);
    setInCart(exists);

    if (isLoggedIn && customerId) {
      checkWishListData();
    }
  }, [product.id, isLoggedIn, customerId]);

  // -------------------------
  // ✅ Add to Cart
  // -------------------------
  const handleAddToCart = () => {
    let prevCart = JSON.parse(localStorage.getItem("cartData")) || [];

    // Prevent duplicate cart items
    if (prevCart.some((item) => item.product.id === product.id)) {
      toast.info(`${product.title} is already in cart`);
      return;
    }

    const cartItem = {
      product: {
        id: product.id,
        title: product.title,
        price: product.price,
        usd_price: product.usd_price,
        image: product.image,
      },
      total_amount: product.price,
    };

    prevCart.push(cartItem);
    localStorage.setItem("cartData", JSON.stringify(prevCart));
    setCartData(prevCart);
    setInCart(true);
    toast.success(`${product.title} added to cart`);
  };

  // -------------------------
  // ✅ Remove from Cart
  // -------------------------
  const handleRemoveFromCart = () => {
    let prevCart = JSON.parse(localStorage.getItem("cartData")) || [];
    const updated = prevCart.filter((item) => item.product.id !== product.id);
    localStorage.setItem("cartData", JSON.stringify(updated));
    setCartData(updated);
    setInCart(false);
    toast.error(`${product.title} removed from cart`);
  };

  // -------------------------
  // ✅ Add to Wishlist
  // -------------------------
  const handleAddToWishlist = async () => {
    if (!isLoggedIn) {
      toast.warning("Please login to add to wishlist");
      return;
    }

    try {
      const res = await axios.post(wishlistUrl, {
        customer: customerId,
        product: product.id,
      });
      if (res.data.id) {
        setInWishlist(true);
        toast.success(`${product.title} added to wishlist`);
      }
    } catch (err) {
      console.error("Wishlist Error:", err);
      toast.error("Error adding to wishlist");
    }
  };

  // -------------------------
  // ✅ Check if in Wishlist
  // -------------------------
  const checkWishListData = async () => {
    try {
      const res = await axios.get(checkWishlistUrl, {
        params: { customer: customerId, product: product.id },
      });
      setInWishlist(res.data.bool === true);
    } catch (err) {
      console.error("Wishlist check failed:", err);
    }
  };

  // -------------------------
  // ✅ JSX UI
  // -------------------------
  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
      <div
        className="card h-100 shadow-sm border-0"
        style={{
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          cursor: "pointer",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
        }}
      >
        {/* Product Image */}
        <Link to={`/product/${product.slug}/${product.id}`}>
          <img
            src={product.image}
            alt={product.title}
            className="card-img-top"
            style={{ height: "220px", objectFit: "cover" }}
          />
        </Link>

        {/* Product Body */}
        <div className="card-body">
          <Link
            to={`/product/${product.slug}/${product.id}`}
            className="text-decoration-none text-dark"
          >
            <h6 className="fw-bold">{product.title}</h6>
          </Link>

          {/* Price */}
          {currencyData === "usd" ? (
            <h6 className="text-muted mb-3">Price: ${product.usd_price}</h6>
          ) : (
            <h6 className="text-muted mb-3">Price: ₹{product.price}</h6>
          )}

          {/* Buttons */}
          <div className="d-flex justify-content-between">
            {!inCart ? (
              <button
                className="btn btn-sm btn-primary rounded-pill shadow-sm"
                onClick={handleAddToCart}
              >
                <i className="fa-solid fa-cart-plus me-2"></i>Add
              </button>
            ) : (
              <button
                className="btn btn-sm btn-danger rounded-pill shadow-sm"
                onClick={handleRemoveFromCart}
              >
                <i className="fa-solid fa-trash me-2"></i>Remove
              </button>
            )}

            {inWishlist ? (
              <button
                className="btn btn-sm btn-secondary rounded-pill shadow-sm"
                disabled
              >
                <i className="fa-solid fa-heart me-2"></i>In Wishlist
              </button>
            ) : (
              <button
                className="btn btn-sm btn-outline-danger rounded-pill shadow-sm"
                onClick={handleAddToWishlist}
              >
                <i className="fa-solid fa-heart me-2"></i>Wishlist
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
