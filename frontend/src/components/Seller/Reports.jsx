import React from "react";
import { Link } from "react-router-dom";
import SellerSidebar from "./SellerSidebar";

const Reports = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        {/* Sidebar Section */}
        <div className="col-md-3 col-12 mb-3">
          <SellerSidebar />
        </div>

        {/* Main Reports Section */}
        <div className="col-md-9 col-12 mb-2">
          <h3 className="text-center mb-4">Reports Dashboard</h3>

          <div className="row">
            {/* Daily Report Card */}
            <div className="col-md-4 mb-3">
              <div className="card shadow-sm border-0">
                <div className="card-body text-center">
                  <h4 className="card-title mb-3">Daily Reports</h4>
                  <Link className="btn btn-primary" to="/seller/daily/report">
                    View
                  </Link>
                </div>
              </div>
            </div>

            {/* Monthly Report Card */}
            <div className="col-md-4 mb-3">
              <div className="card shadow-sm border-0">
                <div className="card-body text-center">
                  <h4 className="card-title mb-3">Monthly Reports</h4>
                  <Link className="btn btn-primary" to="/seller/monthly/report">
                    View
                  </Link>
                </div>
              </div>
            </div>

            {/* Yearly Report Card */}
            <div className="col-md-4 mb-3">
              <div className="card shadow-sm border-0">
                <div className="card-body text-center">
                  <h4 className="card-title mb-3">Yearly Reports</h4>
                  <Link className="btn btn-primary" to="/seller/yearly/report">
                    View
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
