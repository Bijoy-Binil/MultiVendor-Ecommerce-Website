//Packages
import { Link } from "react-router-dom";
//Assets
import logo from "./../images/logo.jpg";
const SingleProduct = ({news,title}) => {
  return (
  <>
   <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="position-relative overflow-hidden" style={{height: "200px"}}>
                <Link to="/product/python-bot/1" > <img 
                    src={logo} 
                    className="card-img-top h-100 object-fit-cover" 
                    alt="Product" 
                    style={{transition: "transform 0.3s"}}
                    onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                  /></Link> 
                  {news}
                </div>
                <div className="card-body pb-0">
                  <Link to="/product/python-bot/1" ><h5 className="card-title fw-bold">{title}</h5></Link>
                  <p className="card-text text-muted small">Powerful gaming performance with stunning graphics</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="text-muted small ">Rs. 500</h5>
        
                  </div>
                </div>
                <div className=" bg-white ">
                <button className="btn btn-sm btn-primary rounded-pill shadow-sm mx-2">
  <i className="fa-solid fa-cart-shopping me-2"></i>
  Add To Cart
</button>

<button className="btn btn-sm btn-outline-danger rounded-pill shadow-sm">
  <i className="fa-solid fa-heart me-2"></i>
  Wishlist
</button>

                </div>
              </div>
            </div>
            
              </>
  )
}

export default SingleProduct