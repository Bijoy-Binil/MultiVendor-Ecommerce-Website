import React from "react";
import { Link } from "react-router-dom";
import logo from "./../images/logo.jpg";

const Checkout = () => {
 
  return (
   <div className="container mt-4">
      <h3 className="mb-4">All Items (4)</h3>
<div className="row">
  <div className="col-md-8 col-12">
  <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Price</th>
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
          <tfoot>
            <tr>
              <th></th>
              <th>Total</th>
              <th>2000</th>
            </tr>
            <tr>
 
              <td colSpan="3" align="right" >
                <Link to="/categories" className="btn btn-secondary mx-2">Contine Shopping</Link>
                <Link to="payment" className="btn btn-success">Proceed to payment</Link>
              </td>
            </tr>
      
          </tfoot>
        </table>
      </div>
  </div>
</div>
    
    </div>
  );
};

export default Checkout;
