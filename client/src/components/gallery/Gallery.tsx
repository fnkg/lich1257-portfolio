"use client";

import { useState } from "react";

import { getBaseUrl, getYouTubeThumbnail } from "@/utils/getUrl";
import MediaModal from "./MediaModal";

import type {
  ExternalLink,
  MediaType,
  Project,
  DynamicComponent,
  Image,
  Local,
} from "@/types";

interface GalleryProps {
  project: Project;
  language: Local;
  closeGallery: () => void;
  toggleLanguage: () => void;
}

export default function Gallery({
  project,
  language,
  closeGallery,
  toggleLanguage,
}: GalleryProps) {
  if (!project.content) {
    return null;
  }

  const textContentBlock = project.content.find(
    (block: DynamicComponent) => block.__component === "blocks.text-content",
  );
  const text = textContentBlock?.[language] ?? "";

  const galleryBlock = project.content.find(
    (block: DynamicComponent) => block.__component === "blocks.gallery",
  );
  const images = galleryBlock?.images ?? [];
  const videos = galleryBlock?.videos ?? [];
  const external = galleryBlock?.external ?? [];

  const [activeMedia, setActiveMedia] = useState<{
    src: string;
    type: MediaType;
  } | null>(null);

  function openMedia(src: string, type: MediaType) {
    setActiveMedia({ src, type });
  }

  function closeModal() {
    setActiveMedia(null);
  }

  return (
    <div className="fixed inset-0 z-30 flex">
      {/* Левая часть (текст) */}
      <section className="relative flex flex-col w-1/3 p-4 bg-black border border-r-0">
        <button
          onClick={toggleLanguage}
          className="audioMenuMain p-1 text-2xl hover:text-[#00ff00] hover:font-bold rounded-sm border cursor-pointer"
        >
          {language === "en" ? "en" : "ru"}
        </button>
        <h2 className="p-4 pb-2 text-4xl uppercase font-bold">
          {project.title}
        </h2>
        <p className="px-4 text-2xl overflow-y-auto">{text}</p>
      </section>

      {/* Правая часть (медиа) */}
      <section className="relative flex flex-col w-2/3 p-4 bg-black border">
        <button
          onClick={closeGallery}
          className="audioMenuMain relative z-10 p-1 text-2xl hover:text-[#00ff00] hover:font-bold rounded-sm border cursor-pointer"
        >
          ✕
        </button>
        <div className="grid grid-cols-2 gap-4 mt-4 px-4 pt-10 border overflow-y-auto rounded-sm">
          {images.map((img: Image, index: number) => (
            <div
              key={img.id || index}
              className="relative w-full h-fit mb-4 border cursor-pointer rounded-sm"
              onClick={() => openMedia(getBaseUrl(img.url), "image")}
            >
              <img
                src={getBaseUrl(img.url)}
                alt={img.alternativeText || "image"}
                className="object-cover w-full"
              />
            </div>
          ))}

          {videos.map((vid: Image, index: number) => (
            <div key={vid.id || index} className="mt-2">
              <button onClick={() => openMedia(getBaseUrl(vid.url), "video")}>
                <video
                  autoPlay
                  muted
                  loop
                  className="w-150 h-150 cursor-pointer"
                >
                  <source src={getBaseUrl(vid.url)} type="video/mp4" />
                </video>
              </button>
            </div>
          ))}

          {external.map((link: ExternalLink, index: number) => {
            const youtubeThumbnail = getYouTubeThumbnail(link.href);
            return (
              <div key={index} className="mt-2">
                <button
                  onClick={() => openMedia(link.href, "external")}
                  className="relative w-full h-fit border cursor-pointer rounded-sm"
                >
                  {youtubeThumbnail ? (
                    <img
                      src={youtubeThumbnail}
                      alt="YouTube Thumbnail"
                      className="object-cover w-full rounded-sm"
                    />
                  ) : (
                    <p className="text-white">Invalid YouTube link</p>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Модальное окно для выбранного медиа */}
      {activeMedia && (
        <MediaModal
          src={activeMedia.src}
          type={activeMedia.type}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
