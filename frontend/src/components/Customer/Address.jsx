import React from 'react'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'

const Address = () => {
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

                            <Link
                                to="/customer/add-address"
                                className="btn btn-outline-success mb-4 float-end"
                            >
                                <i className="fa fa-plus-circle me-2"></i>
                                Add Address
                            </Link>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 mb-2">
                            <div className="card ">
                                <div className="card-body text-muted ">

                                    <h6><i className='fa fa-check-circle  text-success'></i> <br />123, New krishna nagar near jain temple, Punjab, Inida,</h6>

                                </div>
                            </div>
                        </div>
                        <div className="col-4 mb-4">
                            <div className="card">
                                <div className="card-body text-muted">
                                    <h6><span className='badge bg-secondary '>Make Default</span> <br />123, New krishna nagar near jain temple, Punjab, Inida,</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 mb-4">
                            <div className="card">
                                <div className="card-body text-muted">
                                    <h6>123, New krishna nagar near jain temple, Punjab, Inida,</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 mb-4">
                            <div className="card">
                                <div className="card-body text-muted">
                                    <h6>123, New krishna nagar near jain temple, Punjab, Inida,</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 mb-4">
                            <div className="card">
                                <div className="card-body text-muted">
                                    <h6>123, New krishna nagar near jain temple, Punjab, Inida,</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Address