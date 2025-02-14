"use client";

import React, { useState } from "react";
import CustomSwiper from "@/components/category/CustomSwiper";
import Gallery from "@/components/gallery/Gallery";
import "@/styles/slider.css";

import type { ProjectCard } from "@/types";

interface SliderProps {
  cards: ProjectCard[];
  galleryData: any[];
}

export default function Slider({ cards, galleryData }: SliderProps) {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [language, setLanguage] = useState<"en" | "ru">("en");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const [hoverState, setHoverState] = useState<{
    isHovering: boolean;
    pointerPosition: { x: number; y: number };
    hoveredProject: ProjectCard | null;
  }>({
    isHovering: false,
    pointerPosition: { x: 0, y: 0 },
    hoveredProject: null,
  });

  const handlePointerMove = (
    e: React.PointerEvent<HTMLDivElement>,
    project: ProjectCard,
  ) => {
    setHoverState((prev) => ({
      ...prev,
      pointerPosition: { x: e.clientX, y: e.clientY },
      hoveredProject: project,
    }));
  };

  const handlePointerEnter = (project: ProjectCard) => {
    setHoverState((prev) => ({
      ...prev,
      isHovering: true,
      hoveredProject: project,
    }));
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
          project={galleryData.find((item) => item.title === selectedProject)}
          closeGallery={closeGallery}
          language={language}
          toggleLanguage={toggleLanguage}
        />
      )}
    </>
  );
}
