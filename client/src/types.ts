import type { RefObject } from "react";
import type { SwiperContainer } from "swiper/element/bundle";

export interface LinkProps {
  id: number;
  text: string;
  href: string;
  isExternal: boolean;
}

export interface DropdownProps {
  id: number;
  text: string;
  link: LinkProps[];
}

export interface ImageProps {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
}

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
  slug?: any;
}

export type SwiperRef = RefObject<SwiperContainer | null>;

export type CloseGallery = () => void;
