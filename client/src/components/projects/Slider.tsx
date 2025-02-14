"use client";
import { useState, useRef } from "react";
import useSwiper from "@/utils/useSwiper";
import Gallery from "./Gallery";
import "@/styles/slider.css";

interface ProjectImage {
  id: number;
  url: string;
  alternativeText?: string | null;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image?: ProjectImage;
}

interface ProjectSliderProps {
  projects: Project[];
}

export default function Slider({ projects }: ProjectSliderProps) {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const [language, setLanguage] = useState("en");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Track hover state
  const [hoverState, setHoverState] = useState({
    isHovering: false,
    pointerPosition: { x: 0, y: 0 },
    hoveredProject: null as Project | null,
  });

  // Swiper reference
  const swiperRef = useRef(null);

  // Handle pointer events for hover
  const handlePointerMove = (e: React.PointerEvent, project: Project) => {
    setHoverState((prev) => ({
      ...prev,
      pointerPosition: { x: e.clientX, y: e.clientY },
      hoveredProject: project,
    }));
  };

  const handlePointerEnter = (project: Project) => {
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

  useSwiper(swiperRef, selectedProjectIndex, isGalleryOpen, closeGallery);

  return (
    <>
      <swiper-container ref={swiperRef} init="false" class="swiper-container">
        {projects.map((project, index) => {
          const bgImageUrl = project.image?.url
            ? "http://localhost:1337" + project.image.url
            : "/fallback.jpg";

          return (
            <swiper-slide key={project.id} class="swiper-slide">
              <div
                className="project-card relative w-[600px] h-[600px] max-w-[250px] max-h-[400px]
                           2xl:max-w-[700px] 2xl:max-h-[700px] xl:max-w-[600px] xl:max-h-[600px]
                           lg:max-w-[500px] lg:max-h-[500px] md:max-w-[400px] md:max-h-[400px]
                           sm:max-w-[300px] sm:max-h-[300px]
                           bg-cover bg-center bg-no-repeat cursor-pointer group"
                style={{ backgroundImage: `url(${bgImageUrl})` }}
                onClick={() => openGallery(index)}
                onPointerEnter={() => handlePointerEnter(project)}
                onPointerLeave={handlePointerLeave}
                onPointerMove={(e) => handlePointerMove(e, project)}
              >
                <div className="card-hover"></div>
              </div>
            </swiper-slide>
          );
        })}
      </swiper-container>

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

      {/* Project Gallery Modal */}
      {isGalleryOpen && selectedProjectIndex !== null && (
        <Gallery
          project={projects[selectedProjectIndex]}
          closeGallery={closeGallery}
          language={language}
          toggleLanguage={toggleLanguage}
        />
      )}
    </>
  );
}
