import React from 'react'
import logo from "./../images/logo.jpg";
import { Link } from 'react-router-dom';

const Categories = () => {
  return (
    <div>

       {/* All Cateories */}
               <div className="container">
                 <div className="d-flex justify-content-between align-items-center mb-4">
                   <h4 className="fw-bold text-primary ">All Categories</h4>
                   <a className="btn btn-outline-primary rounded-pill px-4" href="">
                     View All Products <i className="fas fa-arrow-right ms-2"></i>
                   </a>
                 </div>
                 <div className="row">
                   {/* Box Products */}
                   <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
                     <div className="card h-100 shadow-sm border-0">
                       <div className="position-relative overflow-hidden" style={{height: "200px"}}>
                         <img 
                           src={logo} 
                           className="card-img-top h-100 object-fit-cover" 
                           alt="Product" 
                           style={{transition: "transform 0.3s"}}
                           onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                           onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                         />
                   
                       </div>
                       <div className="card-body pb-0">
                         <h5 className="card-title fw-bold"><Link to="/category/python/1">Title !</Link></h5>
                   
                         <div className="d-flex justify-content-between align-items-center">
                           <p className="text-secondary  mb-0">Product Downloads: 1234</p>
                       
                         </div>
                       </div>
                       <div className="card-footer bg-white border-0 d-grid gap-2">
                 
                       </div>
                     </div>
                   </div>
                   
                   {/* Additional product cards would go here */}
                 </div>
               </div>
                     <nav aria-label="Page navigation example">
  <ul className="pagination flex justif">
    <li className="page-item"><a class="page-link" href="#">Previous</a></li>
    <li className="page-item"><a class="page-link" href="#">1</a></li>
    <li className="page-item"><a class="page-link" href="#">2</a></li>
    <li className="page-item"><a class="page-link" href="#">3</a></li>
    <li className="page-item"><a class="page-link" href="#">Next</a></li>
  </ul>
</nav>
    </div>
  )
}

export default Categories