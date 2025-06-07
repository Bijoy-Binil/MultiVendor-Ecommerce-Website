import React from "react";
import { Link } from "react-router-dom";

const SingleProduct = ({ product }) => {
  if (!product) return null; // Could show a skeleton/loading component

  return (
    <div className="rounded-2xl mx-10 shadow-md overflow-hidden bg-white">
      <Link to={`/productDetail/${product.slug}/${product.id}`}>
        <img
          className="w-full h-64 object-cover"
          src={ product.image}
          alt={product.title}
        />
      </Link>
      <div className="p-4">
        <Link to={`/productDetail/${product.slug}/${product.id}`}>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            {product.title}
          </h2>
        </Link>
        <p className="text-gray-600 text-sm mb-4">Price: ${product.price}</p>
        <div className="flex justify-between">
          <button
            aria-label="Add to Cart"
            className="px-2 py-2 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            <i className="fa-solid fa-cart-plus mr-2"></i>Add to Cart
          </button>
          <button
            aria-label="Add to Wishlist"
            className="px-4 py-2 text-xs bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            <i className="fa-solid fa-heart mr-2"></i>Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
