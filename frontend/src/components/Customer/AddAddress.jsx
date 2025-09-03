import React from 'react'
import Sidebar from './Sidebar'

const AddAddress = () => {
  return (
     <div className="container mt-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-12 mb-2">
          <Sidebar />
        </div>

        <div className="col-md-9 col-12">
          <div className="card">
            <h4 className='card-header'>Add address</h4>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <textarea  className="form-control" id="address" />
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

export default AddAddress