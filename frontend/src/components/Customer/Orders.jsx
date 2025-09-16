import React, { useContext, useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import logo from "../../images/logo.jpg";
import { AuthContext } from "../../AuthProvider";
import axios from "axios";
import OrderRow from "./OrderRow";

const Orders = () => {
  const baseUrl = "http://127.0.0.1:8000/api";
  const [orderItems, setOrderItems] = useState([]);

  const { customerId } = useContext(AuthContext);

  const fetchData = (baseUrl) => {
    fetch(baseUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOrderItems(data.results);
      });
  };

  useEffect(() => {
    fetchData(`${baseUrl}/customer/${customerId}/order-items`);
  }, []);

  console.log(orderItems);

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
                      <th scope="col" className="text-center">
                        #
                      </th>
                      <th scope="col">Product</th>
                      <th scope="col" className="text-end">
                        Price
                      </th>
                      <th scope="col" className="text-center">
                        Status
                      </th>
                      <th scope="col" className="text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems.map((item, index) => {
                      return  <OrderRow item={item} key={index} keys={index} index={index}/>
                      
                    
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
