
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import React, { useContext, useEffect, useState } from "react"
import { CurrencyContext } from "../AuthProvider";



const ProductDetail = () => {

  const { product_slug, product_id } = useParams()
  // console.log(product_id, product_slug)
  const { currencyData, setCurrencyData } = useContext(CurrencyContext);
  const baseUrl = `http://127.0.0.1:8000/api/product`
  const relatedBaseUrl = `http://127.0.0.1:8000/api/related-products`
  const [products, setProducts] = useState("")
  const [relatedProducts, setRelatedProducts] = useState([])
  const [productImgs, setProductImgs] = useState([])
  const [productTags, setProductTags] = useState([])
  const [cartButtonClick, setCartButtonClick] = useState(false)
  const [currency, setcurreny] = useState("inr")

const _currency=localStorage.getItem("currency")

useEffect(() => {
  fetchData(`${baseUrl}/${product_id}`);
  fetchRelatedData(`${relatedBaseUrl}/${product_id}`);
  checkProductInCart(product_id);
}, [product_id]);

const checkProductInCart = (product_id) => {
  const prevCart = localStorage.getItem("cartData");
  if (prevCart) {
    const cartJson = JSON.parse(prevCart);

    // ✅ check if any cart item matches the current product_id
    const alreadyInCart = cartJson.some(
      (item) => item.product.id === parseInt(product_id)
    );

    if (alreadyInCart) {
      setCartButtonClick(true);
    }
  }
};

  const fetchData = (baseUrl) => {
    fetch(baseUrl)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data)
        setProductImgs(data.product_imgs)
        setProductTags(data.tag_list)
        // console.log("Product api==> ", baseUrl)
        // console.log("products==> ", data.demo_url)
      })
  }
  const fetchRelatedData = (baseUrl) => {
    fetch(baseUrl)
      .then((response) => response.json())
      .then((data) => {
        setRelatedProducts(data.results)
        // console.log("RelatedProduct api==> ", baseUrl)
        // console.log("RealtedProducts==> ", data)
      })
  }
  const tagslink = []
  for (let i = 0; i < productTags.length; i++) {
    let tag = productTags[i].trim()
    // console.log("tag 2==>",tag)
    tagslink.push(<Link key={i} className="badge bg-secondary text-white me-1" to={`/products/${tag}`}>{tag}</Link>)
  }
  const cartDatas = {
    product: {
      id: products.id,
      title: products.title,
      price: products.price,
      image: products.image,

    },
    user: {
      id: 1
    }
  };
  console.log("Cart Button CLick ==>",cartButtonClick)
console.log("Products==>",products)

  const cartAddButtonHandler = () => {
    let prevCart = localStorage.getItem("cartData");
    let cart = prevCart ? JSON.parse(prevCart) : [];
    cart.push(cartDatas);
    localStorage.setItem("cartData", JSON.stringify(cart));
    console.log("Cart add Button CLick ==>",cartButtonClick)
    setCartButtonClick(!cartButtonClick)
    // console.log("Cart updated:", cart);
  };
  const cartRemoveButtonHandler = () => {
    let prevCart = localStorage.getItem("cartData");
    let carts = prevCart ? JSON.parse(prevCart) : [];
    let updatedCart = carts.filter(cart => cart.product.id !== products.id);
    localStorage.setItem("cartData", JSON.stringify(updatedCart));
    console.log("Cart remove Button CLick ==>",cartButtonClick)
    setCartButtonClick(!cartButtonClick);

  }


  return (
    <section className="container mt-4">
      <div className="row">
        <div className="col-4">
          <Swiper
            slidesPerView={1}
            className="bg-light p-3 rounded shadow-sm d-flex justify-content-center"
            style={{ maxWidth: "300px" }}
          >
            {productImgs.map((img, i) => (
              <SwiperSlide key={i} className="text-center">
                <img
                  className="img-fluid rounded border"
                  src={img.image}
                  alt={`Product Image ${i + 1}`}
                  style={{
                    objectFit: "cover",
                    width: "250px",
                    height: "250px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="col-8">
          <h3>{products.title}</h3>
          <p>
            {products.detail}
          </p>
          {
            currencyData!= 'usd' &&     <h5 className="text-muted small ">Price: Rs {products.price}</h5>
          }
        {
          currencyData == 'usd' &&  <h5 className="text-muted small ">Price:$ {products.usd_price}</h5>
        }
          <p className="mt-3 ">
            <Link
              title="demo"
              target="_blank"
              to={products.demo_url}
              className="btn btn-sm btn-dark rounded-pill shadow-sm "
            >
              <i className="fa-solid fa-cart-shopping me-2"></i>
              Demo
            </Link>
            {!cartButtonClick ? <button type="button" onClick={cartAddButtonHandler} className="btn btn-sm btn-primary rounded-pill shadow-sm mx-2">
              <i className="fa-solid fa-cart-shopping me-2"></i>
              Add To Cart
            </button> : <button type="button" onClick={cartRemoveButtonHandler} className="btn btn-sm btn-danger rounded-pill shadow-sm mx-2">
              <i className="fa-solid fa-cart-shopping me-2"></i>
              Remove from cart
            </button>}
            <button className="btn btn-sm btn-info rounded-pill  shadow-sm">
              <i className="fa-solid fa-bag-shopping me-2 "></i>
              Buy Now
            </button>
            <button className="btn btn-sm btn-danger rounded-pill mx-2 shadow-sm">
              <i className="fa-solid fa-heart me-2"></i>
              Wishlist
            </button>
          </p>
          <div className="producttags mt-4">
            <h5 className="mt-3 ">Tags</h5>
            <p>

              {tagslink}
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <h4 className="mt-5 mb-3">Related Products</h4>
      <Swiper
        spaceBetween={20}
        breakpoints={{
          1024: { slidesPerView: 4 },
          768: { slidesPerView: 2 },
          480: { slidesPerView: 1 },
        }}
      >
        {relatedProducts.map((item, index) => (
          <SwiperSlide key={index}>
            <div key={index} className="card shadow-sm h-100">
              <Link to={`/productDetail/${item.title}/${item.id}`}>
                <img
                  className="card-img-top"
                  src={item.image}
                  alt={item.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text text-muted">Price: ₹{item.price}</p>
                <div className="d-flex justify-content-between">
                  <button

                    className="btn btn-sm btn-primary"
                  >
                    Add to Cart
                  </button>
                  <button className="btn btn-sm btn-danger">Wishlist</button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ProductDetail;
