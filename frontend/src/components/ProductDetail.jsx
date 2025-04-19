import React from "react";
import { Link } from "react-router-dom";
const ProductDetail = () => {
  return (
    <div className="p-4">
        
    <section className="max-w-6xl mx-auto mt-5">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image section */}
        <div className="w-full md:w-1/3">
          <img
            className="w-full h-64 object-cover rounded-lg"
            src="https://plus.unsplash.com/premium_photo-1742455147775-4f5f6c09011b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Product"
          />
        </div>

        {/* Text content */}
        <div className="w-full md:w-2/3 flex flex-col justify-center">
          <h3 className="text-2xl font-semibold mb-2">Product Title</h3>
          <p className="text-gray-700 text-xl mt-1 font-semibold">Product Description goes here. You can describe features, specifications, or any other relevant information.</p>
          <h5 className="text-xl  mt-1 font-medium  text-gray-500">Price: Rs 500</h5>
          <p className="mt-5 pb-3.5 ">
          <button className="mx-5  px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 ease-in-out focus:outline-none">
          <i class="fa-solid fa-bag-shopping"></i> <span className="ml-1">Buy Now</span>
              </button>
              <button className="px-4 text-sm py-2  bg-red-500 text-white rounded-md hover:bg-indigo-500 transition duration-200 ease-in-out focus:outline-none">
                <i className="fa-solid fa-heart mr-2"></i>Add to Wishlist
              </button>
              <button className="px-4 text-sm ml-5 py-2  bg-indigo-500 text-white rounded-md hover:bg-red-600 transition duration-200 ease-in-out focus:outline-none">
              <i className="fa-solid fa-cart-plus mr-2"></i>Add to Cart
              </button>
          </p>
          <div className="productstags">
         <h5 className="text-xl font-medium">Tags</h5>
          <p className="mt-2  ">
            <Link className="ml-2 font  text-sm bg-gray-400 rounded-xl p-1.5 pt-1 pb-1 underline"  to="#">Python</Link>,
            <Link className="ml-2 font  text-sm bg-gray-400 rounded-xl p-1.5 pt-1 pb-1 underline"  to="#">Django</Link>,
            <Link className="ml-2 font  text-sm bg-gray-400 rounded-xl p-1.5 pt-1 pb-1 underline"  to="#">Web Scripts</Link>
            <Link className="ml-2 font  text-sm bg-gray-400 rounded-xl p-1.5 pt-1 pb-1 underline"  to="#">Python</Link>,
            <Link className="ml-2 font  text-sm bg-gray-400 rounded-xl p-1.5 pt-1 pb-1 underline"  to="#">Django</Link>,
            <Link className="ml-2 font  text-sm bg-gray-400 rounded-xl p-1.5 pt-1 pb-1 underline"  to="#">Web Scripts</Link>
          </p>
          </div>
        </div>
      </div>
    </section>
  </div>
  
  );
};

export default ProductDetail;
