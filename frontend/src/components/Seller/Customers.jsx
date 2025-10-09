import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SellerSidebar from './SellerSidebar'
import { AuthContext } from '../../AuthProvider';
import axios from 'axios';

const Customers = () => {
    const baseUrl = "http://127.0.0.1:8000/api/";
  const { vendorId } = useContext(AuthContext);
  const [customerList, setCustomerList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

useEffect(() => {
  const fetchCustomerLists = async () => {
    try {
      const res = await axios.get(`${baseUrl}vendor/${vendorId}/customers`);
      // Make sure orderItems is an array
      const data = Array.isArray(res.data) ? res.data : res.data.results || [];
      setCustomerList(data);
    } catch (err) {
      console.error("Failed to fetch order items:", err);
      setErrorMsg("Failed to load vendor orders.");
    } finally {
      setLoading(false);
    }
  };
  if (vendorId) fetchCustomerLists();
}, [vendorId]);
console.log("Product==>",customerList)
    return (
        <div className="container mt-4">
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-3 col-12 mb-2">
                    <SellerSidebar />
                </div>

                {/* Orders Table */}
                <div className="col-md-9 col-12 mb-2">
                    <div className="card shadow-sm border-0">


                        <div className="table-responsive">
                            <table className="table table-bordered ">
                                <thead >
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Phone</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                             <tbody>
  {loading ? (
    <tr>
      <td colSpan="5" className="text-center">Loading...</td>
    </tr>
  ) : errorMsg ? (
    <tr>
      <td colSpan="5" className="text-danger text-center">{errorMsg}</td>
    </tr>
  ) : customerList.length === 0 ? (
    <tr>
      <td colSpan="5" className="text-center text-muted">No customers found.</td>
    </tr>
  ) : (
    customerList.map((customer, index) => (
      <tr key={customer.id}>
        <td>{index + 1}</td>
        <td>{customer.user?.username || "N/A"}</td>
        <td>{customer.user?.email || "N/A"}</td>
        <td className="text-secondary">{customer.mobile || "N/A"}</td>
        <td>
          <button className="btn btn-primary btn-sm">Orders</button>
          <button className="btn btn-danger btn-sm ms-1">Remove</button>
        </td>
      </tr>
    ))
  )}
</tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Customers