import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CurrencyContext } from "../AuthProvider";
import { toast } from "react-toastify";

const SingleProduct = ({ product, handleAddToCart, handleAddToWishlist }) => {
  if (!product) return null;
  const { currencyData } = useContext(CurrencyContext);

  const handleCart = () => {
    if (handleAddToCart) handleAddToCart(product);
    toast.success(`${product.title} added to cart`);
  };

  const handleWishlist = () => {
    if (handleAddToWishlist) handleAddToWishlist(product);
    toast.info(`${product.title} added to wishlist`);
  };

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
            className="card-img-top product-img"
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

          {/* Price based on currency */}
          {currencyData !== "usd" ? (
            <h6 className="text-muted mb-3">Price: ₹{product.price}</h6>
          ) : (
            <h6 className="text-muted mb-3">Price: ${product.usd_price}</h6>
          )}

          {/* Action Buttons */}
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-sm btn-primary rounded-pill shadow-sm"
              onClick={handleCart}
            >
              <i className="fa-solid fa-cart-plus me-2"></i>Add to Cart
            </button>
            <button
              className="btn btn-sm btn-outline-danger rounded-pill shadow-sm"
              onClick={handleWishlist}
            >
              <i className="fa-solid fa-heart me-2"></i>Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
