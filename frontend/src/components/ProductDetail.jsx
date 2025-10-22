import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import React, { useContext, useEffect, useState } from "react";
import { CurrencyContext, AuthContext, CartContext } from "../AuthProvider";
import axios from "axios";

const ProductDetail = () => {
  const { product_id } = useParams();
  const { currencyData } = useContext(CurrencyContext);
  const { cartData, setCartData } = useContext(CartContext);
  const { isLoggedIn, customerId } = useContext(AuthContext);

  const baseUrl = `http://127.0.0.1:8000/api/product`;
  const relatedBaseUrl = `http://127.0.0.1:8000/api/related-products`;
  const wishlistUrl = `http://127.0.0.1:8000/api/wishlists/`;
  const wishlistCheckUrl = `http://127.0.0.1:8000/api/check-in-wishlists/`;
  const toggleWishlistUrl = `http://127.0.0.1:8000/api/toggle-wishlist/`;

  const [products, setProducts] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [productImgs, setProductImgs] = useState([]);
  const [productTags, setProductTags] = useState([]);
  const [cartButtonClick, setCartButtonClick] = useState(false);
  const [productInWishlist, setProductInWishlist] = useState(false);
  const [relatedWishlists, setRelatedWishlists] = useState({});
console.log("productInWishlist==>",productInWishlist)
  // ✅ Auth header helper
  const getAuthConfig = () => {
  const token = localStorage.getItem("accessToken");
  return token
    ? { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } }
    : {};
};

  // ✅ Fetch product & related on mount
  useEffect(() => {
    fetchData(`${baseUrl}/${product_id}`);
    fetchRelatedData(`${relatedBaseUrl}/${product_id}`);
    checkProductInCart(product_id);
    if (isLoggedIn) checkWishListData();
  }, [product_id, isLoggedIn]);

  // Fetch product details
  const fetchData = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setProductImgs(data.product_imgs || []);
        setProductTags(data.tag_list || []);
      });
  };

  // Fetch related products and wishlist statuses
  const fetchRelatedData = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then(async (data) => {
        setRelatedProducts(data.results || []);

        if (isLoggedIn) {
          const wishlistStatuses = {};
          await Promise.all(
            (data.results || []).map(async (item) => {
              try {
                const res = await axios.get(wishlistCheckUrl, {
                  params: { customer: customerId, product: item.id },
                  ...getAuthConfig(), // ✅ Attach auth headers here
                });
                wishlistStatuses[item.id] = res.data.bool === true;
              } catch (err) {
                console.error("Error fetching related wishlist:", err);
              }
            })
          );
          setRelatedWishlists(wishlistStatuses);
        }
      });
  };

  // ✅ Check if current product is in wishlist
  const checkWishListData = async () => {
    if (!isLoggedIn) return;

    try {
      const res = await axios.get(wishlistCheckUrl, {
        params: { customer: customerId, product: product_id },
        ...getAuthConfig(), // ✅ Attach auth headers
      });
      console.log("res==>",res)
      setProductInWishlist(res.data.bool === true);
    } catch (err) {
      console.error("Error checking Wishlist:", err);
    }
  };

  // ✅ Toggle wishlist (main or related)
  const toggleWishList = async (id, isRelated = false) => {
    if (!isLoggedIn || !customerId)
      return alert("Please log in to manage wishlist");

    try {
      const formData = new FormData();
      formData.append("customer", customerId);
      formData.append("product", id);

      const res = await axios.post(toggleWishlistUrl, formData, getAuthConfig()); // ✅ Secure call

      if (isRelated) {
        setRelatedWishlists((prev) => ({ ...prev, [id]: res.data.bool }));
      } else {
        setProductInWishlist(res.data.bool);
      }
    } catch (err) {
      console.error("Error toggling wishlist:", err);
    }
  };

  // ✅ Cart logic
  const cartDatas = {
    product: {
      id: products.id,
      title: products.title,
      price: products.price,
      usd_price: products.usd_price,
      image: products.image,
    },
    user: { id: customerId || 1 },
    total_amount: products.price,
  };

  const checkProductInCart = (product_id) => {
    const prevCart = localStorage.getItem("cartData");
    if (prevCart) {
      const cartJson = JSON.parse(prevCart);
      const alreadyInCart = cartJson.some(
        (item) => item.product.id === parseInt(product_id)
      );
      if (alreadyInCart) setCartButtonClick(true);
    }
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
        {/* 🖼️ Product Images */}
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

        {/* 🛍️ Product Info */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm p-4">
            <h2 className="fw-bold mb-3">{products.title}</h2>
            <p className="text-muted">{products.detail}</p>
            <Link
              to={`/seller/${products?.vendor?.user?.username}/${products?.vendor?.id}`}
            >
              Vendor: {products?.vendor?.user?.username || "Unknown Vendor"}
            </Link>

            <h4 className="text-primary fw-bold mt-3">
              {currencyData === "usd"
                ? `$ ${products.usd_price}`
                : `₹ ${products.price}`}
            </h4>

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
                  onClick={() => toggleWishList(products.id)}
                  className={`btn rounded-pill px-4 ${
                    productInWishlist
                      ? "btn-danger"
                      : "btn-outline-danger"
                  }`}
                >
                  <i className="fa-solid fa-heart me-2"></i>
                  {productInWishlist
                    ? "Remove Wishlist"
                    : "Add to Wishlist"}
                </button>
              ) : (
                <button disabled className="btn btn-outline-secondary px-4">
                  <i className="fa-solid fa-heart me-2"></i>Login to Wishlist
                </button>
              )}
            </div>

            {/* 🏷️ Tags */}
            {productTags.length > 0 && (
              <div className="mt-4">
                <h6 className="fw-bold">Tags</h6>
                <div className="d-flex flex-wrap gap-2">
                  {productTags.map((tag, i) => (
                    <Link
                      key={i}
                      to={`/products/${tag}`}
                      className="badge bg-secondary text-white"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🔁 Related Products */}
      <div className="mt-5">
        <h4 className="fw-bold mb-3">Related Products</h4>
        <Swiper
          spaceBetween={20}
          breakpoints={{
            1024: { slidesPerView: 4 },
            768: { slidesPerView: 2 },
            480: { slidesPerView: 1 },
          }}
        >
          {relatedProducts.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="card shadow-sm border-0 h-100">
                <Link to={`/product/${item.title}/${item.id}`}>
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
                    {isLoggedIn ? (
                      <button
                        className={`btn btn-sm ${
                          relatedWishlists[item.id]
                            ? "btn-danger"
                            : "btn-outline-danger"
                        }`}
                        onClick={() => toggleWishList(item.id, true)}
                      >
                        {relatedWishlists[item.id] ? "❤️" : "🤍"}
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        disabled
                      >
                        🤍
                      </button>
                    )}
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
