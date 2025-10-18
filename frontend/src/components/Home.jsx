import React, { useEffect, useState } from "react";
import logo from "./../images/logo.jpg";
import SwiperReact from "./SwiperReact";
import { Link } from "react-router-dom";
import SingleProduct from "./SingleProduct";
import SingleVendor from "./Seller/SingleVendor";

const Home = () => {
  const baseUrl = "http://127.0.0.1:8000/api/products/";
  const vendorsUrl = "http://127.0.0.1:8000/api/vendors/";
  const categoriesUrl = "http://127.0.0.1:8000/api/categories/?fetch_limit=4";

  const [products, setProducts] = useState([]);
  const [popularSellers, setPopularSellers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

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

  // Fetch latest categories
  const fetchCategories = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setCategories(data.results))
      .catch((err) => console.error("Error fetching categories:", err));
  };

  // Fetch popular products
  const fetchPopularProducts = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setPopularProducts(data.results))
      .catch((err) => console.error("Error fetching popular products:", err));
  };

  useEffect(() => {
    fetchData(`${baseUrl}?fetch_limit=4`);
    fetchSellers(vendorsUrl);
    fetchCategories(categoriesUrl);
fetchPopularProducts(`${baseUrl}?fetch_limit=4&order=first`);
  }, []);


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

        {/* Latest Categories */}
        <div className="container mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold text-primary">Latest Categories</h4>
            <Link to="/categories" className="btn btn-outline-primary rounded-pill px-4">
              View All Categories <i className="fas fa-arrow-right ms-2"></i>
            </Link>
          </div>
          <div className="row">
            {categories?.length > 0
              ? categories.map((cat, i) => (
                  <div key={i} className="col-6 col-md-4 col-lg-3 mb-3">
                    <Link to={`/category/${cat.title}/${cat.id}`} className="text-decoration-none">
                      <div className="card h-100 shadow-sm border-0 hover-card" 
                           style={{ 
                             transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                             cursor: 'pointer'
                           }}
                           onMouseOver={(e) => {
                             e.currentTarget.style.transform = 'translateY(-5px)';
                             e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                           }}
                           onMouseOut={(e) => {
                             e.currentTarget.style.transform = 'translateY(0)';
                             e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                           }}>
                        <div className="position-relative overflow-hidden" style={{ height: "150px" }}>
                          {cat.image ? (
                            <img
                              src={cat.image}
                              className="card-img-top h-100 object-fit-cover"
                              alt={cat.title}
                              style={{ transition: "transform 0.3s" }}
                              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                            />
                          ) : (
                            <div 
                              className="card-img-top h-100 d-flex align-items-center justify-content-center"
                              style={{ 
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white'
                              }}
                            >
                              <div className="text-center">
                                <i className="fas fa-tags" style={{ fontSize: '2rem', marginBottom: '5px' }}></i>
                                <h6 className="mb-0">{cat.title}</h6>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="card-body p-3 text-center">
                          <h6 className="fw-bold text-dark mb-2">{cat.title}</h6>
                          {cat.detail && (
                            <p className="text-muted small mb-0" style={{ fontSize: '0.8rem' }}>
                              {cat.detail.length > 50 ? `${cat.detail.substring(0, 50)}...` : cat.detail}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              : <div className="col-12 text-center">
                  <p className="text-muted">No categories available.</p>
                </div>
            }
          </div>
        </div>

        {/* Popular Products */}
        <div className="container mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold text-primary">Popular Products</h4>
            <Link className="btn btn-outline-primary rounded-pill px-4" to="/products">
              View All Products <i className="fas fa-arrow-right ms-2"></i>
            </Link>
          </div>
          <div className="row">
            {popularProducts?.length > 0
              ? popularProducts.map((product, i) => <SingleProduct key={i} product={product} news={news} />)
              : <div className="col-12 text-center">
                  <p className="text-muted">No popular products available.</p>
                </div>
            }
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
