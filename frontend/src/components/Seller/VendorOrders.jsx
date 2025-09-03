import React from 'react'
import SellerSidebar from './SellerSidebar'
import { Link } from 'react-router-dom'
import logo from "../../images/logo.jpg"

const VendorOrders = () => {
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
                                        <td>
                                            <div className="btn-group" role="group">
                                                <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Change status
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item" href="#">Approve</a></li>
                                                    <li><a className="dropdown-item" href="#">Sent</a></li>
                                                    <li><a className="dropdown-item" href="#">Completed</a></li>
                                                </ul>
                                            </div></td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
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
                                        <td>
                                            <div className="btn-group" role="group">
                                                <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Change status
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item" href="#">Approve</a></li>
                                                    <li><a className="dropdown-item" href="#">Sent</a></li>
                                                    <li><a className="dropdown-item" href="#">Completed</a></li>
                                                </ul>
                                            </div></td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default VendorOrders