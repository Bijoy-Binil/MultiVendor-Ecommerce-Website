import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider";
import axios from "axios";
const Address = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";
  const { customerId } = useContext(AuthContext);
  const [addressList, setAddressList] = useState([]);

  useEffect(() => {
    fecthData();
    
  }, []);

  const fecthData = async () => {
    try {
      const res = await axios.get(`${baseUrl}customer/${customerId}/address-list/`);
      console.log("Response==>", res.data.results);
      setAddressList(res.data.results);
    } catch (err) {
      console.error(err.response?.data || err);
      console.log("Failed to fetch address");
    }
  };
  const defaultAddresHandler = async (address_id) => {
    if (!customerId) {
      setErrorMsg("User not logged in");
      return;
    }

    const payload = {
      address_id: address_id,
    };

    try {
      const res = await axios.post(`${baseUrl}mark-as-default-address/${parseInt(address_id)}/`, payload);
      if(res.data.success == true){
        window.location.reload()
      }
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };
  return (
    <div className="container mt-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-12 mb-2">
          <Sidebar />
        </div>

        <div className="col-md-9 col-12 mb-2">
          <div className="row">
            <div className="col-12">
              <Link to="/customer/add-address" className="btn btn-outline-success mb-4 float-end">
                <i className="fa fa-plus-circle me-2"></i>
                Add Address
              </Link>
            </div>
          </div>
          <div className="row">
            {addressList.map((address, index) => {
              return (
                <div key={index} className="col-4 mb-2">
                  <div className="card ">
                    <div className="card-body text-muted ">
                      <h6>
                        {address.default_address == true ? (
                          <>
                            <span role="button">
                              <i className="fa fa-check-circle   text-success"></i>
                            </span>{" "}
                            <br />
                          </>
                        ) : (
                          <>
                            {" "}
                            <span className="" onClick={() => defaultAddresHandler(address.id)} role="button">
                              <i className="far fa-check-circle   text-success"></i>
                            </span>{" "}
                            <br />{" "}
                          </>
                        )}
                        <Link to={`/customer/update-address/${address.id}`}>{address.address}</Link>
                      </h6>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
