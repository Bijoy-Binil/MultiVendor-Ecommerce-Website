import React, { useEffect, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(true);

  // Fetch latest products
  const fetchData = (url) => {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => setProducts(data.results))
      .catch((err) => console.error("Error fetching products:", err));
  };

  // Fetch popular sellers
  const fetchSellers = (url) => {
    return fetch(url + "?limit=4")
      .then((res) => res.json())
      .then((data) => setPopularSellers(data.results))
      .catch((err) => console.error("Error fetching sellers:", err));
  };

  // Fetch latest categories
  const fetchCategories = (url) => {
    return fetch(url)
      .then((res) => res.json())
      .then((data) => setCategories(data.results))
      .catch((err) => console.error("Error fetching categories:", err));
  };

  // Fetch popular products
  const fetchPopularProducts = (url) => {
    return fetch(url)
      .then((res) => res.json())
      .then((data) => setPopularProducts(data.results))
      .catch((err) => console.error("Error fetching popular products:", err));
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      fetchData(`${baseUrl}?fetch_limit=4`),
      fetchSellers(vendorsUrl),
      fetchCategories(categoriesUrl),
      fetchPopularProducts(`${baseUrl}?fetch_limit=4&order=first`)
    ]).finally(() => setIsLoading(false));
  }, []);

  const news = (
    <span className="position-absolute top-0 start-0 bg-danger text-white px-2 py-1 m-2 rounded-pill small">
      New
    </span>
  );

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Banner Section */}
      <section className="hero-banner position-relative mt-1 overflow-hidden">
        <div className="container-fluid px-0">
          <div className="row g-0">
            <div className="col-12">
              <div className="banner-container position-relative">
                <img 
                  src="/Banners.jpg"
                  alt="Special Offers - Shop Now" 
                  className="banner-image w-100"
                  style={{ 
                    height: '500px', 
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                />
                <div className="banner-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center">
                  <div className="container">
                    <div className="row justify-content-start">
                      <div className="col-lg-6 col-md-8">
                        <div className="banner-content text-white p-4 rounded" 
                             style={{ 
                               background: 'rgba(0,0,0,0.6)',
                               backdropFilter: 'blur(10px)'
                             }}>
                          <h1 className="display-4 fw-bold mb-3">Summer Sale</h1>
                          <p className="lead mb-4">Up to 50% off on selected items. Limited time offer!</p>
                          <div className="banner-actions">
                            <Link to="/products" className="btn btn-primary btn-lg me-3 px-4 py-2 rounded-pill fw-semibold">
                              Shop Now <i className="fas fa-arrow-right ms-2"></i>
                            </Link>
                            <Link to="/categories" className="btn btn-outline-light btn-lg px-4 py-2 rounded-pill fw-semibold">
                              Browse Categories
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="my-5">
        {/* Features Section */}
        <section className="features-section py-5 bg-light">
          <div className="container">
            <div className="row g-4">
              <div className="col-md-3 col-6">
                <div className="text-center">
                  <div className="feature-icon bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                       style={{ width: '70px', height: '70px' }}>
                    <i className="fas fa-shipping-fast text-white fs-4"></i>
                  </div>
                  <h6 className="fw-bold mb-2">Free Shipping</h6>
                  <p className="text-muted small mb-0">On orders over $50</p>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="text-center">
                  <div className="feature-icon bg-success rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                       style={{ width: '70px', height: '70px' }}>
                    <i className="fas fa-undo-alt text-white fs-4"></i>
                  </div>
                  <h6 className="fw-bold mb-2">Easy Returns</h6>
                  <p className="text-muted small mb-0">30-day return policy</p>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="text-center">
                  <div className="feature-icon bg-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                       style={{ width: '70px', height: '70px' }}>
                    <i className="fas fa-shield-alt text-white fs-4"></i>
                  </div>
                  <h6 className="fw-bold mb-2">Secure Payment</h6>
                  <p className="text-muted small mb-0">100% secure payment</p>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="text-center">
                  <div className="feature-icon bg-info rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                       style={{ width: '70px', height: '70px' }}>
                    <i className="fas fa-headset text-white fs-4"></i>
                  </div>
                  <h6 className="fw-bold mb-2">24/7 Support</h6>
                  <p className="text-muted small mb-0">Dedicated support</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Products */}
        <section className="latest-products py-5">
          <div className="container">
            <div className="section-header d-flex justify-content-between align-items-center mb-5">
              <div>
                <h2 className="fw-bold text-dark mb-2">Latest Products</h2>
                <p className="text-muted">Discover our newest arrivals</p>
              </div>
              <Link className="btn btn-outline-primary rounded-pill px-4 py-2 fw-semibold" to="/products">
                View All <i className="fas fa-arrow-right ms-2"></i>
              </Link>
            </div>
            <div className="row g-4">
              {products?.length > 0 ? (
                products.map((p, i) => <SingleProduct key={i} product={p} news={news} />)
              ) : (
                <div className="col-12 text-center py-5">
                  <i className="fas fa-box-open text-muted mb-3" style={{ fontSize: '3rem' }}></i>
                  <p className="text-muted fs-5">No products available at the moment.</p>
                </div>
              )}
            </div>
          </div>
        </section>

       {/* Categories Section */}
<section className="categories-section py-5 bg-light">
  <div className="container">
    {/* Section Header */}
    <div className="section-header d-flex justify-content-between align-items-center mb-5">
      <div>
        <h2 className="fw-bold text-dark mb-2">Shop by Category</h2>
        <p className="text-muted mb-0">Browse through our curated collections</p>
      </div>
      <Link
        to="/categories"
        className="btn btn-outline-primary rounded-pill px-4 py-2 fw-semibold"
      >
        View All <i className="fas fa-arrow-right ms-2"></i>
      </Link>
    </div>

    {/* Categories Grid */}
    <div className="row g-4">
      {categories?.length > 0 ? (
        categories.map((cat, i) => (
          <div key={i} className="col-6 col-md-4 col-lg-3">
            <Link
              to={`/category/${cat.title}/${cat.id}`}
              className="text-decoration-none"
            >
              <div
                className="category-card card h-100 border-0 shadow-sm overflow-hidden"
                style={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer",
                  borderRadius: "12px",
                }}
              >
                {/* Image Section */}
                <div
                  className="position-relative overflow-hidden"
                  style={{ height: "220px" }}
                >
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="card-img-top h-100 w-100 object-fit-cover"
                      style={{
                        transition: "transform 0.5s ease",
                        objectPosition: "center",
                      }}
                    />
                  ) : (
                    <div
                      className="card-img-top h-100 w-100 d-flex align-items-center justify-content-center"
                      
                    >
                      <div className="text-center">
                        <i
                          className="fas fa-tags mb-2"
                          style={{ fontSize: "2rem" }}
                        ></i>
                        <h6 className="mb-0 fw-bold">{cat.title}</h6>
                      </div>
                    </div>
                  )}

                
                   
         
                </div>

                {/* Text Section */}
                <div className="card-body text-center p-3">
                  <h6 className="fw-bold text-dark mb-2">{cat.title}</h6>
                  {cat.detail && (
                    <p
                      className="text-muted small mb-0"
                      style={{ fontSize: "0.85rem" }}
                    >
                      {cat.detail.length > 60
                        ? `${cat.detail.substring(0, 50)}...`
                        : cat.detail}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <div className="col-12 text-center py-5">
          <i
            className="fas fa-folder-open text-muted mb-3"
            style={{ fontSize: "3rem" }}
          ></i>
          <p className="text-muted fs-5">No categories available.</p>
        </div>
      )}
    </div>
  </div>

  {/* Inline CSS for hover effects */}
  <style jsx>{`
    .category-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
    }

    .category-card:hover .card-img-top {
      transform: scale(1.08);
    }

    .category-card:hover .category-overlay {
      opacity: 1;
    }
  `}</style>
</section>


        {/* Popular Products */}
        <section className="popular-products py-5">
          <div className="container">
            <div className="section-header d-flex justify-content-between align-items-center mb-5">
              <div>
                <h2 className="fw-bold text-dark mb-2">Popular Products</h2>
                <p className="text-muted">Trending now among our customers</p>
              </div>
              <Link className="btn btn-outline-primary rounded-pill px-4 py-2 fw-semibold" to="/products">
                View All <i className="fas fa-arrow-right ms-2"></i>
              </Link>
            </div>
            <div className="row g-4">
              {popularProducts?.length > 0 ? (
                popularProducts.map((product, i) => <SingleProduct key={i} product={product} news={news} />)
              ) : (
                <div className="col-12 text-center py-5">
                  <i className="fas fa-fire text-muted mb-3" style={{ fontSize: '3rem' }}></i>
                  <p className="text-muted fs-5">No popular products available.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Popular Sellers */}
        <section className="popular-sellers py-5 bg-light">
          <div className="container">
            <div className="section-header d-flex justify-content-between align-items-center mb-5">
              <div>
                <h2 className="fw-bold text-dark mb-2">Top Sellers</h2>
                <p className="text-muted">Shop from our trusted vendors</p>
              </div>
              <Link to="/vendors" className="btn btn-outline-primary rounded-pill px-4 py-2 fw-semibold">
                View All <i className="fas fa-arrow-right ms-2"></i>
              </Link>
            </div>
            <div className="row g-4">
              {popularSellers?.length > 0 ? (
                popularSellers.map((vendor, i) => <SingleVendor key={i} product={vendor} />)
              ) : (
                <div className="col-12 text-center py-5">
                  <i className="fas fa-store text-muted mb-3" style={{ fontSize: '3rem' }}></i>
                  <p className="text-muted fs-5">No popular sellers available.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        {/* <section className="newsletter-section py-5 bg-primary text-white">
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-lg-6 col-md-8">
                <h3 className="fw-bold mb-3">Stay Updated</h3>
                <p className="mb-4">Subscribe to our newsletter for the latest updates and exclusive offers.</p>
                <div className="newsletter-form">
                  <div className="input-group mb-3">
                    <input 
                      type="email" 
                      className="form-control form-control-lg rounded-pill" 
                      placeholder="Enter your email"
                      style={{ border: 'none' }}
                    />
                    <button className="btn btn-dark rounded-pill px-4 ms-2" type="button">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

  
            <SwiperReact />
         
      </main>

      <style jsx>{`
        .hero-banner {
          margin-top: -1rem;
        }
        
        .banner-image {
          filter: brightness(0.8);
        }
        
        .category-card:hover {
          transform: translateY(-8px) !important;
          box-shadow: 0 12px 35px rgba(0,0,0,0.15) !important;
        }
        
        .category-card:hover .category-overlay {
          opacity: 1 !important;
        }
        
        .category-card:hover .card-img-top {
          transform: scale(1.1) !important;
        }
        
        .feature-icon {
          transition: transform 0.3s ease;
        }
        
        .feature-icon:hover {
          transform: scale(1.1);
        }
        
        .section-header {
          border-bottom: 2px solid #f8f9fa;
          padding-bottom: 1rem;
        }
      `}</style>
    </div>
  );
};

export default Home;