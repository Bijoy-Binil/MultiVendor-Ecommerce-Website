import React, { useEffect, useState } from "react";
import SingleProduct from "./SingleProduct";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const baseUrl = "http://127.0.0.1:8000/api";
  const [products, SetProducts] = useState([]);
  const [totalResults, SetTotalResults] = useState(0);

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

  function ChangeUrl(Url) {
    FetchData(Url);
  }
  console.log(products);

  var links = [];
  var limit = 3;
  var totalLinks = totalResults / limit;

  for (let i = 1; i <= totalLinks; i++) {
    links.push(
      <li key={i}>
        <Link
          to={`/products/?page=${i}`}
          onClick={() => ChangeUrl(baseUrl + `/products/?page=${i}`)}
          className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          {i}
          {console.log(i)}
        </Link>
      </li>
    );
  }

  return (
    <div>
      {/* ===========================================Latest Products================================================================== */}
      <div className="container mt-5 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl mx-22 font-semibold text-gray-900">
            <span className="text-red-500 text-2x">All</span> Products
          </h1>
        </div>

        <div className="flex flex-wrap gap-8 justify-center">
          {products.map((product, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5">
              <SingleProduct product={product} />
            </div>
          ))}
        </div>
      </div>

      {/*===================================================Pagination======================================================= */}
      <nav aria-label="Page navigation example">
        <ul className="flex justify-center items-center mt-25 -space-x-px text-base h-10">
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </a>
          </li>
          {links}
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AllProducts;
