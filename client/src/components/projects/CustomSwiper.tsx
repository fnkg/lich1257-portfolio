"use client";

import React, { useEffect, useRef, useState } from "react";

// Импорт компонентов и модулей Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/mousewheel";
import "swiper/css/free-mode";

import type { Swiper as SwiperCore } from "swiper/types";
import type { ProjectCard, CloseGallery } from "@/types";

interface CustomSwiperProps {
  cards: ProjectCard[];

  // Управление при открытии/закрытии галереи
  selectedProjectIndex: number | null;
  isGalleryOpen: boolean;
  closeGallery: CloseGallery;

  // Обработчики для карточек
  openGallery: (index: number) => void;
  handlePointerEnter: (project: ProjectCard) => void;
  handlePointerLeave: () => void;
  handlePointerMove: (
    e: React.PointerEvent<HTMLDivElement>,
    project: ProjectCard
  ) => void;
}

export default function CustomSwiper({
  cards,
  selectedProjectIndex,
  isGalleryOpen,
  closeGallery,
  openGallery,
  handlePointerEnter,
  handlePointerLeave,
  handlePointerMove,
}: CustomSwiperProps) {
  // Храним экземпляр свайпера
  const swiperRef = useRef<SwiperCore | null>(null);

  // Обработка запуска/остановки autoplay + Esc
  useEffect(() => {
    // При нажатии Escape — закрыть галерею
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeGallery();
      }
    };

    // Добавляем или убираем слушатель
    if (selectedProjectIndex !== null || isGalleryOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Если что-то выбрано, останавливаем автоплей
      swiperRef.current?.autoplay?.stop();
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      // Если ничего не выбрано, запускаем автоплей
      swiperRef.current?.autoplay?.start();
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProjectIndex, isGalleryOpen, closeGallery]);

  return (
    <Swiper
      // Модули
      modules={[Autoplay, Mousewheel, FreeMode]}
      onSwiper={(swiper) => {
        swiperRef.current = swiper; // сохраняем инстанс
      }}
      // Все параметры, которые вы раньше указывали
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
      {cards.map((card, index) => {
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
