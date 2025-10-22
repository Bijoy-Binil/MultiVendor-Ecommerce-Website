import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext, CartContext, CurrencyContext } from "../AuthProvider";
import axios from "axios";

const SingleProduct = () => {
  const { id } = useParams();
  const { currencyData } = useContext(CurrencyContext);
  const { cartData, setCartData } = useContext(CartContext);
  const { isLoggedIn, customerId } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [cartButtonClick, setCartButtonClick] = useState(false);
  const [productInWishlist, setProductInWishlist] = useState(false);

  const baseUrl = "http://127.0.0.1:8000/api/products/";
  const wishlistCheckUrl = "http://127.0.0.1:8000/api/check-in-wishlists/";
  const toggleWishlistUrl = "http://127.0.0.1:8000/api/toggle-wishlist/";

  // Auth header
  const getAuthConfig = () => {
    const token = localStorage.getItem("access") || localStorage.getItem("access_token");
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  };

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${baseUrl}${id}/`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
    checkCart();
    if (isLoggedIn) checkWishlist();
  }, [id, isLoggedIn]);

  // Check if product is in cart
  const checkCart = () => {
    const prevCart = JSON.parse(localStorage.getItem("cartData") || "[]");
    const inCart = prevCart.some(item => item.product.id === parseInt(id));
    setCartButtonClick(inCart);
  };

  // Check wishlist status
  const checkWishlist = async () => {
    try {
      const res = await axios.get(wishlistCheckUrl, {
        params: { customer: customerId, product: id },
      });
      setProductInWishlist(res.data.bool);
    } catch (err) {
      console.error("Error checking wishlist:", err);
    }
  };

  // Add to cart
  const addToCart = () => {
    if (!product) return;
    const cartItem = {
      product: {
        id: product.id,
        title: product.title,
        price: product.price,
        usd_price: product.usd_price,
        image: product.image,
      },
      user: { id: customerId || 1 },
      total_amount: product.price,
    };
    const prevCart = JSON.parse(localStorage.getItem("cartData") || "[]");
    prevCart.push(cartItem);
    localStorage.setItem("cartData", JSON.stringify(prevCart));
    setCartData(prevCart);
    setCartButtonClick(true);
  };

  const removeFromCart = () => {
    const prevCart = JSON.parse(localStorage.getItem("cartData") || "[]");
    const updatedCart = prevCart.filter(c => c.product.id !== product.id);
    localStorage.setItem("cartData", JSON.stringify(updatedCart));
    setCartData(updatedCart);
    setCartButtonClick(false);
  };

  // Toggle wishlist
  const toggleWishList = async () => {
    if (!isLoggedIn) return alert("Please log in to manage wishlist");
    try {
      const formData = new FormData();
      formData.append("customer", customerId);
      formData.append("product", id);

      const res = await axios.post(toggleWishlistUrl, formData, getAuthConfig());
      setProductInWishlist(res.data.bool);
    } catch (err) {
      console.error("Error toggling wishlist:", err);
    }
  };

  if (!product) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row g-4">
        <div className="col-md-5">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid rounded shadow-sm"
            style={{ objectFit: "cover", height: "400px", width: "100%" }}
          />
        </div>
        <div className="col-md-7">
          <h2 className="fw-bold">{product.title}</h2>
          <p className="text-muted mb-3">{product.description}</p>
          <h4 className="text-primary fw-bold mb-4">
            {currencyData === "usd" ? `$ ${product.usd_price}` : `₹ ${product.price}`}
          </h4>

          <div className="d-flex gap-3">
            {!cartButtonClick ? (
              <button onClick={addToCart} className="btn btn-primary px-4">
                Add to Cart
              </button>
            ) : (
              <button onClick={removeFromCart} className="btn btn-danger px-4">
                Remove from Cart
              </button>
            )}

            {isLoggedIn ? (
              <button
                onClick={toggleWishList}
                className={`btn px-4 ${productInWishlist ? "btn-danger" : "btn-outline-danger"}`}
              >
                {productInWishlist ? "Remove Wishlist ❤️" : "Add to Wishlist 🤍"}
              </button>
            ) : (
              <button disabled className="btn btn-outline-secondary px-4">
                Login to Wishlist
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
