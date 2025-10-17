import React, { useContext, useState } from 'react'
import axios from 'axios'
import SellerSidebar from './SellerSidebar'
import { AuthContext } from '../../AuthProvider'

const SellerChangePassword = () => {
    const { vendorId, accessToken } = useContext(AuthContext)
    const baseUrl = "http://127.0.0.1:8000/api/"

    const [formData, setFormData] = useState({
        current_password: "",
        new_password: "",
        confirm_password: "",
    })
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setMessage("")

        if (!formData.new_password || !formData.confirm_password || !formData.current_password) {
            setError("Please fill in all fields.")
            return
        }
        if (formData.new_password !== formData.confirm_password) {
            setError("New password and confirm password do not match.")
            return
        }
        if (!vendorId) {
            setError("Vendor ID not found. Please log in again.")
            return
        }
        if (!accessToken) {
            setError("Session expired. Please log in again.")
            return
        }

        setLoading(true)
        try {
            const payload = {
                current_password: formData.current_password,
                new_password: formData.new_password,
                confirm_password: formData.confirm_password,
            }

            await axios.post(`${baseUrl}vendor/${vendorId}/change-password/`, payload, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            })

            setMessage("Password changed successfully!")
            setFormData({ current_password: "", new_password: "", confirm_password: "" })
        } catch (err) {
            const detail = err.response?.data?.detail
            const msg = typeof detail === 'string' ? detail : 'Failed to change password.'
            setError(msg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container mt-4">
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-3 col-12 mb-2">
                    <SellerSidebar />
                </div>

                <div className="col-md-9 col-12 ">

                    <h4 className='card-header'>Change Password</h4>

                    {message && <p className="text-success">{message}</p>}
                    {error && <p className="text-danger">{error}</p>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="current_password" className="form-label">Current Password</label>
                            <input type="password" className="form-control" id="current_password" name="current_password" value={formData.current_password} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="new_password" className="form-label">New Password</label>
                            <input type="password" className="form-control" id="new_password" name="new_password" value={formData.new_password} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirm_password" className="form-label">Confirm New Password</label>
                            <input type="password" className="form-control" id="confirm_password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} required />
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Updating...' : 'Change Password'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SellerChangePassword
