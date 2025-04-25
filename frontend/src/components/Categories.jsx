import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const baseUrl = "http://127.0.0.1:8000/api";
  const [categories, SetCategories] = useState([]);
  const [totalResults, SetTotalResults] = useState(0);

  useEffect(() => {
    FetchData(baseUrl + "/categories/");
  }, []);

  const FetchData = (baseUrl) => {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => {
        SetCategories(data.results);
        SetTotalResults(data.count);
      });
  };

  function ChangeUrl(Url) {
    FetchData(Url);
  }
console.log(categories);

  var links = [];
  var limit = 3;
  var totalLinks = totalResults / limit;

  for (let i = 1; i <= totalLinks; i++) {
    links.push(
      <li key={i}>
        <Link
          onClick={() => ChangeUrl(`${baseUrl}/categories/?page=${i}`)}
          className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          {i}
        </Link>
      </li>
    );
  }

  return (
    <>
      <section className="container mt-5 mx-auto">
        <div className="container mt-5 mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl mx-22 font-semibold text-gray-900">
              All Categories{" "}
            </h1>
          </div>
          <div className="flex flex-wrap gap-10 justify-center">
            {categories.map((category, index) => {
              return (
                <div
                  key={index}
                  className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                >
                  <Link to={`/category/${category.title}/${category.id}`}>
                  <img
                    className="w-full h-64 object-cover rounded-2xl"
                    src={category.image}
                    alt="Title:"
                  />
                      </Link>
                  
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold text-gray-800">
                      <Link to={`/category/${category.title}/${category.id}`}>
                        {category.title}
                      </Link>
                    </h2>
                    <br />
                    <h1>Products Downloads: 2345</h1>
                    <div className="mt-6 flex justify-between items-center"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================Pagination======================================================= */}
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
    </>
  );
};

export default Categories;
