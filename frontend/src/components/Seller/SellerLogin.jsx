import React from 'react'

const SellerLogin = () => {
  return (
    <div className="container mt-4">
      
    <div className="row">
        <div className="col-md-8 col-12 offset-2">
<div className="card">
    <h4 className='card-header'>Login</h4>
    <div className="card-body">
        <form>

  <div className="mb-3">
    <label for="username" className="form-label ">UserName</label>
    <input type="text" className="form-control" id="username"/>
    
  </div>

  <div className="mb-3">
    <label for="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password"/>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
</div>
        </div>
    </div>
    
    </div>
  )
}

export default SellerLogin