import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";

function App() {

  return (
    <>
  <Header />
      {/* ===========================================Latest Products============================================================= */}

      <div className="container mt-5 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl mx-22 font-semibold text-gray-900">
            Latest Products{" "}
          </h1>
          <h1 className="text-md mx-22 bg-black rounded-md p-2 br font-semibold text-white">
            View All Products{" "}
            <span className="ml-2 ">
              <i className="fa-solid  fa-arrow-right-long"></i>
            </span>
          </h1>
        </div>

        <div className="flex flex-wrap gap-8 justify-center">
          {/* <!-- Card 1 --> */}
          <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <img
              className="w-full h-64 object-cover"
              src="https://plus.unsplash.com/premium_photo-1742455147775-4f5f6c09011b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Title:"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Title:
              </h2>
              <p className="text-gray-600 mt-2 text-sm">
               Price: 
              </p>
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
          {/* <!-- Card 2 --> */}
          <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <img
              className="w-full h-64 object-cover"
              src="https://plus.unsplash.com/premium_photo-1742455147775-4f5f6c09011b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Title:"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Title:
              </h2>
              <p className="text-gray-600 mt-2 text-sm">
               Price: 
              </p>
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
          {/* <!-- Card 3 --> */}
          <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <img
              className="w-full h-64 object-cover"
              src="https://plus.unsplash.com/premium_photo-1742455147775-4f5f6c09011b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Title:"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Title:
              </h2>
              <p className="text-gray-600 mt-2 text-sm">
               Price: 
              </p>
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
          {/* <!-- Card 4 --> */}
          <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <img
              className="w-full h-64 object-cover"
              src="https://plus.unsplash.com/premium_photo-1742455147775-4f5f6c09011b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Title:"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Title:
              </h2>
              <p className="text-gray-600 mt-2 text-sm">
               Price: 
              </p>
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
          {/* <!-- Card 5 --> */}
          <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <img
              className="w-full h-64 object-cover"
              src="https://plus.unsplash.com/premium_photo-1742455147775-4f5f6c09011b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Title:"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Title:
              </h2>
              <p className="text-gray-600 mt-2 text-sm">
               Price: 
              </p>
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
          {/* <!-- Card 6 --> */}
          <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <img
              className="w-full h-64 object-cover"
              src="https://plus.unsplash.com/premium_photo-1742455147775-4f5f6c09011b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Title:"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Title:
              </h2>
              <p className="text-gray-600 mt-2 text-sm">
               Price: 
              </p>
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
          {/* <!-- Card 8 --> */}
          <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <img
              className="w-full h-64 object-cover"
              src="https://plus.unsplash.com/premium_photo-1742455147775-4f5f6c09011b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Title:"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Title:
              </h2>
              <p className="text-gray-600 mt-2 text-sm">
               Price: 
              </p>
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
          {/* <!-- Card 8 --> */}
          <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <img
              className="w-full h-64 object-cover"
              src="https://plus.unsplash.com/premium_photo-1742455147775-4f5f6c09011b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Title:"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Title:
              </h2>
              <p className="text-gray-600 mt-2 text-sm">
               Price: 
              </p>
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

          {/* Add more cards as needed */}
        </div>
      </div>


      {/* ===========================================Popular Categories============================================================ */}
      <div className="container mt-5 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl mx-22 font-semibold text-gray-900">
          Popular Categories{" "}
          </h1>
          <h1 className="text-md mx-22  bg-black rounded-md p-2 br font-semibold text-white">
            View All Categories{" "}
            <span className="ml-2 ">
              <i className="fa-solid  fa-arrow-right-long"></i>
            </span>
          </h1>
        </div>

        <div className="flex flex-wrap gap-6 justify-center">
          {/* <!-- Card 1 --> */}
          <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <img
              className="w-full h-64 object-cover"
              src="https://plus.unsplash.com/premium_photo-1742455147775-4f5f6c09011b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Category Title :"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Category Title :
              </h2> <br />
              <h1>Products Downloads: 2345</h1>
              <div className="mt-6 flex justify-between items-center">
             
              </div>
            </div>
          </div>
    
    
         {/* <!-- Card 1 --> */}
         <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <img
              className="w-full h-64 object-cover"
              src="https://plus.unsplash.com/premium_photo-1742455147775-4f5f6c09011b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Category Title :"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Category Title :
              </h2> <br />
              <h1>Products Downloads: 2345</h1>
              <div className="mt-6 flex justify-between items-center">
             
              </div>
            </div>
          </div>
    
    
         {/* <!-- Card 1 --> */}
         <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <img
              className="w-full h-64 object-cover"
              src="https://plus.unsplash.com/premium_photo-1742455147775-4f5f6c09011b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Category Title :"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Category Title :
              </h2> <br />
              <h1>Products Downloads: 2345</h1>
              <div className="mt-6 flex justify-between items-center">
             
              </div>
            </div>
          </div>
    
          {/* <!-- Card 1 --> */}
          <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <img
              className="w-full h-64 object-cover"
              src="https://plus.unsplash.com/premium_photo-1742455147775-4f5f6c09011b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Category Title :"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Category Title :
              </h2> <br />
              <h1>Products Downloads: 2345</h1>
              <div className="mt-6 flex justify-between items-center">
             
              </div>
            </div>
          </div>
    

   
          {/* Add more cards as needed */}
        </div>
      </div>

       {/* ===========================================Popular Products============================================================= */}

       <div className="container mt-5 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl mx-22 font-semibold text-gray-900">
            Popular Products{" "}
          </h1>
          <h1 className="text-md mx-22 bg-black rounded-md p-2 br font-semibold text-white">
            View All Popular Products{" "}
            <span className="ml-2 ">
              <i className="fa-solid  fa-arrow-right-long"></i>
            </span>
          </h1>
        </div>

        <div className="flex flex-wrap gap-8 justify-center">
          {/* <!-- Card 1 --> */}
          <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <img
              className="w-full h-64 object-cover"
              src="https://plus.unsplash.com/premium_photo-1742455147775-4f5f6c09011b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Title:"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Title:
              </h2>
              <p className="text-gray-600 mt-2 text-sm">
               Price: 
              </p>
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
          {/* <!-- Card 2 --> */}
          <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <img
              className="w-full h-64 object-cover"
              src="https://plus.unsplash.com/premium_photo-1742455147775-4f5f6c09011b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Title:"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Title:
              </h2>
              <p className="text-gray-600 mt-2 text-sm">
               Price: 
              </p>
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
          {/* <!-- Card 3 --> */}
          <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <img
              className="w-full h-64 object-cover"
              src="https://plus.unsplash.com/premium_photo-1742455147775-4f5f6c09011b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Title:"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Title:
              </h2>
              <p className="text-gray-600 mt-2 text-sm">
               Price: 
              </p>
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
          {/* <!-- Card 4 --> */}
          <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <img
              className="w-full h-64 object-cover"
              src="https://plus.unsplash.com/premium_photo-1742455147775-4f5f6c09011b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Title:"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Title:
              </h2>
              <p className="text-gray-600 mt-2 text-sm">
               Price: 
              </p>
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

          {/* Add more cards as needed */}
        </div>
      </div>
  {/* ===========================================Popular Seller============================================================ */}
  <div className="container mt-5 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl mx-22 font-semibold text-gray-900">
          Popular Seller{" "}
          </h1>
          <h1 className="text-md mx-22  bg-black rounded-md p-2 br font-semibold text-white">
            View All Seller{" "}
            <span className="ml-2 ">
              <i className="fa-solid  fa-arrow-right-long"></i>
            </span>
          </h1>
        </div>

        <div className="flex flex-wrap gap-6 justify-center">
          {/* <!-- Card 1 --> */}
          <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <img
              className="w-full h-64 object-cover"
              src="https://plus.unsplash.com/premium_photo-1742455147775-4f5f6c09011b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Category Title :"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Seller Name :
              </h2> <br />
              <h1>Categories: <a href="">java</a>,<a href="">javascript</a></h1>
              <div className="mt-6 flex justify-between items-center">
             
              </div>
            </div>
          </div>
    
    
         {/* <!-- Card 1 --> */}
         <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <img
              className="w-full h-64 object-cover"
              src="https://plus.unsplash.com/premium_photo-1742455147775-4f5f6c09011b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Category Title :"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">
              Seller Name :
              </h2> <br />
              <h1>Categories: <a href="">Ruby</a>,<a href="">React</a></h1>
              <div className="mt-6 flex justify-between items-center">
             
              </div>
            </div>
          </div>
    
    
         {/* <!-- Card 1 --> */}
         <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <img
              className="w-full h-64 object-cover"
              src="https://plus.unsplash.com/premium_photo-1742455147775-4f5f6c09011b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Category Title :"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">
              Seller Name :
              </h2> <br />
              <h1>Categories: <a href="">Python</a>,<a href="">Php</a></h1>
              <div className="mt-6 flex justify-between items-center">
             
              </div>
            </div>
          </div>
    
          {/* <!-- Card 1 --> */}
          <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <img
              className="w-full h-64 object-cover"
              src="https://plus.unsplash.com/premium_photo-1742455147775-4f5f6c09011b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Category Title :"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">
              Seller Name :
              </h2> <br />
              <h1>Categories: <a href="">Angular</a>,<a href="">Kotlin</a></h1>
              <div className="mt-6 flex justify-between items-center">
             
              </div>
            </div>
          </div>
    

   
          {/* Add more cards as needed */}
        </div>
      </div>
    </>
  );
}

export default App;
