import React, { useState } from 'react'
import { useNavigate } from "react-router-dom" 
import axios from 'axios'

const SellerLogin = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const baseUrl = "http://127.0.0.1:8000/api/"
  const [formError, setFormError] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ prevent reload on submit

    const userData = { username, password }
try {
      const res = await axios.post('http://localhost:8000/api/token/',  userData
      );
      console.log(res)
      const  access  = res.data.access;  // JWT tokens
      const  refresh  = res.data.refresh;  // JWT tokens
      localStorage.setItem('accessToken', access);  // Store tokens
      localStorage.setItem('refreshToken', refresh);
      // window.location.href = '/protected';  // Redirect to protected page
    } catch (err) {
      setError('Login failed. Check credentials.');
      console.error(err);
    }
  
    try {
      const response = await axios.post(`${baseUrl}vendor/login/`, userData)

      if (response.data.bool === false) {
        setFormError(true)
        setError(response.data.msg)
      } else {
        setFormError(false)
        localStorage.setItem("Vendor_username", response.data.user)
        localStorage.setItem("Vendor_login", response.data.vendor_login)
        localStorage.setItem("Vendor_id", response.data.vendor_id)
        console.log("Login Success==>", response.data)

        // ✅ redirect to dashboard after login
        navigate('/seller/dashboard')
      }
    } catch (err) {
      console.error("Login Error==>", err)
      setFormError(true)
      setError("Something went wrong. Please try again.")
    }
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 col-12 offset-2">
          <div className="card">
            <h4 className='card-header'>Login</h4>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label ">UserName</label>
                  <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    className="form-control" 
                    id="username" 
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input 
                    type="password" 
                    value={password}  
                    onChange={(e) => setPassword(e.target.value)} 
                    className="form-control" 
                    id="password" 
                  />
                </div>

                <button type="submit" className="btn btn-primary mb-4">Submit</button>
              </form>

              {formError && <p className='text-danger'>{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellerLogin
