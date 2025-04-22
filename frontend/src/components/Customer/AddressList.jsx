import React from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

const AddressList = () => {
  return (
    <>
      <Sidebar />

      <div className="max-w-7xl mx-auto my-2 px-4 mt-8 mb-20 md:mb-[90px] md:mt-[-370px] md:mr-5 md:mx-[650px]">
        <div className="flex justify-end  mb-[-30px]">
        </div>
          <div>
            <Link to="/customer/add-address" className="bg-white flex justify-self-end cursor-pointer border my-2 border-green-400 text-green-500 hover:bg-green-500 hover:text-white px-4 py-2 rounded-xl transition"><i className="fa fa-plus-circle flex justify-self-start mr-1 mt-1"></i> Add Address
           </Link>
          </div>

        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Example Address Card */}
          <div className="border border-gray-300 bg-gray-700 text-white rounded-xl p-4 shadow space-y-2">
            <h6 className="text-sm font-semibold">
              <i className="fa fa-check-circle text-green-400 mr-2"></i>
              st-2, NewKrishna Nagar, Punjab, India
            </h6>
          </div>

          {[...Array(5)].map((_, i) => (
            <div key={i} className="border border-gray-300 rounded-xl p-4 shadow space-y-2">
              <span className="inline-block text-sm bg-black text-white px-3 py-1 rounded-2xl font-semibold">
                Make Default
              </span>
              <h6 className="text-sm font-semibold">
                st-2, NewKrishna Nagar, Punjab, India
              </h6>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AddressList;
