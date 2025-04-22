import React from 'react'
import SellerSidebar from './SellerSidebar'

const AddProducts = () => {
  return (
    <>
      {/* Sidebar (unchanged) */}
      <SellerSidebar />
      <div className="max-w-7xl mx-auto mb-[50px] md:mb-[90px] md:mr-0 px-4">
        <div className="flex flex-col md:flex-row gap-6">

          {/* Main content */}
          <div className="w-full md:w-3/4 mx-auto md:mx-35 -mt-[20px] md:-mt-[410px]">
            <form className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Products</h2>

              {/* Title */}
              <div className="mb-5">
                <label htmlFor="title" className="block mb-2 text-sm font-semibold text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                  placeholder="Enter product title"
                  required
                />
              </div>

              {/* Category */}
              <div className="mb-5">
                <label htmlFor="category" className="block mb-2 text-sm font-semibold text-gray-700">
                  Category
                </label>
                <select
                  className="w-full mb-3 p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                  id="category-select"
                >
                  <option value="">Python</option>
                  <option value="">PHP</option>
                  <option value="">JavaScript</option>
                  <option value="">Java</option>
                </select>
                <input
                  type="text"
                  id="category"
                  className="w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                  placeholder="Enter category"
                  required
                />
              </div>

              {/* Price */}
              <div className="mb-5">
                <label htmlFor="price" className="block mb-2 text-sm font-semibold text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  className="w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                  placeholder="Enter price"
                  required
                />
              </div>

              {/* Description */}
              <div className="mb-5">
                <label htmlFor="description" className="block mb-2 text-sm font-semibold text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  className="w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                  rows="4"
                  placeholder="Write product description"
                  required
                ></textarea>
              </div>

              {/* Product Images */}
              <div className="mb-5">
                <label htmlFor="productImages" className="block mb-2 text-sm font-semibold text-gray-700">
                  Product Images
                </label>
                <input
                  type="file"
                  id="productImages"
                  className="w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-sm transition"
              >
                Submit Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddProducts
