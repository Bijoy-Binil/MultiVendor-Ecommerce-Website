import React from 'react'

import SellerSidebar from './SellerSidebar'

const SellerChangePassword = () => {
    return (
        <div className="container mt-4">
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-3 col-12 mb-2">
                    <SellerSidebar />
                </div>

                <div className="col-md-9 col-12 ">

                    <h4 className='card-header'>Change Password</h4>

                    <form>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">New Password</label>
                            <input type="password" className="form-control" id="password" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="changepassword" className="form-label">Change Password</label>
                            <input type="password" className="form-control" id="changepassword" />
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SellerChangePassword
