import React from 'react'
import { Link } from 'react-router-dom'
const SingleProduct = ({title}) => {
  return (
    <div>
           {/* <!-- Card 1 --> */}
         
           <Link to="/productDetail/python-timer/123"> <img
              className="w-full h-64 object-cover"
              src="https://plus.unsplash.com/premium_photo-1742455147775-4f5f6c09011b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Title:" 
            /></Link>
            <div className="p-6">
            <Link to="/productDetail/python-timer/123"><h2 className="text-2xl font-semibold text-gray-800">Title: {title}</h2></Link>
              <p className="text-gray-600 mt-2 text-sm">Price:</p>
              <div className="mt-6 flex justify-between items-center">
                <button className="px-4 py-2 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 ease-in-out focus:outline-none">
                  <i className="fa-solid fa-cart-plus mr-2"></i>Buy Now
                </button>
                <button className="px-4 py-2 text-xs bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200 ease-in-out focus:outline-none">
                  <i className="fa-solid fa-heart mr-2"></i>Add to Wishlist
                </button>
              </div>
            </div>
      

    </div>
  )
}

export default SingleProduct