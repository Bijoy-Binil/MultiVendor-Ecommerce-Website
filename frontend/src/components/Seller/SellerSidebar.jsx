import React from 'react'
import { Link } from 'react-router-dom'

const SellerSidebar = () => {
    return (
        <div className="list-group">

            <Link to="/seller/dashboard" className="list-group-item list-group-item-action active">DashBoard</Link>
             <Link to="/seller/orders" className="list-group-item list-group-item-action">Products</Link>
             <Link to="/seller/wishlist" className="list-group-item list-group-item-action">Orders</Link>
             <Link to="/seller/profile" className="list-group-item list-group-item-action">Customers</Link>
             <Link to="/seller/address" className="list-group-item list-group-item-action">Reports</Link>
             <Link to="/seller/changepassword" className="list-group-item list-group-item-action">Change Password</Link>
             <Link to="/seller/logout" className="list-group-item list-group-item-action text-danger">Logout</Link>
        </div>
    )
}

export default SellerSidebar