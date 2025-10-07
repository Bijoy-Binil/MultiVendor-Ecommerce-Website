import React, { useContext, useEffect, useState } from "react";
import SellerSidebar from "./SellerSidebar";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

const VendorOrders = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";
  const { vendorId } = useContext(AuthContext);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

useEffect(() => {
  const fetchOrderItems = async () => {
    try {
      const res = await axios.get(`${baseUrl}vendor/${vendorId}/order-items`);
      // Make sure orderItems is an array
      const data = Array.isArray(res.data) ? res.data : res.data.results || [];
      setOrderItems(data);
    } catch (err) {
      console.error("Failed to fetch order items:", err);
      setErrorMsg("Failed to load vendor orders.");
    } finally {
      setLoading(false);
    }
  };
  if (vendorId) fetchOrderItems();
}, [vendorId]);
console.log("Product==>",orderItems)

  // 💡 Dummy status change handler
  const handleStatusChange = (orderItemId, newStatus) => {
    alert(`Order item ${orderItemId} status changed to ${newStatus}`);
    // You can later integrate a PATCH API call here to update status.
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-12 mb-2">
          <SellerSidebar />
        </div>

        {/* Orders Table */}
        <div className="col-md-9 col-12 mb-2">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Vendor Orders</h4>
            </div>

            {loading ? (
              <div className="p-5 text-center">
                <FaSpinner className="fa-spin me-2" /> Loading orders...
              </div>
            ) : errorMsg ? (
              <div className="alert alert-danger m-3">{errorMsg}</div>
            ) : orderItems.length === 0 ? (
              <div className="alert alert-info m-3">
                No orders found for this vendor.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Product</th>
                      <th>Customer</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
          <tbody>
  {orderItems.map((item, index) => {
    const customer = item.order_info?.customer || {};
    return (
   <tr key={item.id}>
  <td>{index + 1}</td>
  <td>
    <Link to={`/seller/products/${item.product}`} className="text-decoration-none">
      {item.product_info?.title || "Unnamed Product"}
    </Link>
  </td>
  <td>
    <div className="d-flex align-items-center">
      {customer.profile_img && (
        <img
          src={customer.profile_img}
          alt="Customer"
          width="40"
          className="rounded-circle me-2"
        />
      )}
      <div>{item.order_info.customer_name || "—"}</div>
    </div>
  </td>
  <td>{item.qty}</td>
  <td>₹{item.price}</td>
  <td>
    <span className="badge bg-secondary">
      {item.order_info?.order_status ? "Completed" : "Processing"}
    </span>
  </td>
  <td>
    <select
      className="form-select form-select-sm"
      value={item.order_info?.order_status ? "Completed" : "Processing"}
      onChange={(e) => handleStatusChange(item.id, e.target.value)}
    >
      <option value="Processing">Processing</option>
      <option value="Approved">Approved</option>
      <option value="Sent">Sent</option>
      <option value="Completed">Completed</option>
    </select>
  </td>
</tr>
    );
  })}
</tbody>

                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorOrders;
