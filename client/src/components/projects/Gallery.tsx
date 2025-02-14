"use client";

import React, { useState } from "react";
import MediaModal from "../../legacy__components/projects/MediaModal";
import MediaViewer from "../../legacy__components/projects/MediaViewer";

import type { ProjectCard } from "@/types";

interface GalleryProps {
  project: ProjectCard;
  closeGallery: () => void;
  language: "en" | "ru";
  toggleLanguage: () => void;
}

export default function Gallery({
  project,
  closeGallery,
  language,
  toggleLanguage,
}: GalleryProps) {
  const [selectedMedia, setSelectedMedia] = useState<{
    src: string | null;
    type: "video" | "youtube" | "image" | null;
  }>({ src: null, type: null });

  const handleMediaClick = (
    src: string,
    type: "video" | "youtube" | "image"
  ) => {
    setSelectedMedia({ src, type });
  };

  const handleCloseModal = () => {
    setSelectedMedia({ src: null, type: null });
  };

  return (
    <section className="fixed inset-0 z-30 flex">
      {/* Левая панель (текст + язык) */}
      <article className="relative flex flex-col w-1/3 p-4 bg-black border border-r-0">
        <button
          className="p-1 text-2xl hover:text-[#00ff00] hover:font-bold rounded-sm border"
          onClick={toggleLanguage}
        >
          {language === "en" ? "ru" : "en"}
        </button>

        <h2 className="p-4 pb-2 text-4xl uppercase font-bold">{project.title}</h2>
        <p className="px-4 text-2xl overflow-y-auto">
          {language === "en" ? project.textEn ?? "" : project.textRu ?? ""}
        </p>
      </article>

      {/* Правая панель (медиа) */}
      <div className="relative flex flex-col w-2/3 p-4 bg-black border">
        <button
          className="relative z-10 p-1 text-2xl hover:text-[#00ff00] hover:font-bold rounded-sm border"
          onClick={closeGallery}
        >
          ✕
        </button>
        <div className="grid grid-cols-2 gap-4 mt-4 px-4 pt-10 border overflow-y-auto rounded-sm">
          {project.media?.map((mediaItem, index) => (
            <div
              key={index}
              className="relative w-full h-fit mb-4 border cursor-pointer rounded-sm"
              onClick={() => handleMediaClick(mediaItem.src, mediaItem.type)}
            >
              <MediaViewer type={mediaItem.type} src={mediaItem.src} />
              <div className="absolute inset-0 w-inherit h-inherit" />
            </div>
          ))}
        </div>
      </div>

      {/* Модалка для просмотра отдельного медиа */}
      {selectedMedia.src && selectedMedia.type && (
        <MediaModal
          src={selectedMedia.src}
          type={selectedMedia.type}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
}
