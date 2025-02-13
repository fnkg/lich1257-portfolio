import { useEffect } from "react";
import { Autoplay, Mousewheel, FreeMode } from "swiper/modules";
import { register } from "swiper/element/bundle";
import { SwiperOptions } from 'swiper/types';

import type {
  SwiperRef,
  Breakpoints,
  MousewheelOptions,
  AutoplayOptions,
  FreeModeOptions,
  CloseGallery,
} from "@/types";

register();


const useSwiperUtils = (
  swiperRef: SwiperRef,
  selectedProjectIndex: number | null,
  isGalleryOpen: boolean,
  closeGallery: CloseGallery
) => {
  useEffect(() => {
    if (swiperRef.current) {
      Object.assign(swiperRef.current, {
        modules: [Autoplay, Mousewheel, FreeMode],
        slidesPerView: 3,
        simulateTouch: false,
        preventClicks: true,
        preventClicksPropagation: true,
        slideToClickedSlide: true,
        breakpoints: {
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        } as Breakpoints,
        mousewheel: {
          enabled: true,
          sensitivity: 1.75,
        } as MousewheelOptions,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        } as AutoplayOptions,
        loop: true,
        speed: 5000,
        freeMode: {
          enabled: true,
          minimumVelocity: 0.02,
          momentum: false,
          momentumBounce: false,
          momentumRatio: 1.75,
          sticky: false,
        } as FreeModeOptions,
      });
      swiperRef.current.initialize();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeGallery();
      }
    };

    if (selectedProjectIndex !== null || isGalleryOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper;
      if (selectedProjectIndex !== null) {
        swiperInstance.autoplay.stop();
      } else {
        swiperInstance.autoplay.start();
      }
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProjectIndex, isGalleryOpen, swiperRef, closeGallery]);
};

export default useSwiperUtils;
