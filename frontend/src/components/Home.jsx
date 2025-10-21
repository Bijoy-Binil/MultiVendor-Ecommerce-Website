import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import SwiperReact from "./SwiperReact";
import { Link } from "react-router-dom";
import SingleProduct from "./SingleProduct";
import SingleVendor from "./Seller/SingleVendor";
import { AuthContext, CartContext, CurrencyContext } from "../AuthProvider";

const Home = () => {
  const baseUrl = "http://127.0.0.1:8000/api/products/";
  const vendorsUrl = "http://127.0.0.1:8000/api/vendors/";
  const categoriesUrl = "http://127.0.0.1:8000/api/categories/?fetch_limit=4";
  const wishlistUrl = "http://127.0.0.1:8000/api/check-in-wishlists/";

  const { currencyData } = useContext(CurrencyContext);
  const { cartData, setCartData } = useContext(CartContext);
  const { isLoggedIn, customerId } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [popularSellers, setPopularSellers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [wishlistStatus, setWishlistStatus] = useState({});

  // helper: build axios config with auth if token present
  const getAuthConfig = () => {
    const token =
      localStorage.getItem("access") ||
      localStorage.getItem("access_token") ||
      localStorage.getItem("token") ||
      null;
    if (token) {
      return { headers: { Authorization: `Bearer ${token}` } };
    }
    return {};
  };

  // Fetch latest products
  const fetchData = async (url) => {
    try {
      const { data } = await axios.get(url);
      setProducts(data.results);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // Fetch popular sellers
  const fetchSellers = async (url) => {
    try {
      const { data } = await axios.get(url + "?limit=4");
      setPopularSellers(data.results);
    } catch (err) {
      console.error("Error fetching sellers:", err);
    }
  };

  // Fetch categories
  const fetchCategories = async (url) => {
    try {
      const { data } = await axios.get(url);
      setCategories(data.results);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Fetch popular products
  const fetchPopularProducts = async (url) => {
    try {
      const { data } = await axios.get(url);
      setPopularProducts(data.results);
    } catch (err) {
      console.error("Error fetching popular products:", err);
    }
  };

  // Check wishlist status for products
  const checkWishlistStatus = async (productIds) => {
    // if not logged in or no customer id, clear wishlist status and return
    if (!isLoggedIn || !customerId) {
      setWishlistStatus({});
      return;
    }

    try {
      // filter valid ids and make unique
      const uniqueIds = Array.from(new Set((productIds || []).filter(Boolean)));
      if (uniqueIds.length === 0) {
        setWishlistStatus({});
        return;
      }

      const config = getAuthConfig();

      // Run parallel requests for each product id (faster than sequential)
      const requests = uniqueIds.map((id) =>
        axios.get(wishlistUrl, { params: { customer: customerId, product: id }, ...config })
      );

      const responses = await Promise.all(requests);

      const status = {};
      responses.forEach((res, idx) => {
        // backend expected to return { bool: true/false }
        status[uniqueIds[idx]] = res?.data?.bool === true;
      });

      setWishlistStatus((prev) => ({ ...prev, ...status }));
    } catch (err) {
      console.error("Error checking wishlist status:", err);
    }
  };

  // Add to wishlist
  const addToWishlist = async (productId) => {
    if (!isLoggedIn || !customerId) return;

    try {
      const formData = { customer: customerId, product: productId };
      const config = getAuthConfig();
      const response = await axios.post(`http://127.0.0.1:8000/api/wishlists/`, formData, config);
      // If created, mark as true locally
      if (response && (response.status === 201 || response.data?.id)) {
        setWishlistStatus((prev) => ({ ...prev, [productId]: true }));
      } else {
        // Some backends respond 200 with id - handle that too
        if (response?.data?.id) {
          setWishlistStatus((prev) => ({ ...prev, [productId]: true }));
        }
      }
    } catch (err) {
      console.error("Error adding to wishlist:", err);
    }
  };

  // Add to cart
  const addToCart = (product) => {
    const cartData = {
      product: {
        id: product.id,
        title: product.title,
        price: product.price,
        usd_price: product.usd_price,
        image: product.image,
      },
      user: { id: customerId || 1 },
      total_amount: product.price,
    };

    let prevCart = localStorage.getItem("cartData");
    let cart = prevCart ? JSON.parse(prevCart) : [];

    // Check if product already in cart
    const alreadyInCart = cart.some((item) => item.product.id === product.id);
    if (!alreadyInCart) {
      cart.push(cartData);
      localStorage.setItem("cartData", JSON.stringify(cart));
      setCartData(cart);
    }
  };

  // Check if product is in cart
  const isInCart = (productId) => {
    const prevCart = localStorage.getItem("cartData");
    if (prevCart) {
      const cartJson = JSON.parse(prevCart);
      return cartJson.some((item) => item.product.id === parseInt(productId));
    }
    return false;
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      fetchData(`${baseUrl}?fetch_limit=4`),
      fetchSellers(vendorsUrl),
      fetchCategories(categoriesUrl),
      fetchPopularProducts(`${baseUrl}?fetch_limit=4&order=first`),
    ]).finally(() => setIsLoading(false));
  }, []);

  // Check wishlist status when products are loaded or login changes
  useEffect(() => {
    const allProductIds = [
      ...products.map((p) => p.id),
      ...popularProducts.map((p) => p.id),
    ];
    if (allProductIds.length > 0) {
      checkWishlistStatus(allProductIds);
    } else {
      // If there are no products, ensure wishlist state is clean when logged out
      if (!isLoggedIn) setWishlistStatus({});
    }
  }, [products, popularProducts, isLoggedIn, customerId]);

  const news = (
    <span className="position-absolute top-0 start-0 bg-danger text-white px-2 py-1 m-2 rounded-pill small">
      New
    </span>
  );

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
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
                  style={{ height: "500px", objectFit: "cover", objectPosition: "center" }}
                />
                <div className="banner-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center">
                  <div className="container">
                    <div className="row justify-content-start">
                      <div className="col-lg-6 col-md-8">
                        <div
                          className="banner-content text-white p-4 rounded"
                          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(10px)" }}
                        >
                          <h1 className="display-4 fw-bold mb-3">Summer Sale</h1>
                          <p className="lead mb-4">Up to 50% off on selected items. Limited time offer!</p>
                          <div className="banner-actions">
                            <Link
                              to="/products"
                              className="btn btn-primary btn-lg me-3 px-4 py-2 rounded-pill fw-semibold"
                            >
                              Shop Now <i className="fas fa-arrow-right ms-2"></i>
                            </Link>
                            <Link
                              to="/categories"
                              className="btn btn-outline-light btn-lg px-4 py-2 rounded-pill fw-semibold"
                            >
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
              {/* Feature cards */}
              <div className="col-md-3 col-6">
                <div className="text-center">
                  <div
                    className="feature-icon bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: "70px", height: "70px" }}
                  >
                    <i className="fas fa-shipping-fast text-white fs-4"></i>
                  </div>
                  <h6 className="fw-bold mb-2">Free Shipping</h6>
                  <p className="text-muted small mb-0">On orders over $50</p>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="text-center">
                  <div
                    className="feature-icon bg-success rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: "70px", height: "70px" }}
                  >
                    <i className="fas fa-undo-alt text-white fs-4"></i>
                  </div>
                  <h6 className="fw-bold mb-2">Easy Returns</h6>
                  <p className="text-muted small mb-0">30-day return policy</p>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="text-center">
                  <div
                    className="feature-icon bg-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: "70px", height: "70px" }}
                  >
                    <i className="fas fa-shield-alt text-white fs-4"></i>
                  </div>
                  <h6 className="fw-bold mb-2">Secure Payment</h6>
                  <p className="text-muted small mb-0">100% secure payment</p>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="text-center">
                  <div
                    className="feature-icon bg-info rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: "70px", height: "70px" }}
                  >
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
                products.map((product, i) => (
                  <div key={i} className="col-6 col-md-4 col-lg-3">
                    <div className="card product-card h-100 border-0 shadow-sm position-relative">
                      {news}
                      <Link to={`/product/${product.slug}/${product.id}`} className="text-decoration-none">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="card-img-top"
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                      </Link>
                      <div className="card-body">
                        <h6 className="card-title fw-bold text-dark mb-2">{product.title}</h6>
                        <p className="text-primary fw-bold mb-2">
                          {currencyData === "usd" ? `$ ${product.usd_price}` : `₹ ${product.price}`}
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <button
                            onClick={() => addToCart(product)}
                            className={`btn btn-sm ${isInCart(product.id) ? "btn-success" : "btn-primary"}`}
                            disabled={isInCart(product.id)}
                          >
                            {isInCart(product.id) ? "Added" : "Add to Cart"}
                          </button>
                          {isLoggedIn ? (
                            <button
                              onClick={() => addToWishlist(product.id)}
                              className={`btn btn-sm ${wishlistStatus[product.id] ? "btn-secondary" : "btn-outline-danger"}`}
                              disabled={wishlistStatus[product.id]}
                            >
                              <i className="fa-solid fa-heart"></i>
                            </button>
                          ) : (
                            <button disabled className="btn btn-sm btn-outline-secondary">
                              <i className="fa-solid fa-heart"></i>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <i className="fas fa-box-open text-muted mb-3" style={{ fontSize: "3rem" }}></i>
                  <p className="text-muted fs-5">No products available at the moment.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="categories-section py-5 bg-light">
          <div className="container">
            <div className="section-header d-flex justify-content-between align-items-center mb-5">
              <div>
                <h2 className="fw-bold text-dark mb-2">Shop by Category</h2>
                <p className="text-muted mb-0">Browse through our curated collections</p>
              </div>
              <Link to="/categories" className="btn btn-outline-primary rounded-pill px-4 py-2 fw-semibold">
                View All <i className="fas fa-arrow-right ms-2"></i>
              </Link>
            </div>
            <div className="row g-4">
              {categories?.length > 0 ? (
                categories.map((cat, i) => (
                  <div key={i} className="col-6 col-md-4 col-lg-3">
                    <Link to={`/category/${cat.title}/${cat.id}`} className="text-decoration-none">
                      <div
                        className="category-card card h-100 border-0 shadow-sm overflow-hidden"
                        style={{
                          transition: "transform 0.3s ease, box-shadow 0.3s ease",
                          cursor: "pointer",
                          borderRadius: "12px",
                        }}
                      >
                        <div className="position-relative overflow-hidden" style={{ height: "220px" }}>
                          {cat.image ? (
                            <img
                              src={cat.image}
                              alt={cat.title}
                              className="card-img-top h-100 w-100 object-fit-cover"
                              style={{ transition: "transform 0.5s ease", objectPosition: "center" }}
                            />
                          ) : (
                            <div className="card-img-top h-100 w-100 d-flex align-items-center justify-content-center">
                              <div className="text-center">
                                <i className="fas fa-tags mb-2" style={{ fontSize: "2rem" }}></i>
                                <h6 className="mb-0 fw-bold">{cat.title}</h6>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="card-body text-center p-3">
                          <h6 className="fw-bold text-dark mb-2">{cat.title}</h6>
                          {cat.detail && (
                            <p className="text-muted small mb-0" style={{ fontSize: "0.85rem" }}>
                              {cat.detail.length > 60 ? `${cat.detail.substring(0, 50)}...` : cat.detail}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <i className="fas fa-folder-open text-muted mb-3" style={{ fontSize: "3rem" }}></i>
                  <p className="text-muted fs-5">No categories available.</p>
                </div>
              )}
            </div>
          </div>
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
                popularProducts.map((product, i) => (
                  <div key={i} className="col-6 col-md-4 col-lg-3">
                    <div className="card product-card h-100 border-0 shadow-sm position-relative">
                      {news}
                      <Link to={`/product/${product.title}/${product.id}`} className="text-decoration-none">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="card-img-top"
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                      </Link>
                      <div className="card-body">
                        <h6 className="card-title fw-bold text-dark mb-2">{product.title}</h6>
                        <p className="text-primary fw-bold mb-2">
                          {currencyData === "usd" ? `$ ${product.usd_price}` : `₹ ${product.price}`}
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <button
                            onClick={() => addToCart(product)}
                            className={`btn btn-sm ${isInCart(product.id) ? "btn-success" : "btn-primary"}`}
                            disabled={isInCart(product.id)}
                          >
                            {isInCart(product.id) ? "Added" : "Add to Cart"}
                          </button>
                          {isLoggedIn ? (
                            <button
                              onClick={() => addToWishlist(product.id)}
                              className={`btn btn-sm ${
                                wishlistStatus[product.id] ? "btn-secondary" : "btn-outline-danger"
                              }`}
                              disabled={wishlistStatus[product.id]}
                            >
                              <i className="fa-solid fa-heart"></i>
                            </button>
                          ) : (
                            <button disabled className="btn btn-sm btn-outline-secondary">
                              <i className="fa-solid fa-heart"></i>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <i className="fas fa-fire text-muted mb-3" style={{ fontSize: "3rem" }}></i>
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
                  <i className="fas fa-store text-muted mb-3" style={{ fontSize: "3rem" }}></i>
                  <p className="text-muted fs-5">No popular sellers available.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <SwiperReact />
      </main>
    </div>
  );
};

export default Home;
