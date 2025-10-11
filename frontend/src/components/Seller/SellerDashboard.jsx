import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./SellerSidebar";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider";
import axios from "axios";

const SellerDashboard  = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";
  const { vendorId } = useContext(AuthContext);
  const [countList, setCountList] = useState({
    total_products: 0,
    total_orders: 0,
    total_customers: 0,
  });

  useEffect(() => {
    if (vendorId) fetchData();
  }, [vendorId]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${baseUrl}vendor/dashboard/${vendorId}`);
      setCountList(res.data);
      console.log("Vendor Dashboard Response:", res.data);
    } catch (err) {
      console.error(err.response?.data || err);
      console.log("Failed to fetch vendor dashboard data");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-12">
          <Sidebar />
        </div>

        {/* Dashboard Cards */}
        <div className="col-md-9 col-12 mb-2">
          <div className="row">
            <div className="col-md-4 mb-2">
              <div className="card">
                <div className="card-body text-center">
                  <h3>Total Products</h3>
                  <h4>
                    <Link to="/seller/products" className="list-group-item list-group-item-action">
                      {countList.total_products}
                    </Link>
                  </h4>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-2">
              <div className="card">
                <div className="card-body text-center">
                  <h3>Total Orders</h3>
                  <h4>
                    <Link to="/seller/orders" className="list-group-item list-group-item-action">
                      {countList.total_orders}
                    </Link>
                  </h4>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-2">
              <div className="card">
                <div className="card-body text-center">
                  <h3>Total Customers</h3>
                  <h4>
                    <Link to="/seller/customers" className="list-group-item list-group-item-action">
                      {countList.total_customers}
                    </Link>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
