import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const VendorDetail = () => {
  const { id } = useParams(); // vendor id from URL
  const baseUrl = "http://127.0.0.1:8000/api/";
  const [vendor, setVendor] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // fetch vendor details
    fetch(`${baseUrl}vendor/${id}/`)
      .then((res) => res.json())
      .then((data) => setVendor(data))
      .catch((err) => console.error("Vendor fetch error:", err));

    // fetch products of this vendor
    fetch(`${baseUrl}vendor/${id}/products/`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Products fetch error:", err));
  }, [id]);

  if (!vendor) return <div className="text-center mt-5">Loading vendor details...</div>;

  return (
    <div className="container mt-4">
      <div className="card mb-4 shadow-sm">
        <div className="card-body d-flex align-items-center">
          <img
            src={vendor.profile_img}
            alt={vendor.user?.username}
            className="rounded-circle me-4"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
          <div>
            <h4>{vendor.user?.username}</h4>
            <p className="text-muted mb-0">{vendor.user?.email}</p>
            <p className="text-muted small">{vendor.address}</p>
          </div>
        </div>
      </div>

      <h5 className="fw-bold mb-3 text-primary">Products by {vendor.user?.username}</h5>
      <div className="row">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <Link to={`/product/${product.title}/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title fw-bold text-dark">{product.title}</h5>
                  <p className="text-muted small">Price: ₹{product.price}</p>
                  <Link
                    to={`/product/${product.title}/${product.id}`}
                    className="btn btn-sm btn-primary rounded-pill"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted text-center">No products available for this vendor.</p>
        )}
      </div>
    </div>
  );
};

export default VendorDetail;
