"use client";

import React, { useState } from "react";
import CustomSwiper from "@/components/category/CustomSwiper";
import Gallery from "@/components/gallery/Gallery";
import "@/styles/slider.css";

import type { ProjectCard } from "@/types";

interface SliderProps {
  cards: ProjectCard[];
}

export default function Slider({ cards }: SliderProps) {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<
    number | null
  >(null);
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
    project: ProjectCard
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
    setSelectedProjectIndex(index);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
    setSelectedProjectIndex(null);
  };

  const toggleLanguage = () => {
    setLanguage((cur) => (cur === "en" ? "ru" : "en"));
  };

  return (
    <>
      <CustomSwiper
        cards={cards}
        selectedProjectIndex={selectedProjectIndex}
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

      {isGalleryOpen && selectedProjectIndex !== null && (
        <Gallery
          project={cards[selectedProjectIndex]}
          closeGallery={closeGallery}
          language={language}
          toggleLanguage={toggleLanguage}
        />
      )}
    </>
  );
}
