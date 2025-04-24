import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import SingleProduct from "./SingleProduct";
const Home = () => {
  // State to track the active slide
  const baseUrl = "http://127.0.0.1:8000/api";
  const [activeSlide, setActiveSlide] = useState(0);
  const [products, SetProducts] = useState([]);

  useEffect(() => {
    FetchData(baseUrl + "/products/");
  }, []);

  const FetchData = (baseUrl) => {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => {
        SetProducts(data.results);
        SetTotalResults(data.count);
      });
  };

  // Array of slides
  const slides = [
    {
      src: "../../src/components/ExampleCarouselImage.jpg",
      label: "First Slide Label",
      text: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
      quote: "A well-known quote, contained in a blockquote element.",
      rating: [1],
      sourceTitle: "Customer Name1",
    },
    {
      src: "../../src/components/ExampleCarouselImage.jpg",
      label: "Second Slide Label",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      quote: "Another famous quote, in a blockquote.",
      rating: [1, 1],
      sourceTitle: "Customer Name2",
    },
    {
      src: "../../src/components/ExampleCarouselImage.jpg",
      label: "Third Slide Label",
      text: "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
      quote: "Here is a third famous quote.",
      rating: [1, 1, 1],
      sourceTitle: "Customer Name3",
    },
  ];

  // Automatically switch slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length); // loop through slides
    }, 5000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Function to handle click on the blockquote
  const handleQuoteClick = (index) => {
    setActiveSlide(index); // Update the active slide when the blockquote is clicked
  };

  return (
    <main className="overflow-x-hidden">
      {/* ===========================================Latest Products================================================================== */}
      <div className="container mt-5 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Latest Products
          </h1>
          <h1 className="text-md bg-black rounded-md p-2 font-semibold text-white">
            <Link to="/products">
              View All Products
              <span className="ml-2">
                <i className="fa-solid fa-arrow-right-long"></i>
              </span>
            </Link>
          </h1>
        </div>

        <div className="flex flex-wrap gap-8 justify-center">
          {products.slice(0, 4).map((product, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5">
              <SingleProduct product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* ===========================================Popular Categories================================================================= */}
      <div className="container mt-5 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl mx-22 font-semibold text-gray-900">
            Popular Categories{" "}
          </h1>
          <Link
            to="/categories"
            className="text-md mx-22 cursor-pointer   bg-black rounded-md p-2 br font-semibold text-white"
          >
            View All Categories{" "}
            <span className="ml-2 ">
              <i className="fa-solid  fa-arrow-right-long"></i>
            </span>
          </Link>
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
              </h2>{" "}
              <br />
              <h1>Products Downloads: 2345</h1>
              <div className="mt-6 flex justify-between items-center"></div>
            </div>
          </div>

          {/* <!-- Card 2 --> */}
          <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <img
              className="w-full h-64 object-cover"
              src="https://plus.unsplash.com/premium_photo-1742455147775-4f5f6c09011b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Category Title :"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Category Title :
              </h2>{" "}
              <br />
              <h1>Products Downloads: 2345</h1>
              <div className="mt-6 flex justify-between items-center"></div>
            </div>
          </div>

          {/* <!-- Card 3 --> */}
          <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <img
              className="w-full h-64 object-cover"
              src="https://plus.unsplash.com/premium_photo-1742455147775-4f5f6c09011b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Category Title :"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Category Title :
              </h2>{" "}
              <br />
              <h1>Products Downloads: 2345</h1>
              <div className="mt-6 flex justify-between items-center"></div>
            </div>
          </div>

          {/* <!-- Card 4 --> */}
          <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <img
              className="w-full h-64 object-cover"
              src="https://plus.unsplash.com/premium_photo-1742455147775-4f5f6c09011b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Category Title :"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Category Title :
              </h2>{" "}
              <br />
              <h1>Products Downloads: 2345</h1>
              <div className="mt-6 flex justify-between items-center"></div>
            </div>
          </div>
        </div>
      </div>

      {/* ===========================================Popular Products================================================================== */}

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
              <h2 className="text-2xl font-semibold text-gray-800">Title:</h2>
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
          {/* <!-- Card 2 --> */}
          <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <img
              className="w-full h-64 object-cover"
              src="https://plus.unsplash.com/premium_photo-1742455147775-4f5f6c09011b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Title:"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">Title:</h2>
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
          {/* <!-- Card 3 --> */}
          <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <img
              className="w-full h-64 object-cover"
              src="https://plus.unsplash.com/premium_photo-1742455147775-4f5f6c09011b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Title:"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">Title:</h2>
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
          {/* <!-- Card 4 --> */}
          <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <img
              className="w-full h-64 object-cover"
              src="https://plus.unsplash.com/premium_photo-1742455147775-4f5f6c09011b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Title:"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">Title:</h2>
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
        </div>
      </div>
      {/* ===========================================Popular Seller==================================================================== */}
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
              </h2>{" "}
              <br />
              <h1>
                Categories: <a href="">java</a>,<a href="">javascript</a>
              </h1>
              <div className="mt-6 flex justify-between items-center"></div>
            </div>
          </div>

          {/* <!-- Card 2 --> */}
          <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <img
              className="w-full h-64 object-cover"
              src="https://plus.unsplash.com/premium_photo-1742455147775-4f5f6c09011b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Category Title :"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Seller Name :
              </h2>{" "}
              <br />
              <h1>
                Categories: <a href="">Ruby</a>,<a href="">React</a>
              </h1>
              <div className="mt-6 flex justify-between items-center"></div>
            </div>
          </div>

          {/* <!-- Card 3 --> */}
          <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <img
              className="w-full h-64 object-cover"
              src="https://plus.unsplash.com/premium_photo-1742455147775-4f5f6c09011b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Category Title :"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Seller Name :
              </h2>{" "}
              <br />
              <h1>
                Categories: <a href="">Python</a>,<a href="">Php</a>
              </h1>
              <div className="mt-6 flex justify-between items-center"></div>
            </div>
          </div>

          {/* <!-- Card 4 --> */}
          <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <img
              className="w-full h-64 object-cover"
              src="https://plus.unsplash.com/premium_photo-1742455147775-4f5f6c09011b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Category Title :"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Seller Name :
              </h2>{" "}
              <br />
              <h1>
                Categories: <a href="">Angular</a>,<a href="">Kotlin</a>
              </h1>
              <div className="mt-6 flex justify-between items-center"></div>
            </div>
          </div>
        </div>
      </div>

      {/* ===========================================Rating And Review================================================================= */}
      <div className="container mt-5 mx-auto">
        <div className="relative w-full mx-auto mt-10 bg-black  p-2">
          {/* Carousel Container */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[100px] overflow-hidden rounded-lg">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  activeSlide === index ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* Blockquote Inside Each Slide */}
                <figure className="max-w-2xl mx-auto mt-5 ">
                  <blockquote
                    className="border-l-4  border-gray-500 pl-4 italic text-lg text-white cursor-pointer"
                    onClick={() => handleQuoteClick(index)} // Click event to switch slides
                  >
                    <p>{slide.quote}</p>
                  </blockquote>
                  <figcaption className="mt-4 text-sm text-white flex items-center gap-1">
                    {slide.rating.map((_, i) => (
                      <i
                        key={i}
                        className="fa-solid fa-star text-yellow-400"
                      ></i>
                    ))}
                    <span className="ml-2">
                      in{" "}
                      <cite className="font-semibold">{slide.sourceTitle}</cite>
                    </span>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
        </div>
      </div>
      {/* ========================Footer=========================== */}
    </main>
  );
};

export default Home;
