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






export interface LinkProps {
  id: number;
  text: string;
  href: string;
  isExternal: boolean;
}

export interface DropdownProps {
  id: number;
  text: string;
  link: LinkProps[]; // Changed from LinkProps to an array of LinkProps
}

export interface ImageProps {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null; // Allowing null values as per your Strapi data
}