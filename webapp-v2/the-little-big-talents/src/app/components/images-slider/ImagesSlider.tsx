'use client';

import { ReactNode } from 'react';
import 'swiper/css';
import 'swiper/css/effect-fade';

import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface ImagesSliderProps {
  children: ReactNode[];
}

const ImagesSlider: React.FC<ImagesSliderProps> = ({ children }) => {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 6000, disableOnInteraction: false }}
      loop={true}
      speed={1500}
      effect="fade"
      fadeEffect={{ crossFade: true }}
    >
      {children?.map((children, index) => {
        return <SwiperSlide key={index}>{children}</SwiperSlide>;
      })}
    </Swiper>
  );
};

export default ImagesSlider;
