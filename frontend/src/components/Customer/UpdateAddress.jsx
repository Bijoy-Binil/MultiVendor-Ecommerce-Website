import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { AuthContext } from "../../AuthProvider";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateAddress = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";
  const { customerId } = useContext(AuthContext);
  const { address_id } = useParams();

  const [addressFormData, setAddressFormData] = useState({ address: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (address_id) fetchData();
  }, [address_id]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${baseUrl}address/${address_id}/`);
      console.log("Response==>", res.data);
      setAddressFormData({ address: res.data.address });
    } catch (err) {
      console.error(err.response?.data || err);
      setErrorMsg("Failed to fetch address");
    }
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setAddressFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!customerId) {
      setErrorMsg("User not logged in");
      return;
    }

    const payload = {
      address: addressFormData.address,
      customer: customerId,
    };

    try {
      const res = await axios.patch(`${baseUrl}address/${address_id}/`, payload);

      setErrorMsg("");
      setSuccessMsg("Address updated successfully!");
    } catch (err) {
      console.error(err.response?.data || err);
      setErrorMsg("Failed to update address");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          <Sidebar />
        </div>

        <div className="col-md-9 col-12">
          <div className="card">
            <h4 className="card-header">Update Address</h4>
            <div className="card-body">
              <form onSubmit={submitHandler}>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={addressFormData.address}
                    onChange={inputHandler}
                    className="form-control"
                    placeholder="Enter your address"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
              {errorMsg && (
                <div className="alert alert-danger mt-3" role="alert">
                  {errorMsg}
                </div>
              )}

              {successMsg && (
                <div className="alert alert-success mt-3" role="alert">
                  {successMsg}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAddress;
