import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom" 
import axios from 'axios'
const SellerRegister = () => {
  const baseUrl="http://127.0.0.1:8000/api/"
  const [username, setUserName] = useState("")
  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [password, setPassword] = useState("")
  const [mobile, setMobile] = useState("")
  const [formError, setFormError] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const userData = {
    username, password,first_name,address,last_name,email,mobile
  }
  const navigate = useNavigate()
  const submitHandler= async ()=>{
   
    try {
     const response=await axios.post(`${baseUrl}vendor/register`,userData)
     
     if(response.data.bool==false){
      setFormError(true)
      setError(response.data.msg)
      // console.log("Response fail==>",response.data)
     }else{
      // console.log('Registration Successful')
      // console.log("Response Success==>",response.data)
      setSuccess(response.data.msg)
      setTimeout(()=>[
        navigate('/seller/login')
      ],3000)
      
     }
    } catch (err) {
      console.error(err)

    }
  }

  return (
    
   <div className="container mt-4">
      
    <div className="row">
        <div className="col-md-8 col-12 offset-2">
<div className="card">
    <h4 className='card-header'>Register</h4>
    <div className="card-body">
        <form onSubmit={(e)=>submitHandler(e.preventDefault())}>
  <div className="mb-3">
    <label htmlFor="firstname" className="form-label ">First Name</label>
    <input type="text" value={first_name} onChange={(e)=>setFirstName(e.target.value)} className="form-control" id="firstname"/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="lastname" className="form-label ">Last Name</label>
    <input type="text" value={last_name} onChange={(e)=>setLastName(e.target.value)} className="form-control" id="lastname"/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="username" className="form-label ">UserName</label>
    <input type="text" value={username} onChange={(e)=>setUserName(e.target.value)} className="form-control" id="username"/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label ">Email address</label>
    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" id="email"/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="address" className="form-label ">Address</label>
    <textarea  value={address} onChange={(e)=>setAddress(e.target.value)} className="form-control" id="address"/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="mobile" className="form-label ">Mobile</label>
    <input type="number" value={mobile} onChange={(e)=>setMobile(e.target.value)} className="form-control" id="mobile"/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" id="password"/>
  </div>

  <button type="submit"  className="btn btn-primary">Submit</button>
  
</form>     
   { formError ?  (<p className="text-danger">{error}</p>):( <p className="text-success">{success}</p>)}
  
    </div>
</div>
        </div>
    </div>
    
    </div>
  )
}

export default SellerRegister