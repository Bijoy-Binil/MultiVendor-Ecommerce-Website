import React from 'react'
import logo from "./../images/logo.jpg";
import SwiperReact from './SwiperReact';
import { Link } from 'react-router-dom';
import SingleProduct from './SingleProduct';

const Home = () => {
  const news = (
    <span className="position-absolute top-0 start-0 bg-danger text-white px-2 py-1 m-2 rounded-pill small">
      New
    </span>
  );
  return (
    <div>

      <main className="my-4">
        {/* Latest Products */}
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold text-primary">Latest Products</h4>
            <Link className="btn btn-outline-primary rounded-pill px-4" to="/products">
              View All Products <i className="fas fa-arrow-right ms-2"></i>
            </Link>
          </div>
          <div className="row">
            {/*  Box Products */}
            <SingleProduct news={news} />
            <SingleProduct news={news} />
            <SingleProduct news={news} />
            <SingleProduct news={news} />
            {/* Additional product cards would go here */}
          </div>
        </div>

        {/* Popular Cateories */}
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold text-primary ">Popular Categories</h4>
            <Link to="/categories" className="btn btn-outline-primary rounded-pill px-4" href="">
              View All Categories <i className="fas fa-arrow-right ms-2"></i>
            </Link>
          </div>
          <div className="row">
            {/* Box Products */}
            <SingleProduct />
            <SingleProduct />
            <SingleProduct />
            <SingleProduct />

            {/* Additional product cards would go here */}
          </div>
        </div>
        {/* Popular Products */}
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold text-primary">Popular Products</h4>
            <a className="btn btn-outline-primary rounded-pill px-4" href="">
              View All Products <i className="fas fa-arrow-right ms-2"></i>
            </a>
          </div>
          <div className="row">
            {/* Box Products */}
            <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="position-relative overflow-hidden" style={{ height: "200px" }}>
                  <img
                    src={logo}
                    className="card-img-top h-100 object-fit-cover"
                    alt="Product"
                    style={{ transition: "transform 0.3s" }}
                    onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                  />

                </div>
                <div className="card-body pb-0">
                  <h5 className="card-title fw-bold">Title !</h5>

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
        {/* Popular Sellers */}
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold text-primary">Popular Seller</h4>
            <a className="btn btn-outline-primary rounded-pill px-4" href="">
              View All Products <i className="fas fa-arrow-right ms-2"></i>
            </a>
          </div>
          <div className="row">
            {/* Seller Box  */}
            <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="position-relative overflow-hidden" style={{ height: "200px" }}>
                  <img
                    src={logo}
                    className="card-img-top h-100 object-fit-cover"
                    alt="Product"
                    style={{ transition: "transform 0.3s" }}
                    onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                  />

                </div>
                <div className="card-body pb-0">
                  <h5 className="card-title fw-bold">Title !</h5>

                  <div className="d-flex justify-content-between align-items-center">
                    <p className="text-secondary  mb-0">Seller Name: </p>
                    <a href="">Categories:</a>
                  </div>
                </div>
                <div className="card-footer bg-white border-0 d-grid gap-2">

                </div>
              </div>
            </div>

            {/* Additional product cards would go here */}
          </div>
          <SwiperReact />
        </div>
      </main>

    </div>
  )
}

export default Home