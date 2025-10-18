import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../AuthProvider";

const SwiperReact = () => {
  const [reviews, setReviews] = useState([]);
  const baseUrl = "http://127.0.0.1:8000/api/";
  const { accessToken } = useContext(AuthContext);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${baseUrl}product-rating/latest/`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setReviews(res.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="container bg-dark p-4 rounded-3 my-4">
      <h3 className="text-center text-white mb-4">What Our Customers Say</h3>

      {reviews.length === 0 ? (
        <p className="text-center text-light">No reviews available yet.</p>
      ) : (
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Autoplay]}
        >
          {reviews.map((r) => (
            <SwiperSlide key={r.id}>
              <figure className="text-center text-white">
                <blockquote className="blockquote">
                  <p className="fs-5 fst-italic">
                    “{r.reviews.length > 200 ? r.reviews.slice(0, 200) + "..." : r.reviews}”
                  </p>
                </blockquote>
                <figcaption className="blockquote-footer text-white-50">
                  {r.customer_name || "Anonymous"}{" "}
                  <cite title="Rating">
                    <br />
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <i key={i} className="fa-solid fa-star text-warning"></i>
                    ))}
                  </cite>
                </figcaption>
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default SwiperReact;
