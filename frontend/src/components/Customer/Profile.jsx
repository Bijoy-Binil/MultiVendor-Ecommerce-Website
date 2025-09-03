import React from 'react'
import Sidebar from './Sidebar'

const Profile = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-12 mb-2">
          <Sidebar />
        </div>

        <div className="col-md-9 col-12">
          <div className="card">
            <h4 className='card-header'>Update profile</h4>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="firstname" className="form-label">First Name</label>
                  <input type="text" className="form-control" id="firstname" />
                </div>

                <div className="mb-3">
                  <label htmlFor="lastname" className="form-label">Last Name</label>
                  <input type="text" className="form-control" id="lastname" />
                </div>

                <div className="mb-3">
                  <label htmlFor="username" className="form-label">UserName</label>
                  <input type="text" className="form-control" id="username" />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="email" />
                </div>

                <div className="mb-3">
                  <label htmlFor="avatar" className="form-label">Choose a profile picture:</label>
                  <input
                    className="form-control mt-2"
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/png, image/jpeg"
                  />
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

export default Profile
