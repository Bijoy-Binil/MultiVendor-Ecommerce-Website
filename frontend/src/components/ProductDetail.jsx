import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SingleProduct from "./SingleProduct";
import "swiper/css";
import "swiper/css/pagination";

const ProductDetail = () => {
  const baseUrl = "http://127.0.0.1:8000/api";
  const [productDatas, SetProductData] = useState([]);
  const [productImage, SetProductImage] = useState([]);
  let { product_slug, product_id } = useParams();

  useEffect(() => {
    FetchData(baseUrl + "/product/" + product_id);
  }, []);

  const FetchData = (baseUrl) => {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => {
        SetProductData(data);
        SetProductImage(data.product_images);
      });
  };
  console.log(productImage);
  return (
    <div className="p-4">
      {/* Product Section */}
      <section className="max-w-5xl mb-20 mx-auto mt-5">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image Slider */}
          <div className="w-full md:w-1/2">
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              className="rounded-2xl overflow-hidden"
            >
              {productImage.map((img, index) => (
                <SwiperSlide >
                  <img
                    className="object-cover rounded-2xl"
                    src={img.image}
          
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold mb-2">
              {productDatas.title}
            </h3>
            <p className="text-gray-700 text-lg mt-1">{productDatas.detail}</p>
            <h5 className="text-xl mt-3 font-medium text-gray-500">
              Price: {productDatas.price}
            </h5>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 mt-5">
              <button className="px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-red-600 transition">
                <i className="fa-solid fa-cart-plus mr-2"></i>Demo
              </button>
              <button className="px-4 py-2 text-sm bg-indigo-500 text-white rounded-md hover:bg-red-600 transition">
                <i className="fa-solid fa-cart-plus mr-2"></i>Add to Cart
              </button>
              <button className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                <i className="fa-solid fa-bag-shopping mr-2"></i>Buy Now
              </button>
              <button className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-indigo-500 transition">
                <i className="fa-solid fa-heart mr-2"></i>Wishlist
              </button>
            </div>

            {/* Tags */}
            <div className="mt-6">
              <h5 className="text-lg font-medium mb-2">Tags</h5>
              <div className="flex flex-wrap gap-2">
                {["Python", "Django", "Web Scripts", "Flask", "Tailwind"].map(
                  (tag, i) => (
                    <Link
                      key={i}
                      to="#"
                      className="text-sm bg-gray-400 text-white rounded-xl px-3 py-1 underline"
                    >
                      {tag}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Related Products</h2>
        <Swiper
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {[...Array(8)].map((_, i) => (
            <SwiperSlide key={i}>
              <SingleProduct title={`Django ${i + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductDetail;
