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

// @/types/index.ts
import type { RefObject } from "react";
import type { SwiperContainer } from "swiper/element/bundle";

export interface ProjectImage {
  id: number;
  url: string;
  alternativeText?: string | null;
}

export interface ProjectCard {
  id: number;
  title: string;
  description?: string;
  image?: ProjectImage;
  // Поля для галереи (если нет — undefined)
  textEn?: string;
  textRu?: string;
  media?: {
    src: string;
    type: "video" | "youtube" | "image";
  }[];
}

// Ссылка на <swiper-container>
export type SwiperRef = RefObject<SwiperContainer | null>;

// Тип для закрытия галереи
export type CloseGallery = () => void;
