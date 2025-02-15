"use client";

import { useState } from "react";
import MediaModal from "./MediaModal";
import { getBaseUrl } from "@/utils/getUrl";

interface GalleryProps {
  project: any;
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

  // 1) Ищем блок text-content
  const textContentBlock = project.content.find(
    (block: any) => block.__component === "blocks.text-content",
  );
  // Текст на выбранном языке:
  const text = textContentBlock?.[language] || "";

  // 2) Ищем блок gallery
  const galleryBlock = project.content.find(
    (block: any) => block.__component === "blocks.gallery",
  );
  const images = galleryBlock?.images || [];
  const videos = galleryBlock?.videos || [];
  const external = galleryBlock?.external || [];

  const [activeMedia, setActiveMedia] = useState<{
    src: string;
    type: "image" | "video" | "external";
  } | null>(null);

  // Обработчик клика по миниатюре
  function openMedia(src: string, type: "image" | "video" | "external") {
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
          {images.map((img: any, index: number) => (
            <div
              key={img.id || index}
              className="relative w-full h-fit mb-4 border cursor-pointer rounded-sm"
              onClick={() => openMedia(img.url, "image")}
            >
              {/* Thumb */}
              <img
                src={getBaseUrl(img.url)}
                alt={img.alternativeText || "image"}
                className="object-cover w-full"
              />
            </div>
          ))}

          {videos && videos.length > 0 ? (
            videos.map((vid: any, index: number) => (
              <div key={vid.id || index} className="mt-2">
                <button onClick={() => openMedia(getBaseUrl(vid.url), "video")}>
                  <video autoPlay muted loop className="w-150 h-150">
                    <source
                      src={getBaseUrl(vid.url)}
                      type="video/mp4"
                    />
                  </video>
                </button>
              </div>
            ))
          ) : (
            <p>No local videos</p>
          )}

          {external && external.length > 0 ? (
            external.map((link: string, index: number) => (
              <div key={index} className="mt-2">
                <button
                  onClick={() => openMedia(getBaseUrl(link), "external")}
                ></button>
              </div>
            ))
          ) : (
            <p>No external links</p>
          )}
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
