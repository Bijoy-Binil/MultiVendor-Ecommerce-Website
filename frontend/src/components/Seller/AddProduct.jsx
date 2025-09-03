import React from 'react'
import SellerSidebar from './SellerSidebar'

const AddProduct = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-12 mb-2">
          <SellerSidebar />
        </div>

        <div className="col-md-9 col-12">
          <div className="card">
            <h4 className='card-header'>Add Products</h4>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Category</label>
                  <input type="text" className="form-control" id="category" />
                  <select className='form-control' name="" id="">
                    <option value="">Python</option>
                    <option value="">Php</option>
                    <option value="">Javacript</option>
                    <option value="">Java</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="title" />
                </div>

                <div className="mb-3">
                  <label htmlFor="price" className="form-label">Price</label>
                  <input type="number" className="form-control" id="price" />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea className="form-control" id="description" rows={8} />
                </div>

                <div className="mb-3">
                  <label htmlFor="productimages" className="form-label">Product Images</label>
                  <input
                    className="form-control "
                    type="file"
                    id="productimages"


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

export default AddProduct
