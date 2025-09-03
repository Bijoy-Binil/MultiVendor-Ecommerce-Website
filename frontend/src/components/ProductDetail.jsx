import React from "react";
import logo from "./../images/logo.jpg";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
const ProductDetail = () => {
  const images = [
    "https://plus.unsplash.com/premium_photo-1756578903526-a1d25e01c1f9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1756578903526-a1d25e01c1f9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
  const related = [
    {
      id: 1,
      slug: "demo-product-1",
      title: "Demo Product 1",
      price: 499,
      product_images: [{ image: images[0] }],
    },
    {
      id: 2,
      slug: "demo-product-2",
      title: "Demo Product 2",
      price: 799,
      product_images: [{ image: images[1] }],
    },
    {
      id: 3,
      slug: "demo-product-3",
      title: "Demo Product 3",
      price: 999,
      product_images: [{ image: images[0] }],
    },
    {
      id: 4,
      slug: "demo-product-4",
      title: "Demo Product 4",
      price: 1299,
      product_images: [{ image: images[1] }],
    },
    {
      id: 5,
      slug: "demo-product-5",
      title: "Demo Product 5",
      price: 1299,
      product_images: [{ image: images[1] }],
    },
  ];
  // Dummy cart function for demo
  const addToCart = (item) => {
    alert(`${item.title} added to cart!`);
  };
  return (
    <section className="container mt-4">
      <div className="row">
        <div className="col-4">
          <Swiper
            slidesPerView={1}
            className="bg-light p-3 rounded shadow-sm d-flex justify-content-center"
            style={{ maxWidth: "300px" }}
          >
            {images.map((img, i) => (
              <SwiperSlide key={i} className="text-center">
                <img
                  className="img-fluid rounded border"
                  src={img}
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
          <h3>ProductTitle</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
            minus beatae mollitia totam ipsum tempora voluptate inventore
            impedit, quasi quod.
          </p>
          <h5 className="text-muted small ">Price: Rs.500</h5>{" "}
          <p className="mt-3 ">
            <Link
              title="demo"
              target="_blank"
              className="btn btn-sm btn-dark rounded-pill shadow-sm "
            >
              <i className="fa-solid fa-cart-shopping me-2"></i>
              Demo
            </Link>
            <button className="btn btn-sm btn-primary rounded-pill shadow-sm mx-2">
              <i className="fa-solid fa-cart-shopping me-2"></i>
              Add To Cart
            </button>
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
              <Link className="badge bg-secondary text-white me-1">Python</Link>
              <Link className="badge bg-secondary text-white me-1">Django</Link>
              <Link className="badge bg-secondary text-white me-1">
                Web Scripts
              </Link>
              <Link className="badge bg-secondary text-white me-1">
                Web Scripts
              </Link>
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
        {related.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="card shadow-sm h-100">
              <Link to={`/productDetail/${item.slug}/${item.id}`}>
                <img
                  className="card-img-top"
                  src={item.product_images?.[0]?.image || "/placeholder.jpg"}
                  alt={item.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text text-muted">Price: ₹{item.price}</p>
                <div className="d-flex justify-content-between">
                  <button
                    onClick={() => addToCart(item)}
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
