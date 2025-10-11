import React, { useContext, useEffect, useState } from "react";
import SellerSidebar from "./SellerSidebar";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../AuthProvider";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

const CustomerOrder = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";
  const { vendorId } = useContext(AuthContext);
  const { customer_id } = useParams();

  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // ✅ Fetch orders for this customer (for this vendor)
  useEffect(() => {
    const fetchCustomerOrders = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}vendor/${vendorId}/customer/${customer_id}/order-items/`
        );
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.results || [];
        setOrderItems(data);
      } catch (err) {
        console.error("Failed to fetch customer orders:", err);
        setErrorMsg("Failed to load customer orders.");
      } finally {
        setLoading(false);
      }
    };

    if (vendorId && customer_id) fetchCustomerOrders();
  }, [vendorId, customer_id]);

  // ✅ Change order status
  const changeOrderStatus = async (order_id, status) => {
    try {
      const res = await axios.patch(`${baseUrl}order-modify/${order_id}/`, {
        order_status: status,
      });

      // ✅ Update UI locally
      setOrderItems((prev) =>
        prev.map((item) =>
          item.order_info?.id === order_id
            ? {
                ...item,
                order_info: { ...item.order_info, order_status: status },
              }
            : item
        )
      );
    } catch (err) {
      console.error("Failed to update order status:", err);
      setErrorMsg("Failed to update order status.");
    }
  };

  console.log("Customer Orders =>", orderItems);

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
              <h4 className="mb-0">Customer Orders</h4>
            </div>

            {loading ? (
              <div className="p-5 text-center">
                <FaSpinner className="fa-spin me-2" /> Loading orders...
              </div>
            ) : errorMsg ? (
              <div className="alert alert-danger m-3">{errorMsg}</div>
            ) : orderItems.length === 0 ? (
              <div className="alert alert-info m-3">
                No orders found for this customer.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>
                          <Link
                            to={`/seller/products/${item.product}`}
                            className="text-decoration-none"
                          >
                            {item.product_info?.title || "Unnamed Product"}
                          </Link>
                        </td>
                        <td>{item.qty}</td>
                        <td>₹{item.price}</td>
                        <td>
                          <span
                            className={`badge ${
                              item.order_info?.order_status
                                ? "bg-success"
                                : "bg-warning text-dark"
                            }`}
                          >
                            {item.order_info?.order_status
                              ? "Completed"
                              : "Processing"}
                          </span>
                        </td>
                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-primary btn-sm dropdown-toggle"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Change Status
                            </button>
                            <ul className="dropdown-menu">
                              {!item.order_info?.order_status ? (
                                <li>
                                  <button
                                    className="dropdown-item"
                                    onClick={() =>
                                      changeOrderStatus(item.order_info.id, true)
                                    }
                                  >
                                    Mark as Completed
                                  </button>
                                </li>
                              ) : (
                                <li>
                                  <button
                                    className="dropdown-item"
                                    onClick={() =>
                                      changeOrderStatus(item.order_info.id, false)
                                    }
                                  >
                                    Mark as Pending
                                  </button>
                                </li>
                              )}
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="card-footer text-end">
              <Link
                to="/seller/customers"
                className="btn btn-secondary btn-sm"
              >
                ← Back to Customers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerOrder;
