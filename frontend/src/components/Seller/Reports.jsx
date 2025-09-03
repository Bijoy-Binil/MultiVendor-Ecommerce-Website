import React from 'react'
import SellerSidebar from './SellerSidebar'

const Reports = () => {
  return (
      <div className="container mt-4">
      {" "}
      <div className="row">
        {" "}
       <div className="col-md-3 col-12">
     <SellerSidebar/>
       </div>
        <div className="col-md-9 col-12 mb-2">

            <div className="row">
                <div className="col-md-4 mb-2">
                    <div className="card">
                        <div className="card-body text-center ">
                        <h3>Daily reports</h3>
                        <h4><a  className="btn btn-info" href="">View</a></h4>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-2">
                    <div className="card">
                        <div className="card-body text-center">
                       <h3>Monthly reports</h3>
                        <h4><a  className="btn btn-info" href="">View</a></h4>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-2">
                    <div className="card">
                        <div className="card-body text-center">
                      <h3>Yearly reports</h3>
                        <h4><a  className="btn btn-info" href="">View</a></h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>{" "}
    </div>
  )
}

export default Reports