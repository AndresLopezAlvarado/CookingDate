import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

const CommentsCarousel = ({ comments }) => {
  return (
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
              <div className="border-[#FF3B30] border-2 mb-10 h-72 px-2 rounded-md flex flex-col justify-center space-y-2">
                <h1 className="font-bold">{comment.name}</h1>
                <p>{comment.body}</p>
                <h1 className="font-bold">{comment.email}</h1>
              </div>
            </SwiperSlide>
          ))
        : null}
    </Swiper>
  );
};

export default CommentsCarousel;
