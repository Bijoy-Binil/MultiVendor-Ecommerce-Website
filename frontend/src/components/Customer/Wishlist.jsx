import React, { useContext, useEffect, useState } from "react";
import { AuthContext, CurrencyContext } from "../../AuthProvider";
import axios from "axios";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { currencyData } = useContext(CurrencyContext);
  const { customerId, isLoggedIn } = useContext(AuthContext);
  const [wishItems, setWishItems] = useState([]);
  const baseUrl = "http://127.0.0.1:8000/api";

  useEffect(() => {
    if (isLoggedIn && customerId) fetchWishlist();
  }, [isLoggedIn, customerId]);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("accessToken") ;
      if (!token) return;

      const response = await axios.get(`${baseUrl}/customer/wish-items/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setWishItems(response.data.results || []);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    }
  };

  const removeFromWishlist = async (wishlistId) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const productId = wishItems.find((i) => i.id === wishlistId)?.product;

      const formData = new FormData();
      formData.append("product", productId);
      formData.append("customer", customerId);

      const res = await axios.post(`${baseUrl}/toggle-wishlist/`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.data.bool) {
        // removed successfully
        setWishItems((prev) => prev.filter((item) => item.id !== wishlistId));
      }
    } catch (err) {
      console.error("Error removing wishlist item:", err);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2"><Sidebar /></div>
        <div className="col-md-9 col-12 mb-2">
          <div className="card shadow-sm border-0">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {wishItems.length > 0 ? (
                    wishItems.map((item, idx) => (
                      <tr key={item.id}>
                        <td>{idx + 1}</td>
                        <td>
                          <Link to={`/product/${item.product_info.slug}/${item.product_info.id}`} className="d-flex align-items-center text-dark text-decoration-none">
                            <img src={item.product_info.image} className="img-thumbnail me-3" width="90" alt={item.product_info.title} />
                            <div>
                              <p className="mb-0">{item.product_info.title}</p>
                              <small className="text-muted">{item.product_info.vendor.user.username}</small>
                            </div>
                          </Link>
                        </td>
                        <td>{currencyData === "usd" ? `$${item.product_info.usd_price}` : `Rs.${item.product_info.price}`}</td>
                        <td>
                          <button className="btn btn-danger" onClick={() => removeFromWishlist(item.id)}>Remove</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4">No items in wishlist</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
