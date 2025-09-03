import React from 'react'
import { Link } from 'react-router-dom'
import SellerSidebar from './SellerSidebar'

const Customers = () => {
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
                                    <tr>
                                        <td>1</td>
                                        <td>
                                            <p>John Doe</p>
                                        </td>
                                        <td>john@gmail.com</td>
                                        <td className="text-secondary">12345665</td>
                                      <td>
                                        <button className='btn btn-primary btn-sm '>Orders</button>
                                        <button className='btn btn-danger btn-sm ms-1'>Remove from list</button>
                                      </td>
                                      
                                    </tr>
                                  
                                    <tr>
                                        <td>2</td>
                                        <td>
                                            <p>Psy Kid</p>
                                        </td>
                                        <td>kid@gmail.com</td>
                                        <td className="text-secondary">345656734</td>
                                      <td>
                                               <button className='btn btn-primary btn-sm '>Orders</button>
                                        <button className='btn btn-danger btn-sm ms-1'>Remove from list</button>
                                      </td>
                                      
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

export default Customers