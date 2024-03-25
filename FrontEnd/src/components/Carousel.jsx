import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import { RxArrowTopRight } from "react-icons/rx";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { useEffect, useState } from "react";

const Carousel = ({ photos }) => {
  const [arrPhotos, setArrPhotos] = useState();

  useEffect(() => {
    if (photos) {
      setArrPhotos(Object.values(photos));
    }
  }, [photos]);

  console.log(arrPhotos);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Swiper
        breakpoints={{
          340: { slidesPerView: 2, spaceBetween: 15 },
          700: { slidesPerView: 3, spaceBetween: 15 },
        }}
        freeMode={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[FreeMode, Pagination, Autoplay]}
        className="max-w-[90%] lg:max-w-[80%] rounded-md"
      >
        {arrPhotos
          ? arrPhotos.map((item) => (
              <SwiperSlide key={item.name}>
                <div className="flex flex-col mb-10 group relative shadow-lg rounded-md h-[250px] w-[150px] lg:h-[300px] lg:w-[250px] overflow-hidden cursor-pointer">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.url})` }}
                  >
                    <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-50" />

                    <div className="relative flex flex-col gap-3">
                      {/* <item.icon className="text-lime-900 group-hover:text-lime-500 m-1 w-[32px] h-[32px]" /> */}

                      {/* <h1 className="text-lime-900 group-hover:text-lime-500 text-xl lg:text-2xl sm:invisible lg:visible">
                    {item.title}
                  </h1> */}

                      {/* <p className="text-lime-900 group-hover:text-lime-500 lg:text-[18px] sm:invisible lg:visible">
                    {item.content}
                  </p> */}
                    </div>

                    <RxArrowTopRight className="absolute bottom-1 left-1 w-[32px] h-[32px] text-lime-900 group-hover:text-lime-500 group-hover:rotate-45 duration-100" />
                  </div>
                </div>
              </SwiperSlide>
            ))
          : (<p>No hay imagenes para mostrar</p>)}
      </Swiper>
    </div>
  );
};

export default Carousel;
