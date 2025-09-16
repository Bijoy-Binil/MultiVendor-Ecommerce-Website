import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext, CurrencyContext } from "../../AuthProvider";

const Wishlist = () => {
  const [WishItems, setWishItems] = useState([]);
  const baseUrl = `http://127.0.0.1:8000/api`;
  const { customerId } = useContext(AuthContext);
  const { currencyData } = useContext(CurrencyContext);

  useEffect(() => {
    fetchWishList();
  }, []);

  const fetchWishList = async () => {
    try {
      const response = await axios.get(`${baseUrl}/customer/${customerId}/wish-items`);
      setWishItems(response.data.results);
      console.log("wishListData==>", response.data.results);
    } catch (error) {
      console.error("Something Went Wrong", error);
    }
  };
  const RemoveFromWishlist = async (wishlist_id) => {
    try {
      const formData = new FormData();
      formData.append("wishlist_id", wishlist_id);

      const response = await axios.post(
        `${baseUrl}/remove-from-wishlists/`,
        formData
      );

      if (response.data.bool) {
        // remove from UI without reloading
        setWishItems((prev) =>
          prev.filter((item) => item.id !== wishlist_id)
        );
      }
    } catch (error) {
      console.error("Something Went Wrong", error);
    }
  };
  return (
    <div className="container mt-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-12 mb-2">
          <Sidebar />
        </div>

        {/* Wishlist Table */}
        <div className="col-md-9 col-12 mb-2">
          <div className="card shadow-sm border-0">
            <div className="table-responsive">
              <table className="table table-bordered ">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">product_info</th>
                    <th scope="col">Price</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {WishItems.length > 0 ? (
                    WishItems.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <Link>
                            <img src={item.product_info.image} className="img-thumbnail" width="90" alt="product_info" />
                            <p>{item.product_info.title}</p>
                          </Link>
                        </td>
                        {currencyData == "inr" && <td>Rs.{item.product_info.price}</td>}
                        {currencyData == "usd" && <td>${item.product_info.usd_price}</td>}

                        <td>
                          <button onClick={() => RemoveFromWishlist(item.id)} className="btn btn-danger">
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No items in wishlist
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
