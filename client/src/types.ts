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