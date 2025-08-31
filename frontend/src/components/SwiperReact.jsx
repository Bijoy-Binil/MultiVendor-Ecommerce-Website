import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Router from 'react-dom'
const SwiperReact = () => {
  return (
    <>
      <div className="container bg-dark p-4 d-flex justify-content-center">

      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
          delay: 10000, // 5 seconds
          disableOnInteraction: false, // keep autoplay after manual swipe
        }}
        modules={[Autoplay]}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {/* ✅ Blockquote 1 */}
        <SwiperSlide>
          <figure className="text-center">
            <blockquote className="blockquote text-white">
              <p>"This store has the best laptops at unbeatable prices!"</p>
            </blockquote>
            <figcaption className="blockquote-footer text-white">
              Customer Name:{" "}
              <cite title="Source Title">
                Rating: <i className="text-warning fa-solid fa-star"></i>
                <i className="text-warning fa-solid fa-star"></i>
                <i className="text-warning fa-solid fa-star"></i>
                <i className="text-warning fa-solid fa-star"></i>
              </cite>
            </figcaption>
          </figure>
        </SwiperSlide>

        {/* ✅ Blockquote 2 */}
        <SwiperSlide>
          <figure className="text-center">
            <blockquote className="blockquote text-white">
              <p>"Amazing customer service and super fast delivery."</p>
            </blockquote>
            <figcaption className="blockquote-footer text-white">
              Customer Name:{" "}
              <cite title="Source Title">
                Rating: <i className="text-warning fa-solid fa-star"></i>
                <i className="text-warning fa-solid fa-star"></i>
                <i className="text-warning fa-solid fa-star"></i>
              </cite>
            </figcaption>
          </figure>
        </SwiperSlide>
      </Swiper>
      </div>
    </>
  );
};

export default SwiperReact;
