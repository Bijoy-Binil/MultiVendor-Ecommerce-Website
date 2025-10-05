import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import React, { useContext, useEffect, useState } from "react";
import { CurrencyContext } from "../AuthProvider";
import { AuthContext, CartContext } from "../AuthProvider";
import axios from "axios";

const ProductDetail = () => {
  const { product_id } = useParams();
  const { currencyData } = useContext(CurrencyContext);
  const { cartData, setCartData } = useContext(CartContext);
  const { isLoggedIn, customerId } = useContext(AuthContext);

  const baseUrl = `http://127.0.0.1:8000/api/product`;
  const relatedBaseUrl = `http://127.0.0.1:8000/api/related-products`;
  const wishlistUrl = `http://127.0.0.1:8000/api/check-in-wishlists/`;

  const [products, setProducts] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [productImgs, setProductImgs] = useState([]);
  const [productTags, setProductTags] = useState([]);
  const [cartButtonClick, setCartButtonClick] = useState(false);
  const [productInWhishList, setProductInWhishList] = useState(false);

  useEffect(() => {
    fetchData(`${baseUrl}/${product_id}`);
    fetchRelatedData(`${relatedBaseUrl}/${product_id}`);
    checkProductInCart(product_id);
    checkWishListData(wishlistUrl);
  }, [product_id]);

  const checkProductInCart = (product_id) => {
    const prevCart = localStorage.getItem("cartData");
    if (prevCart) {
      const cartJson = JSON.parse(prevCart);
      const alreadyInCart = cartJson.some((item) => item.product.id === parseInt(product_id));
      if (alreadyInCart) setCartButtonClick(true);
    }
  };

  const fetchData = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setProductImgs(data.product_imgs || []);
        setProductTags(data.tag_list || []);
      });
  };

  const fetchRelatedData = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setRelatedProducts(data.results || []));
  };

  const SaveInWishList = async () => {
    const formData = { customer: customerId, product: product_id };
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/wishlists/`, formData);
      if (response.data.id) setProductInWhishList(true);
    } catch (err) {
      console.error("Error creating Wishlist:", err);
    }
  };

  const checkWishListData = async (url) => {
    try {
      const res = await axios.get(url, { params: { customer: customerId, product: product_id } });
      setProductInWhishList(res.data.bool === true);
    } catch (err) {
      console.error("Error checking Wishlist:", err);
    }
  };

  const cartDatas = {
    product: {
      id: products.id,
      title: products.title,
      price: products.price,
      usd_price: products.usd_price,
      image: products.image,
    },
    user: { id: 1 },
    total_amount: products.price,
  };

  const cartAddButtonHandler = () => {
    let prevCart = localStorage.getItem("cartData");
    let cart = prevCart ? JSON.parse(prevCart) : [];
    cart.push(cartDatas);
    localStorage.setItem("cartData", JSON.stringify(cart));
    setCartData(cart);
    setCartButtonClick(true);
  };

  const cartRemoveButtonHandler = () => {
    let prevCart = localStorage.getItem("cartData");
    let carts = prevCart ? JSON.parse(prevCart) : [];
    let updatedCart = carts.filter((cart) => cart.product.id !== products.id);
    localStorage.setItem("cartData", JSON.stringify(updatedCart));
    setCartData(updatedCart);
    setCartButtonClick(false);
  };

  return (
    <section className="container my-5">
      <div className="row g-4">
        {/* Product Images */}
        <div className="col-lg-5">
          <Swiper slidesPerView={1} className="rounded shadow-sm bg-white p-3">
            {productImgs.map((img, i) => (
              <SwiperSlide key={i} className="text-center">
                <img
                  className="img-fluid rounded"
                  src={img.image}
                  alt={`Product ${i + 1}`}
                  style={{ maxHeight: "350px", objectFit: "cover" }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Product Info */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm p-4">
            <h2 className="fw-bold mb-3">{products.title}</h2>
            <p className="text-muted">{products.detail}</p>

            {/* Price */}
            <h4 className="text-primary fw-bold">
              {currencyData === "usd" ? `$ ${products.usd_price}` : `₹ ${products.price}`}
            </h4>

            {/* Buttons */}
            <div className="mt-4 d-flex flex-wrap gap-2">
              <Link
                to={products.demo_url}
                target="_blank"
                className="btn btn-outline-dark rounded-pill px-4"
              >
                <i className="fa-solid fa-eye me-2"></i> Demo
              </Link>

              {!cartButtonClick ? (
                <button
                  onClick={cartAddButtonHandler}
                  className="btn btn-primary rounded-pill px-4"
                >
                  <i className="fa-solid fa-cart-shopping me-2"></i> Add to Cart
                </button>
              ) : (
                <button
                  onClick={cartRemoveButtonHandler}
                  className="btn btn-danger rounded-pill px-4"
                >
                  <i className="fa-solid fa-cart-shopping me-2"></i> Remove
                </button>
              )}

              <button className="btn btn-success rounded-pill px-4">
                <i className="fa-solid fa-bag-shopping me-2"></i> Buy Now
              </button>

              {isLoggedIn ? (
                <button
                  onClick={SaveInWishList}
                  className={`btn rounded-pill px-4 ${
                    productInWhishList ? "btn-secondary" : "btn-outline-danger"
                  }`}
                  disabled={productInWhishList}
                >
                  <i className="fa-solid fa-heart me-2"></i>
                  {productInWhishList ? "In Wishlist" : "Wishlist"}
                </button>
              ) : (
                <button disabled className="btn btn-outline-danger rounded-pill px-4">
                  <i className="fa-solid fa-heart me-2"></i> Wishlist
                </button>
              )}
            </div>

            {/* Tags */}
            {productTags.length > 0 && (
              <div className="mt-4">
                <h6 className="fw-bold">Tags</h6>
                <div className="d-flex flex-wrap gap-2">
                  {productTags.map((tag, i) => (
                    <Link key={i} to={`/products/${tag}`} className="badge bg-secondary text-white">
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-5">
        <h4 className="fw-bold mb-3">Related Products</h4>
        <Swiper
          spaceBetween={20}
          breakpoints={{ 1024: { slidesPerView: 4 }, 768: { slidesPerView: 2 }, 480: { slidesPerView: 1 } }}
        >
          {relatedProducts.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="card shadow-sm border-0 h-100">
                <Link to={`/productDetail/${item.title}/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="card-img-top rounded-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                </Link>
                <div className="card-body">
                  <h6 className="fw-bold">{item.title}</h6>
                  <p className="text-muted small mb-2">₹ {item.price}</p>
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-sm btn-primary">Add</button>
                    <button className="btn btn-sm btn-outline-danger">Wishlist</button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ProductDetail;
