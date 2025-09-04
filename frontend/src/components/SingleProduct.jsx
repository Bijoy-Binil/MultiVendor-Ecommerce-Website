import React from "react";
import { Link } from "react-router-dom";

const SingleProduct = ({ product }) => {
  if (!product) return null;

  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
      <div className="card h-100 shadow-sm border-0">
        {/* Product Image */}
        <Link to={`/product/${product.slug}/${product.id}`}>
        {console.log("slug,id==>",product.title,product.id) }
          <img
            src={product.image}
            className="card-img-top"
            alt={product.title}
            style={{ height: "200px", objectFit: "cover" }}
          />
        </Link>

        {/* Product Body */}
        <div className="card-body">
          <Link
            to={`/product/${product.title}/${product.id}`}
            className="text-decoration-none text-dark"
          >
            <h5 className="card-title fw-bold">{product.title}</h5>
          </Link>
          <p className="card-text text-muted small mb-3">
            Price: ${product.price}
          </p>

          {/* Action Buttons */}
          <div className="d-flex justify-content-between">
            <button
              aria-label="Add to Cart"
              className="btn btn-sm btn-primary rounded-pill shadow-sm"
            >
              <i className="fa-solid fa-cart-plus me-2"></i>Add to Cart
            </button>
            <button
              aria-label="Add to Wishlist"
              className="btn btn-sm btn-outline-danger rounded-pill shadow-sm"
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
