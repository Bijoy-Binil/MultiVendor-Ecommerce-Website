import React from 'react'
import SellerSidebar from './SellerSidebar'

const Reports = () => {
  return (

    <div>
        <SellerSidebar/>
       
      <div className="max-w-7xl mx-auto mb-[60px] md:mb-[90px] md:mr-5 px-4">
        <div className="flex flex-col md:flex-row gap-6">

          {/* Main Content */}
          <div className="w-full md:w-3/4 mx-auto md:mx-10 -mt-[20px] md:-mt-[360px]">
            <div className="bg-white rounded shadow p-6">
    
         
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              <div className="p-4 border-1 border-gray-600 bg-gray-100 rounded shadow text-center">
                  <h3 className="text-xl mb-5
                   font-semibold">Daily Reports</h3> 
                  <a className="text-white px-3 py-1 rounded   font-semibold bg-blue-500 ">View</a>
                </div>
                <div className="p-4 border-1 border-gray-600 bg-gray-100 rounded shadow text-center">
                <h3 className="text-lg mb-5
                   font-semibold">Monthly Reports</h3> 
                  <a className="text-white px-3 py-1 rounded  font-semibold bg-blue-500 ">View</a>
                </div>
                <div className="p-4 border-1 border-gray-600 bg-gray-100 rounded shadow text-center">
                <h3 className="text-lg mb-5
                   font-semibold">Yearly Reports</h3> 
                  <a className="text-white px-3 py-1 rounded  font-semibold bg-blue-500 ">View</a>
             
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
    </div>
  )
}

export default Reports
