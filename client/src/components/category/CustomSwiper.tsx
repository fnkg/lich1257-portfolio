"use client";

import { useEffect, useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/mousewheel";
import "swiper/css/free-mode";

import type { Swiper as SwiperCore } from "swiper/types";
import type { ProjectCard } from "@/types";

interface CustomSwiperProps {
  cards: ProjectCard[];
  isGalleryOpen: boolean;
  closeGallery: () => void;
  openGallery: (index: number) => void;
  handlePointerEnter: (project: ProjectCard) => void;
  handlePointerLeave: () => void;
  handlePointerMove: (
    e: React.PointerEvent<HTMLDivElement>,
    project: ProjectCard,
  ) => void;
}

export default function CustomSwiper({
  cards,
  isGalleryOpen,
  closeGallery,
  openGallery,
  handlePointerEnter,
  handlePointerLeave,
  handlePointerMove,
}: CustomSwiperProps) {
  const swiperRef = useRef<SwiperCore | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeGallery();
      }
    };

    if (isGalleryOpen) {
      document.addEventListener("keydown", handleKeyDown);
      swiperRef.current?.autoplay?.stop();
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      swiperRef.current?.autoplay?.start();
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isGalleryOpen, closeGallery]);

  return (
    <Swiper
      modules={[Autoplay, Mousewheel, FreeMode]}
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      slidesPerView={3}
      loop={true}
      freeMode={{
        enabled: true,
        minimumVelocity: 0.02,
        momentum: false,
        momentumBounce: false,
        momentumRatio: 1.75,
        sticky: false,
      }}
      mousewheel={{
        enabled: true,
        sensitivity: 1.75,
      }}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      speed={5000}
      simulateTouch={false}
      preventClicks={true}
      preventClicksPropagation={true}
      slideToClickedSlide={true}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      className="swiper-container"
    >
      {cards.map((card: ProjectCard, index: number) => {
        const bgImageUrl = card.image?.url
          ? "http://localhost:1337" + card.image.url
          : "/fallback.jpg";

        return (
          <SwiperSlide key={card.id} className="swiper-slide">
            <div
              className="project-card relative w-[600px] h-[600px]
                         max-w-[250px] max-h-[400px]
                         2xl:max-w-[700px] 2xl:max-h-[700px]
                         xl:max-w-[600px] xl:max-h-[600px]
                         lg:max-w-[500px] lg:max-h-[500px]
                         md:max-w-[400px] md:max-h-[400px]
                         sm:max-w-[300px] sm:max-h-[300px]
                         bg-cover bg-center bg-no-repeat cursor-pointer group"
              style={{ backgroundImage: `url(${bgImageUrl})` }}
              onClick={() => openGallery(index)}
              onPointerEnter={() => handlePointerEnter(card)}
              onPointerLeave={handlePointerLeave}
              onPointerMove={(e) => handlePointerMove(e, card)}
            >
              <div className="card-hover"></div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
