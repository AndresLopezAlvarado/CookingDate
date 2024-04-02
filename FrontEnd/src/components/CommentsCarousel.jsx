import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import { RxArrowTopRight } from "react-icons/rx";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

const CommentsCarousel = ({ comments }) => {
  console.log(comments);

  return (
    <div className="w-full px-3">
      <Swiper
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 15 },
          1280: { slidesPerView: 3, spaceBetween: 15 },
        }}
        freeMode={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[FreeMode, Pagination, Autoplay]}
      >
        {comments
          ? comments.map((comment) => (
              <SwiperSlide key={comment.id}>
                <div className="mb-10 h-72 border-2 border-lime-900 px-2 rounded-md flex flex-col justify-center">
                  <h1 className="font-bold">{comment.name}</h1>
                  <p className="my-2">{comment.body}</p>
                  <h1 className="font-bold">{comment.email}</h1>
                </div>
              </SwiperSlide>
            ))
          : null}
      </Swiper>
    </div>
  );
};

export default CommentsCarousel;
