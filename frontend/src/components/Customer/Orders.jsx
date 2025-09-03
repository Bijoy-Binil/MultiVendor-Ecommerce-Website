import React from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import logo from "../../images/logo.jpg"

const Orders = () => {



  return (
    <div className="container mt-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-12 mb-2">
          <Sidebar />
        </div>

        {/* Orders Table */}
        <div className="col-md-9 col-12 mb-2">
          <div className="card shadow-sm border-0">
           
           
              <div className="table-responsive">
                <table className="table table-bordered ">
                  <thead >
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Product</th>
                      <th scope="col">Price</th>
                      <th scope="col">Action</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                   <tbody>
            <tr>
              <td>1</td>
              <td>
                <Link><img
                  src={logo}
                  className="img-thumbnail"
                  width="90"
                  alt="Product"
                />
                <p>Django</p></Link>
              </td>
              <td>Rs.500</td>
   <td><span className="text-secondary">Processing <i className="fa fa-spin fa-spinner"></i></span></td>
             
            </tr>
            <tr>
              <td>1</td>
              <td>
                <Link><img
                  src={logo}
                  className="img-thumbnail"
                  width="90"
                  alt="Product"
                />
                <p>Flask</p></Link>
              </td>
              <td>Rs.500</td>
               <td><span className="text-danger">Cancelled <i className="fa fa-time "></i></span></td>
               
            </tr>
            <tr>
              <td>1</td>
              <td>
                <Link><img
                  src={logo}
                  className="img-thumbnail"
                  width="90"
                  alt="Product"
                />
                <p>RestFrameWork!</p></Link>
              </td>
              <td>Rs.110</td>
               <td><span className="text-success">Completed <i className="fa fa-check-circle"></i></span></td>
               <td><button className="btn btn-primary">Download</button></td>
            </tr>
            <tr>
              <td>1</td>
              <td>
                <Link><img
                  src={logo}
                  className="img-thumbnail"
                  width="90"
                  alt="Product"
                />
                <p>Laravel</p></Link>
              </td>
              <td>Rs.430</td>
               <td><span className="text-success">Completed <i className="fa fa-check-circle"></i></span></td>
               <td><button className="btn btn-primary">Download</button></td>
            </tr>
            <tr>
              <td>1</td>
              <td>
                <Link><img
                  src={logo}
                  className="img-thumbnail"
                  width="90"
                  alt="Product"
                />
                <p>Django</p></Link>
              </td>
              <td>Rs.440</td>
            </tr>
          </tbody>
                </table>
              </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
