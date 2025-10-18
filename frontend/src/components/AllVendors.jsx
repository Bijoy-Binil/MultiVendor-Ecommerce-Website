import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SingleVendor from "./Seller/SingleVendor";

const AllVendors = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";
  const [vendorList, setVendorList] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = (url) => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setVendorList(data.results || []);
        setTotal(data.count || 0);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching vendors:", err);
        setLoading(false);
      });
  };
console.log('vendorList==>',vendorList)
  useEffect(() => {
    fetchData(`${baseUrl}vendors/`);
  }, []);

  // Pagination
  let pages = [];
  if (total > 0 && vendorList.length > 0) {
    const pageCount = Math.ceil(total / vendorList.length);
    for (let i = 1; i <= pageCount; i++) {
      pages.push(
        <li key={i} className="page-item">
          <Link
            className="page-link"
            to="#"
            onClick={() => fetchData(`${baseUrl}vendors/?page=${i}`)}
          >
            {i}
          </Link>
        </li>
      );
    }
  }

  return (
    <div className="container mt-4">
      <h4 className="fw-bold text-primary mb-4">All Vendors</h4>

      {loading && <p>Loading vendors...</p>}

      <div className="row mb-4">
        {vendorList.length > 0 ? (
          vendorList.map((vendor, i) => (
            <SingleVendor key={i} product={vendor} />
          ))
        ) : (
          !loading && <p>No vendors found.</p>
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

export default AllVendors;
