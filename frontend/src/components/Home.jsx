import React, { useEffect, useState } from "react";
import logo from "./../images/logo.jpg";
import SwiperReact from "./SwiperReact";
import { Link } from "react-router-dom";
import SingleProduct from "./SingleProduct";
import SingleVendor from "./Seller/SingleVendor";

const Home = () => {
  const baseUrl = "http://127.0.0.1:8000/api/products/";
  const vendorsUrl = "http://127.0.0.1:8000/api/vendors/";

  const [products, setProducts] = useState([]);
  const [popularSellers, setPopularSellers] = useState([]);

  // Fetch latest products
  const fetchData = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setProducts(data.results))
      .catch((err) => console.error("Error fetching products:", err));
  };

  // Fetch popular sellers
  const fetchSellers = (url) => {
    fetch(url + "?limit=4")
      .then((res) => res.json())
      .then((data) => setPopularSellers(data.results))
      .catch((err) => console.error("Error fetching sellers:", err));
  };

  useEffect(() => {
    fetchData(`${baseUrl}?fetch_limit=4`);
    fetchSellers(vendorsUrl);
  }, []);

  const sampleProducts = [
    { id: 1, title: "Python Bot", category: { detail: "Automation Tools" }, price: "$49.99" },
    { id: 2, title: "React Dashboard", category: { detail: "Frontend Templates" }, price: "$29.99" },
    { id: 3, title: "Django Ecommerce", category: { detail: "Backend Projects" }, price: "$79.99" },
    { id: 4, title: "Stock Prediction AI", category: { detail: "Machine Learning" }, price: "$99.99" },
  ];

  const news = (
    <span className="position-absolute top-0 start-0 bg-danger text-white px-2 py-1 m-2 rounded-pill small">
      New
    </span>
  );

  return (
    <div>
      <main className="my-4">
        {/* Latest Products */}
        <div className="container mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold text-primary">Latest Products</h4>
            <Link className="btn btn-outline-primary rounded-pill px-4" to="/products">
              View All Products <i className="fas fa-arrow-right ms-2"></i>
            </Link>
          </div>
          <div className="row mb-4">
            {products?.length > 0
              ? products.map((p, i) => <SingleProduct key={i} product={p} news={news} />)
              : <p className="text-muted">No products available.</p>
            }
          </div>
        </div>

        {/* Popular Categories */}
        <div className="container mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold text-primary">Popular Categories</h4>
            <Link to="/categories" className="btn btn-outline-primary rounded-pill px-4">
              View All Categories <i className="fas fa-arrow-right ms-2"></i>
            </Link>
          </div>
          <div className="row mb-4">
            {sampleProducts.map((p, i) => <SingleProduct key={i} product={p} news={news} />)}
          </div>
        </div>

        {/* Popular Products */}
        <div className="container mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold text-primary">Popular Products</h4>
            <a className="btn btn-outline-primary rounded-pill px-4" href="#">
              View All Products <i className="fas fa-arrow-right ms-2"></i>
            </a>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="position-relative overflow-hidden" style={{ height: "200px" }}>
                  <img
                    src={logo}
                    className="card-img-top h-100 object-fit-cover"
                    alt="Product"
                    style={{ transition: "transform 0.3s" }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                </div>
                <div className="card-body pb-0">
                  <h5 className="card-title fw-bold">Title !</h5>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="text-secondary mb-0">Product Downloads: 1234</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Sellers */}
        <div className="container mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold text-primary">Popular Sellers</h4>
            <Link to="/vendors" className="btn btn-outline-primary rounded-pill px-4">
              View All Sellers <i className="fas fa-arrow-right ms-2"></i>
            </Link>
          </div>
          <div className="row">
            {popularSellers?.length > 0
              ? popularSellers.map((vendor, i) => <SingleVendor key={i} product={vendor} />)
              : <p className="text-muted">No popular sellers available.</p>
            }
          </div>
        </div>

        {/* Testimonials / Swiper */}
        <div className="container mb-5">
          <SwiperReact />
        </div>
      </main>
    </div>
  );
};

export default Home;
