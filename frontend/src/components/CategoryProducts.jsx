import React, { useEffect, useState } from "react";
import SingleProduct from "./SingleProduct";
import { Link, useParams } from "react-router-dom";

const CategoryProducts = () => {
  const baseUrl = "http://127.0.0.1:8000/api/products";
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const { category_id } = useParams();
console.log("UseParams categoryId==>",category_id)
  // fetch products whenever category changes
  useEffect(() => {
    fetchProducts(`${baseUrl}/?category=${category_id}`);
  }, [category_id]);

  // fetch data from API
  const fetchProducts = (baseUrl) => {
    fetch(baseUrl)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.results)
        setTotal(data.count)
      })
  }
  // pagination buttons
  const pages = [];
  if (total > 0 && products.length > 0) {
    const pageCount = Math.ceil(total / products.length);
    for (let i = 1; i <= pageCount; i++) {
      pages.push(
        <li key={i} className="page-item">
          <Link
            className="page-link"
            to="#"
            onClick={() =>
              fetchProducts(`${baseUrl}/?category=${category_id}&page=${i}`)
            }
          >
            {i}
          </Link>
        </li>
      );
    }
  }

  return (
    <div className="container mt-4">
      <h4 className="fw-bold text-primary mb-4">Products in this Category</h4>

      <div className="row mb-4">
        {products.length > 0 ? (
          products.map((p, i) => <SingleProduct key={i} product={p} />)
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>

      {pages.length > 0 && (
        <nav>
          <ul className="pagination justify-content-center">{pages}</ul>
        </nav>
      )}
    </div>
  );
};

export default CategoryProducts;
