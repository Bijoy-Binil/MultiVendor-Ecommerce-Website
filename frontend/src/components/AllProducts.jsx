import React from 'react'
import SingleProduct from './SingleProduct'

const AllProducts = () => {
  return (
    <>
   <div className="container mt-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold text-primary "> All Products</h4>
          
          </div>
          <div className="row">
            {/* Box Products */}
           <SingleProduct title="Django Project1"/>
           <SingleProduct title="Django Project2"/>
           <SingleProduct title="Django Project3"/>
           <SingleProduct title="Django Project"/>
           <SingleProduct title="Django Project5"/>
           <SingleProduct title="Django Project6"/>
           <SingleProduct title="Django Project7"/>
           <SingleProduct title="Django Project8"/>
            
            {/* Additional product cards would go here */}
          </div>
        </div>
        <nav aria-label="Page navigation example">
  <ul className="pagination flex justif">
    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
    <li className="page-item"><a className="page-link" href="#">1</a></li>
    <li className="page-item"><a className="page-link" href="#">2</a></li>
    <li className="page-item"><a className="page-link" href="#">3</a></li>
    <li className="page-item"><a className="page-link" href="#">Next</a></li>
  </ul>
</nav>
</>
  )
}

export default AllProducts