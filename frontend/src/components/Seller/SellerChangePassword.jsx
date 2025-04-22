import React from 'react'
import SellerSidebar from './SellerSidebar'

const SellerChangePassword = () => {
  return (
    <>
      {/* Sidebar (untouched) */}
      <SellerSidebar />
      <div className="max-w-7xl mx-auto mb-[50px] md:mb-[90px] md:mr-0 px-4">
        <div className="flex flex-col md:flex-row gap-6">

      {/* Main content */}
      <div className="w-full md:w-3/4 mx-auto md:mx-35 -mt-[20px]  md:-mt-[410px]">
        <form className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Edit Profile</h2>

          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
              New password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
              Confirm password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>


          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Change Password
          </button>
        </form>

        {/* Footer */}

      </div>
      </div>
      </div>
    </>
  )
}

export default SellerChangePassword
