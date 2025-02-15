import type { RefObject } from "react";
import type { SwiperContainer } from "swiper/element/bundle";

/** ===== UNION ===== */
export type MediaType = "image" | "video" | "external";
export type Local = "en" | "ru";

/** ===== COMMON TYPES ===== */
export type SwiperRef = RefObject<SwiperContainer | null>;

/** ===== IMAGE TYPES ===== */
export interface Image {
  alternativeText: string | null;
  id: number;
  url: string;
}

export interface ImageProps extends Image {
  documentId: string;
}

/** ===== LINK TYPES ===== */
export interface LinkProps {
  id: number;
  text: string;
  href: string;
  isExternal: boolean;
}

export type ExternalLink = {
  id: number;
  href: string;
  isExternal: boolean;
  text: string;
};

export interface DropdownProps {
  id: number;
  text: string;
  link: LinkProps[];
}

/** ===== PROJECT TYPES ===== */
export type DynamicComponent = {
  __component: string;
  [key: string]: any;
};

export interface ProjectCard {
  id: number;
  image?: Image;
  title: string;
}

export interface ProjectGallery extends ProjectCard {
  content: DynamicComponent[];
  description: string | null;
  id: number;
  title: string;
}

export interface Project {
  content: DynamicComponent[] | null;
  description: string | null;
  id: number;
  title: string;
}
