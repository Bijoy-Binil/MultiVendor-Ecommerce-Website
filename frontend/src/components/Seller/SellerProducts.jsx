import React, { useEffect, useState } from "react";
import SellerSidebar from "./SellerSidebar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SellerProducts = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";
  const navigate = useNavigate();

  const [productData, setProductData] = useState([]);
  const [deleteMsg, setDeleteMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // ✅ Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${baseUrl}products/`);
        // Adjust based on your API pagination
        const products = res.data.results || res.data;
        setProductData(products);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setErrorMsg("❌ Failed to load products.");
      }
    };
    fetchProducts();
  }, []);

  // 🗑️ Delete Product Handler
  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      "⚠️ Are you sure you want to delete this product? This action cannot be undone!"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${baseUrl}product/${productId}/`);
      setDeleteMsg("🗑️ Product deleted successfully.");

      // Remove deleted product from UI instantly
      setProductData(productData.filter((p) => p.id !== productId));

      // Optional redirect
      setTimeout(() => navigate("/seller/products"), 1500);
    } catch (err) {
      console.error("Delete error:", err.response?.data || err);
      setErrorMsg("❌ Failed to delete the product.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-12">
          <SellerSidebar />
        </div>

        {/* Product Table */}
        <div className="col-md-9 col-12 mb-2">
          <div className="table-responsive">
            <table className="table table-bordered align-middle">
              <thead>
                <tr>
                  <td colSpan="6" align="right">
                    <h3>
                      <Link to="/seller/add-products" className="btn btn-primary mb-2">
                        <i className="fa fa-plus-circle"></i> Add Product
                      </Link>
                    </h3>
                  </td>
                </tr>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>₹ Price</th>
                  <th>$ Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {productData.length > 0 ? (
                  productData.map((data, index) => (
                    <tr key={data.id}>
                      <td>{index + 1}</td>
                      <td>
                        <Link
                          to={`/seller/update-products/${data.id}`}
                          className="text-decoration-none fw-bold"
                        >
                          {data.title}
                        </Link>
                      </td>
                      <td>&#8377; {data.price}</td>
                      <td>&#36; {data.usd_price}</td>
                      <td>{data.is_published ? "Published" : "Not Published"}</td>
                      <td>
                        <Link
                          to={`/seller/update-products/${data.id}`}
                          className="btn btn-sm btn-primary me-2"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(data.id)}
                          className="btn btn-sm btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" align="center">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {deleteMsg && <div className="alert alert-warning mt-3">{deleteMsg}</div>}
          {errorMsg && <div className="alert alert-danger mt-3">{errorMsg}</div>}
        </div>
      </div>
    </div>
  );
};

export default SellerProducts;
