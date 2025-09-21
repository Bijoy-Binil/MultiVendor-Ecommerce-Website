import React, { useContext, useState } from "react";
import Sidebar from "./Sidebar";
import { AuthContext } from "../../AuthProvider";
import axios from "axios";

const AddAddress = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";

  const { customerId } = useContext(AuthContext);

  const [addressFormData, setAddressFormData] = useState({
    address: "",
    customer: customerId,
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setAddressFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    const res = await axios.post(`${baseUrl}address/`, payload);

    if (res.status !== 201) {
      setErrorMsg("Data Not Saved");
    } else {
      setErrorMsg("");
      setSuccessMsg("Data Saved");
      setAddressFormData({ address: "" });
    }
  } catch (err) {
    console.error(err.response?.data || err);
    setErrorMsg("Failed to save address");
  }
};

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-12 mb-2">
          <Sidebar />
        </div>

        <div className="col-md-9 col-12">
          <div className="card">
            <h4 className="card-header">Add address</h4>
            <div className="card-body">
              <form onSubmit={submitHandler}>
                {" "}
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
                  Submit
                </button>
              </form>
              {errorMsg && <h4 className="text-danger text-center">{errorMsg}</h4>}
              {successMsg && <h4 className="text-success text-center">{successMsg}</h4>}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
