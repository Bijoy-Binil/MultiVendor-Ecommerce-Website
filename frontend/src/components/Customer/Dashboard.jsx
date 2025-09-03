import React from "react";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className="container mt-4">
      {" "}
      <div className="row">
        {" "}
       <div className="col-md-3 col-12">
     <Sidebar/>
       </div>
        <div className="col-md-9 col-12 mb-2">

            <div className="row">
                <div className="col-md-4 mb-2">
                    <div className="card">
                        <div className="card-body text-center">
                        <h3>Total Orders</h3>
                        <h4><a href="">123</a></h4>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-2">
                    <div className="card">
                        <div className="card-body text-center">
                        <h3>Total Wishlits</h3>
                        <h4><a href="">7</a></h4>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-2">
                    <div className="card">
                        <div className="card-body text-center">
                        <h3>Total Address</h3>
                        <h4><a href="">5</a></h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default Dashboard;
