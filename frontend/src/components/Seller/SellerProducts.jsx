import React, { useEffect, useState } from "react";
import SellerSidebar from "./SellerSidebar";
import { Link } from "react-router-dom";
import axios from "axios";

const SellerProducts = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${baseUrl}products/`);
        setProductData(res.data.results);
        console.log("Products==> ", res.data.results);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="container mt-4">
      {" "}
      <div className="row">
        {" "}
        <div className="col-md-3 col-12">
          <SellerSidebar />
        </div>
        <div className="col-md-9 col-12 mb-2">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <td colSpan="5" align="right">
                    <h3>
                      <Link to="/seller/-add-products" href="" className=" btn btn-primary mb-2 ">
                        <i className="fa fa-plus-circle"></i>Add Product
                      </Link>
                    </h3>
                  </td>
                </tr>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Dollar Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {productData.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data.title}</td>
                      <td>&#8377; {data.price}</td>
                      <td>&#36; {data.usd_price}</td>
                      <td>{data.is_published ? "Published" : "Not Published"}</td>

                      <td>
                        <a href="" className="btn btn-info ms-1">
                          View
                        </a>
                        <a href="" className="btn btn-primary ms-1">
                          Edit
                        </a>
                        <a href="" className="btn btn-danger ms-1">
                          Delete
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default SellerProducts;
