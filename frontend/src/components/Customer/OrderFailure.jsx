import React from 'react'
import { Link } from 'react-router-dom'
import { FaTimesCircle } from 'react-icons/fa'

const OrderFailure = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center animate-fade-in">
        <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-red-600 mb-2">Order Failed!</h2>
        <p className="text-gray-600 mb-6">Oops! Something went wrong. Please try again later.</p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-500 transition duration-300"
          >
            Go to Home
          </Link>
          <Link
            to="/customer/dashboard"
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-500 transition duration-300"
          >
            View Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderFailure
