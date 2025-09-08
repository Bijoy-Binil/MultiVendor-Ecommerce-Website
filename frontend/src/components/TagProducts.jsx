import React, { useEffect, useState } from "react";
import SingleProduct from "./SingleProduct";
import { Link, useParams } from "react-router-dom";

const TagProducts = () => {
  const baseUrl = "http://127.0.0.1:8000/api/products";
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const { tag } = useParams();
// console.log("tag 1==>",tag)
  useEffect(() => {
      fetchData(`${baseUrl}/${tag}`)
  
    }, [])
  
    const fetchData = (baseUrl) => {
      fetch(baseUrl)
        .then((response) => response.json())
        .then((data) => {
          setProducts(data.results)
          setTotal(data.count)
          // console.log("api==> ", baseUrl)
          // console.log("products tag==> ", data)
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
              fetchData(`${baseUrl}/${tag}?page=${i}`)
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

export default TagProducts;
