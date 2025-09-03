import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="list-group">

            <Link to="/customer/dashboard" className="list-group-item list-group-item-action active">DashBoard</Link>
             <Link to="/customer/orders" className="list-group-item list-group-item-action">Orders</Link>
             <Link to="/customer/wishlists" className="list-group-item list-group-item-action">Wishlists</Link>
             <Link to="/customer/profile" className="list-group-item list-group-item-action">Profile</Link>
             <Link to="/customer/address" className="list-group-item list-group-item-action">Addressess</Link>
             <Link to="/customer/logout" className="list-group-item list-group-item-action text-danger">Logout</Link>
        </div>
    )
}

export default Sidebar