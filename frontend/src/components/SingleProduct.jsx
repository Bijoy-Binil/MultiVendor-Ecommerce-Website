import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const SingleProduct = ({ product }) => {
  if (!product) return null; // Or display a loading state

  return (
    <div>
      <Link to={`/productDetail/${product.slug || "placeholder"}/${product.id || 123}`}>
        <img
          className="w-full h-64 object-cover rounded-2xl"
          src={product.image}
          alt={`Title: ${product.title}`}
        />
      </Link>
      <div className="p-6">
        <Link to={`/productDetail/${product.slug || "placeholder"}/${product.id || 123}`}>
          <h2 className="text-2xl font-semibold text-gray-800">
            Title: {product.title}
          </h2>
        </Link>
        <p className="text-gray-600 mt-2 text-sm">Price: {product.price}</p>
        <div className="mt-5 ml-7 flex justify-between items-center">
          <button className="px-4 py-2 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 ease-in-out focus:outline-none">
            <i className="fa-solid fa-cart-plus mr-2"></i>
          </button>
          <button className="px-4 flex justify-center items-center mr-38 py-2.5 text-xs bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200 ease-in-out focus:outline-none">
            <i className="fa-solid fa-heart mr-2"></i>
          </button>
        </div>
      </div>
    </div>
  );
};


export default SingleProduct;
