import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom" 
import axios from 'axios'
const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const baseUrl="http://127.0.0.1:8000/api/"
  const [formError, setFormError] = useState(false)
  const [error, setError] = useState('')
  const userData = {
    username, password
  }
  const handleSubmit =async () => {
   
    try {
      const response= await axios.post(`${baseUrl}customer/login/`,userData)
      //  console.log("Response==> ",response.data)
       if (response.data.bool==false){
        setFormError(true)
        // console.log("Response:msg==> ",response.data)
        setError(response.data.msg)
       }else{
         setFormError(true)
         localStorage.setItem("Customer_username",response.data.user)
         localStorage.setItem("Customer_login",response.data.customer_login)
        //  console.log("Response==> ",response.data)
        //  console.log("Login Succesfull")
       }
    } catch (err) {
      console.error(err)
      console.log("ResponseError==> ",err.data)
    }
   const checkCustomer=localStorage.getItem("Customer_login")
    if(checkCustomer){
      navigate('/customer/dashboard')
    }
 
  }
  useEffect(()=>{
    handleSubmit()
  },[])
  return (
    <div className="container mt-4">

      <div className="row">
        <div className="col-md-8 col-12 offset-2">
          <div className="card">
            <h4 className='card-header'>Login</h4>
            <div className="card-body">
              <form onSubmit={(e)=>handleSubmit(e.preventDefault())}>

                <div className="mb-3">
                  <label htmlFor="username" className="form-label ">UserName</label>
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" id="username" />

                </div>

                <div className="mb-3">
                  <label htmlFor="password"  className="form-label">Password</label>
                  <input type="password" value={password}  onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" />
                </div>

                <button type="submit" className="btn btn-primary mb-4">Submit</button>
              </form>
              {formError &&  <p className='text-danger '>{error}</p>}
             
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Login