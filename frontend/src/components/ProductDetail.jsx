import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { CartContext, UserContext } from "../../src/Context";

const ProductDetail = () => {
  const API = "http://127.0.0.1:8000/api";
  const {product_id } = useParams();
  const { cartData, setCartData } = useContext(CartContext) || {};
  const { user } = useContext(UserContext) || {};

  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [related, setRelated] = useState([]);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    loadProduct();
    loadRelated();
    checkCart();
  }, [product_id]);

  const loadProduct = async () => {
    const res = await fetch(`${API}/product/${product_id}`);
    const data = await res.json();
    setProduct(data);
    setImages(data.product_images || []);
    setTags(data.tag_list || []);
  };

  const loadRelated = async () => {
    const res = await fetch(`${API}/related-product/${product_id}`);
    const data = await res.json();
    setRelated(data.results || []);
  };

  const checkCart = () => {
    const savedCart = JSON.parse(localStorage.getItem("cartData")) || [];
    const exists = savedCart.some((item) => item.product?.id === Number(product_id));
    setInCart(exists);
  };

  const updateCart = (newCart) => {
    localStorage.setItem("cartData", JSON.stringify(newCart));
    setCartData?.(newCart);
  };

  const addToCart = () => {
    const newItem = {
      product: {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      },
      user: { id: user?.id || 1 },
    };

    const newCart = [...(JSON.parse(localStorage.getItem("cartData")) || []), newItem];
    updateCart(newCart);
    setInCart(true);
  };

  const removeFromCart = () => {
    const currentCart = JSON.parse(localStorage.getItem("cartData")) || [];
    const updatedCart = currentCart.filter((item) => item.product.id !== product.id);
    updateCart(updatedCart);
    setInCart(false);
  };

  return (
    <div className="p-4" key={product_id}>
      {/* Product Details */}
      <section className="max-w-5xl mb-20 mx-auto mt-5 flex flex-col md:flex-row gap-6">
        {/* Images */}
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

        {/* Info */}
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-2">
          <h3 className="text-2xl font-bold">{product.title}</h3>
          <p className="text-gray-700 text-lg">{product.detail}</p>
          <h4 className="text-xl text-gray-500">Price: ₹ {product.price}</h4>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 mt-5">
            {product.demo_url && (
              <Link
                to={product.demo_url}
                className="px-4 py-2 bg-black text-white rounded hover:bg-red-600"
              >
                Demo
              </Link>
            )}

            {!inCart ? (
              <button
                onClick={addToCart}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-indigo-500"
              >
                Add to Cart
              </button>
            ) : (
              <button
                onClick={removeFromCart}
                className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-red-500"
              >
                Remove from Cart
              </button>
            )}

            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Buy Now
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-indigo-500">
              Wishlist
            </button>
          </div>

          {/* Tags */}
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

      {/* Related Products */}
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
                      <button className="px-4 py-2 text-xs bg-blue-500 text-white rounded hover:bg-blue-600">
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
