import React from 'react';
import Sidebar from './Sidebar';

const Dashboard = () => {
  return (
    <>
      {/* Sidebar */}
      <Sidebar />

      <div className="max-w-7xl mx-auto mb-[60px] md:mb-[90px] md:mr-5 px-4">
        <div className="flex flex-col md:flex-row gap-6">

          {/* Main Content */}
          <div className="w-full md:w-3/4 mx-auto md:mx-10 -mt-[20px] md:-mt-[360px]">
            <div className="bg-white rounded shadow p-6">
              <h2 className="text-xl font-bold mb-4">Welcome, John Doe 👋</h2>
              <p className="text-gray-600 font-semibold mb-2">
                Here’s a quick overview of your recent activity:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                <div className="p-4 bg-gray-100 rounded shadow text-center">
                  <h3 className="text-lg font-semibold">Total Orders</h3>
                  <p className="text-blue-600 text-xl font-bold">5</p>
                </div>
                <div className="p-4 bg-gray-100 rounded shadow text-center">
                  <h3 className="text-lg font-semibold">Wishlist</h3>
                  <p className="text-blue-600 text-xl font-bold">8</p>
                </div>
                <div className="p-4 bg-gray-100 rounded shadow text-center">
                  <h3 className="text-lg font-semibold">Total Addresses</h3>
                  <p className="text-blue-600 text-xl font-bold">2</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Dashboard;
