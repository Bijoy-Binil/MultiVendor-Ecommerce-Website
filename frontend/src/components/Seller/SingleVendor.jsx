import React from "react";
import { Link } from "react-router-dom";

const SingleVendor = ({ product }) => {
  if (!product) return null;

  const vendorName = product.user?.username || "Unknown Vendor";
  const vendorId = product.id;

  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
      <div className="card h-100 shadow-sm border-0">
        {/* ✅ Link to vendor detail page using username instead of slug */}
        <Link to={`/seller/${vendorName}/${vendorId}`}>
          <img
            src={product.profile_img}
            className="card-img-top"
            alt={vendorName}
            style={{ height: "200px", objectFit: "cover" }}
          />
        </Link>

        <div className="card-body">
          <h5 className="card-title fw-bold text-dark">{vendorName}</h5>
          <p className="text-muted small">{product.user?.email}</p>
          <p className="text-muted small">{product.mobile}</p>

          <div className="d-flex justify-content-between mt-2">
            <Link
              to={`/seller/${vendorName}/${vendorId}`}
              className="btn btn-sm btn-primary rounded-pill shadow-sm"
            >
              View Store
            </Link>
            <button className="btn btn-sm btn-outline-success rounded-pill shadow-sm">
              <i className="fa-solid fa-message me-2"></i>Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleVendor;
