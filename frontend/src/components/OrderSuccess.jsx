import React from "react";
import { Link } from "react-router-dom";
import logo from "./../images/logo.jpg"

const OrderSuccess = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 offset-2">
          <div className="card">
            <div className="card-body text-center">
              <p className="fa fa-check-circle text-success fa-3x"></p>
              <h3 className="text-success">Thanks for the order</h3>
              <p className="mt-2"><Link to="/"className="btn btn-primary mt-2 mx-2">Home</Link>
                <Link  to="/customer/dashboard"className="btn btn-primary mt-2">Dashboard</Link></p>

            </div>
          </div>

        </div>

      </div>

    </div>
  )
}

export default OrderSuccess