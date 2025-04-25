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
  const [productTags, SetProductTags] = useState([]);
  const [relatedProduct, SetRelatedProduct] = useState([]);
  let { product_slug, product_id } = useParams();

  useEffect(() => {
    FetchData(baseUrl + "/product/" + product_id);
    FetchRelatedData(baseUrl + "/related-product/" + product_id);
  }, []);

  const FetchData = (baseUrl) => {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => {
        SetProductData(data);
        SetProductImage(data.product_images);
        SetProductTags(data.tag_list);
      });
  };

  const FetchRelatedData = (baseUrl) => {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => {
        SetRelatedProduct(data.results);
      });
  };

  console.log(relatedProduct);
  console.log(productDatas.demo_url);

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
                <SwiperSlide>
                  <img className="object-cover rounded-2xl" src={img.image} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Product Info */}
          <div className="w-full gap-2 md:w-1/2 flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-2">{productDatas.title}</h3>
            <p className="text-gray-700   font-semibold text-lg ">
              {productDatas.detail}
            </p>
            <h5 className="text-xl font-medium  text-gray-500">
              <span className="text-[23px]">Price</span>: ₹ {productDatas.price}
            </h5>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 mt-5">
              <Link to={productDatas.demo_url} className="px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-red-600 transition">
                <i className="fa-solid fa-cart-plus mr-2"></i>Demo
              </Link >
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
                {productTags.map((tag, i) => (
                  <Link
                    key={i}
                    to={`/products/${tag}/`}
                    className="text-sm bg-gray-400 text-white rounded-xl px-3 py-1 underline"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      {relatedProduct.length >0 && 
       <div className="max-w-7xl mx-auto">
       <h2 className="text-2xl font-semibold mb-6">Related Products</h2>
       <Swiper
         spaceBetween={50}
         breakpoints={{
           
           1024: { slidesPerView: 4 },
         }}
       >
         {relatedProduct.map((product, i) => (
           <SwiperSlide key={i}>
             <div className="rounded-2xl shadow-md overflow-hidden bg-white">
               <Link to={`/productDetail/${product.slug}/${product.id}`}>
                 <img
                   className="w-full h-64 object-cover"
                   src={
                     product.product_images?.[0]?.image || "/placeholder.jpg"
                   }
                   alt={product.title}
                 />
               </Link>

               <div className="p-4">
                 <Link to={`/productDetail/${product.slug}/${product.id}`}>
                   <h2 className="text-lg font-semibold text-gray-800 mb-2">
                     {product.title}
                   </h2>
                 </Link>
                 <p className="text-gray-600 text-sm mb-4">
                   Price: ${product.price}
                 </p>
                 <div className="flex justify-between">
                   <button
                     aria-label="Add to Cart"
                     className="px-4 py-2 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                   >
                     <i className="fa-solid fa-cart-plus mr-2"></i>Add to Cart
                   </button>
                   <button
                     aria-label="Add to Wishlist"
                     className="px-4 py-2 text-xs bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                   >
                     <i className="fa-solid fa-heart mr-2"></i>Wishlist
                   </button>
                 </div>
               </div>
             </div>
           </SwiperSlide>
         ))}
       </Swiper>
     </div> }
     
    </div>
  );
};

export default ProductDetail;
