import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "./../images/logo.jpg";
import { AuthContext, CartContext } from "../AuthProvider";


const Checkout = () => {
  const { cartData, setCartData } = useContext(CartContext)
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
  const [cartButtonClick, setCartButtonClick] = useState(false)
  const [products, setProducts] = useState([])


  const cartRemoveButtonHandler = (product_id) => {
    let prevCart = localStorage.getItem("cartData");
    let carts = prevCart ? JSON.parse(prevCart) : [];
    let updatedCart = carts.filter(cart => cart.product.id !== product_id);
    localStorage.setItem("cartData", JSON.stringify(updatedCart));
    setCartButtonClick(false);

  }
var sum=0
cartData.map((item,index)=>{
  sum+=parseFloat(item.product.price)
})
  return (
    <div className="container mt-4">
      <h3 className="mb-4">All Items {cartData.length}</h3>
      <div className="row">
        <div className=" col-12">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartData.map((item, index) => {
                  return <>
                    <tr>
                      <td>{index + 1}</td>
                      <td>
                        <Link><img
                          src={item.product.image}
                          className="img-thumbnail"
                          width="90"
                          alt="Product"
                        />
                          <p>{item.product.title}</p></Link>
                      </td>
                      <td>{item.product.price}</td>
                      <td>  <button type="button" onClick={()=>cartRemoveButtonHandler(item.product.id)} className="btn btn-sm btn-danger rounded-pill shadow-sm mx-2">
                        <i className="fa-solid fa-cart-shopping me-2"></i>
                        Remove from cart
                      </button></td>

                    </tr>

                  </>
                })}


              </tbody>
              <tfoot>
                <tr>
                  <th></th>
                  <th>Total</th>
                  <th>{ sum}</th>
                </tr>
                <tr>

                  {cartData.length == 0 ? (<td colSpan="3"  >
                    <Link to="/" className="btn btn-info mx-2">Home</Link>

                  </td>) : (<td colSpan="3" align="right" >
                    <Link to="/categories" className="btn btn-secondary mx-2">Contine Shopping</Link>
                   {isLoggedIn? (<Link to="/confirm-order" className="btn btn-success">Proceed to payment</Link>):
                   (<Link to="/customer/login" className="btn btn-success">Proceed to payment</Link>)}
                  </td>)}
                </tr>

              </tfoot>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Checkout;
