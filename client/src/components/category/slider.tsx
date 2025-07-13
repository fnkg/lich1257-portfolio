"use client";

import React, { useState } from "react";
import CustomSwiper from "@/components/category/custom-swiper";
import Gallery from "@/components/gallery/gallery";
import "@/styles/slider.css";

import type { ProjectCard, ProjectGallery, Local } from "@/types";
import { fallbackProject } from "@/utils/fallbacks";

interface SliderProps {
  cards: ProjectCard[];
  galleryData: ProjectGallery[];
}

interface HoverState {
  isHovering: boolean;
  pointerPosition: { x: number; y: number };
  hoveredProject?: ProjectCard | null;
}

export default function Slider({ cards, galleryData }: SliderProps) {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [language, setLanguage] = useState<Local>("en");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const [hoverState, setHoverState] = useState<HoverState>({
    isHovering: false,
    pointerPosition: { x: 0, y: 0 },
  });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    setHoverState((prev) => {
      if (prev.pointerPosition.x === e.clientX && prev.pointerPosition.y === e.clientY) {
        return prev;
      }
      return { ...prev, pointerPosition: { x: e.clientX, y: e.clientY } };
    });
  };

  const handlePointerEnter = (project: ProjectCard) => {
    setHoverState({
      isHovering: true,
      pointerPosition: hoverState.pointerPosition,
      hoveredProject: project,
    });
  };

  const handlePointerLeave = () => {
    setHoverState((prev) => ({
      ...prev,
      isHovering: false,
      hoveredProject: null,
    }));
  };

  const openGallery = (index: number) => {
    setIsGalleryOpen(true);
    setSelectedProject(cards[index].title);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
    setSelectedProject(null);
  };

  const toggleLanguage = () => {
    setLanguage((cur) => (cur === "en" ? "ru" : "en"));
  };

  return (
    <>
      <CustomSwiper
        cards={cards}
        isGalleryOpen={isGalleryOpen}
        closeGallery={closeGallery}
        openGallery={openGallery}
        handlePointerEnter={handlePointerEnter}
        handlePointerLeave={handlePointerLeave}
        handlePointerMove={handlePointerMove}
      />

      {hoverState.isHovering && hoverState.hoveredProject && (
        <h2
          className="sticky-heading fixed pointer-events-none"
          style={{
            top: hoverState.pointerPosition.y,
            left: hoverState.pointerPosition.x,
          }}
        >
          {hoverState.hoveredProject.title}
        </h2>
      )}

      {isGalleryOpen && selectedProject !== null && (
        <Gallery
          project={
            galleryData.find((item) => item.title === selectedProject) ??
            fallbackProject
          }
          closeGallery={closeGallery}
          language={language}
          toggleLanguage={toggleLanguage}
        />
      )}
    </>
  );
}
