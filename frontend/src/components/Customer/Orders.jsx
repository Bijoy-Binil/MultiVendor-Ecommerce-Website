import React, { useContext, useEffect, useState } from "react"

import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import logo from "../../images/logo.jpg"
import { AuthContext } from "../../AuthProvider";

const Orders = () => {

  const baseUrl = "http://127.0.0.1:8000/api"
  const [orderItems, setOrderItems] = useState([])
  const { customerId } = useContext(AuthContext);
  const fetchData = (baseUrl) => {
    fetch(baseUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setOrderItems(data.results)

      })


  }
  useEffect(() => {
    fetchData(`${baseUrl}/customer/${customerId}/order-items`)

  }, [])
  console.log(orderItems)
  return (
    <div className="container my-5">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-12 mb-3">
          <Sidebar />
        </div>

        {/* Orders Table */}
        <div className="col-md-9 col-12">
          <div className="card shadow border-0 rounded-3">
            <div className="card-header bg-gradient bg-primary text-white d-flex justify-content-between align-items-center">
              <h4 className="mb-0">
                <i className="fa fa-shopping-bag me-2"></i> My Orders
              </h4>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light text-secondary">
                    <tr>
                      <th scope="col" className="text-center">#</th>
                      <th scope="col">Product</th>
                      <th scope="col" className="text-end">Price</th>
                      <th scope="col" className="text-center">Status</th>
                      <th scope="col" className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-center fw-semibold">{index + 1}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link to={`/product/${item.product.slug}/${item.product.id}`}>
                                <img
                                  src={item.product.image}
                                  className="img-fluid rounded me-3 border"
                                  style={{ width: "70px", height: "70px", objectFit: "cover" }}
                                  alt="Product"
                                />
                              </Link>
                              <Link
                                to={`/product/${item.product.slug}/${item.product.id}`}
                                className="text-decoration-none text-dark fw-semibold"
                              >
                                {item.product.title}
                              </Link>
                            </div>
                          </td>
                          <td className="text-end fw-bold text-success">
                            ₹{item.price}
                          </td>
                          <td className="text-center">
                            {item.order.order_status ? (
                              <span className="badge bg-success px-3 py-2">
                                <i className="fa fa-check-circle me-1"></i> Completed
                              </span>
                            ) : (
                              <span className="badge bg-warning text-dark px-3 py-2">
                                <i className="fa fa-spinner fa-spin me-1"></i> Pending
                              </span>
                            )}
                          </td>
                          <td className="text-center">
                            {item.order.order_status ? (
                              <a
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`http://127.0.0.1:8000/${item.product.product_file}`}
                                className="btn btn-outline-primary btn-sm"
                              >
                                <i className="fa fa-download me-1"></i> Download
                              </a>

                            ) : (
                              <button className="btn btn-outline-secondary btn-sm" disabled>
                                <i className="fa fa-clock me-1"></i> Awaiting
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Orders;
