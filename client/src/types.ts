export interface SwiperRef {
  current: {
    swiper: {
      autoplay: {
        stop: () => void;
        start: () => void;
      };
    };
    initialize: () => void;
  } | null;
}

export interface Breakpoints {
  [key: number]: {
    slidesPerView: number;
  };
}

export interface MousewheelOptions {
  enabled: boolean;
  sensitivity: number;
}

export interface AutoplayOptions {
  delay: number;
  disableOnInteraction: boolean;
  pauseOnMouseEnter: boolean;
}

export interface FreeModeOptions {
  enabled: boolean;
  minimumVelocity: number;
  momentum: boolean;
  momentumBounce: boolean;
  momentumRatio: number;
  sticky: boolean;
}

export type CloseGallery = () => void;
