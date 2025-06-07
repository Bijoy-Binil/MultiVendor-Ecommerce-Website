import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { CartContext, UserContext } from "../../src/Context";

const ProductDetail = () => {
  const baseUrl = "http://127.0.0.1:8000/api";
  const { product_id } = useParams();
  const { cartData, addToCart, removeFromCart } = useContext(CartContext);


  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [related, setRelated] = useState([]);
  const [inCart, setInCart] = useState(false);

useEffect(() => {
  const fetchProductDetails = async () => {
    try {
      const productRes = await axios.get(`${baseUrl}/product/${product_id}`);
      const productData = productRes.data;
      setProduct(productData);
      setImages(productData.product_images || []);
      setTags(productData.tag_list || []);

      const relatedRes = await axios.get(`${baseUrl}/related-product/${product_id}`);
      setRelated(relatedRes.data.results || []);
    } catch (error) {
      console.error("Error loading product or related items:", error);
    }
  };

  fetchProductDetails();
}, [product_id]);

  useEffect(() => {
    setInCart(cartData.some((item) => item.product?.id === Number(product_id)));
  }, [cartData, product_id]);

  return (
    <div className="p-4" key={product_id}>
      <section className="max-w-5xl mb-20 mx-auto mt-5 flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <Swiper spaceBetween={20} slidesPerView={1} className="rounded-2xl overflow-hidden">
            {images.map((img, i) => (
              <SwiperSlide key={i}>
                <img
                  className="object-cover rounded-2xl w-full h-full"
                  src={img.image || "/placeholder.jpg"}
                  alt={product.title}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center gap-2">
          <h3 className="text-2xl font-bold">{product.title}</h3>
          <p className="text-gray-700 text-lg">{product.detail}</p>
          <h4 className="text-xl text-gray-500">Price: ₹ {product.price}</h4>

          <div className="flex flex-wrap gap-3 mt-5">
            {product.demo_url && (
              <Link
                to={product.demo_url}
                className="px-4 py-2 bg-black text-white rounded hover:bg-red-600"
              >
                Demo
              </Link>
            )}

            <button
              onClick={() => (inCart ? removeFromCart(product.id) : addToCart(product))}
              className={`px-4 py-2 text-white rounded ${inCart ? "bg-indigo-500 hover:bg-red-500" : "bg-red-500 hover:bg-indigo-500"}`}
            >
              {inCart ? "Remove from Cart" : "Add to Cart"}
            </button>

            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Buy Now
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-indigo-500">
              Wishlist
            </button>
          </div>

          <div className="mt-6">
            <h5 className="text-lg font-medium mb-2">Tags</h5>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
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
      </section>

      {related.length > 0 && (
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Related Products</h2>
          <Swiper
            spaceBetween={50}
            breakpoints={{
              1024: { slidesPerView: 4 },
              768: { slidesPerView: 2 },
              480: { slidesPerView: 1 },
            }}
          >
            {related.map((item, i) => (
              <SwiperSlide key={i}>
                <div className="rounded-2xl shadow-md bg-white overflow-hidden">
                  <Link to={`/productDetail/${item.slug}/${item.id}`}>
                    <img
                      className="w-full h-64 object-cover"
                      src={item.product_images?.[0]?.image || "/placeholder.jpg"}
                      alt={item.title}
                    />
                  </Link>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-sm text-gray-600 mb-4">Price: ₹{item.price}</p>
                    <div className="flex justify-between">
                      <button
                        onClick={() => addToCart(item)}
                        className="px-4 py-2 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Add to Cart
                      </button>
                      <button className="px-4 py-2 text-xs bg-red-500 text-white rounded hover:bg-red-600">
                        Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
