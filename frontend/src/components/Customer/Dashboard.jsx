import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider";
import axios from "axios";

const Dashboard = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";
  const { customerId } = useContext(AuthContext);
  const [countList, setCountList] = useState({
    total_address: 3,
    total_orders: 2,
    total_wishlist: 2,
  });

  useEffect(() => {
    fecthData();
  }, []);

  const fecthData = async () => {
    try {
      const res = await axios.get(`${baseUrl}customer/dashboard/${customerId}`);
      setCountList(res.data);
      console.log("Response==>", res.data);

    } catch (err) {
      console.error(err.response?.data || err);
      console.log("Failed to fetch address");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12">
          <Sidebar />
        </div>
        <div className="col-md-9 col-12 mb-2">
          <div className="row">
            <div className="col-md-4 mb-2">
              <div className="card">
                <div className="card-body text-center">
                  <h3>Total Orders</h3>
                  <h4>
                   <Link to="/customer/orders" className="list-group-item list-group-item-action">{countList.total_orders}</Link>
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-2">
              <div className="card">
                <div className="card-body text-center">
                  <h3>Total Wishlits</h3>
                  <h4>
                    <a href=""></a> <Link to="/customer/wishlist" className="list-group-item list-group-item-action">{countList.total_wishlist}</Link>
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-2">
              <div className="card">
                <div className="card-body text-center">
                  <h3>Total Address</h3>
                  <h4>
                     <Link to="/customer/address" className="list-group-item list-group-item-action">{countList.total_address}</Link>
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

export default Dashboard;
