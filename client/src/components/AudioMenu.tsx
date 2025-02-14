"use client";
import { useEffect } from "react";

export default function AudioMenu() {
  useEffect(() => {
    function handlePointerEnter(e: Event) {
      const target = e.target as HTMLElement;
      const audioId = target.dataset.beeper;
      if (!audioId) return;
      const audioEl = document.getElementById(
        audioId
      ) as HTMLAudioElement | null;
      if (audioEl) {
        audioEl.play();
      }
    }

    function attachListeners() {
      const navLinks = document.querySelectorAll(
        ".audioMenuMain, .audioMenuCat"
      );
      navLinks.forEach((link, i) => {
        // Only attach if not already set
        if (!link.hasAttribute("data-beeper")) {
          const isMain = link.classList.contains("audioMenuMain");
          const audioId = `beep-${isMain ? "main" : "cat"}${i}`;

          if (!document.getElementById(audioId)) {
            const audio = document.createElement("audio");
            audio.id = audioId;
            audio.preload = "auto";
            audio.style.display = "none";
            audio.volume = 0.25;

            const source = document.createElement("source");
            source.src = isMain ? "/audio/menu1.wav" : "/audio/menu2.wav";
            audio.appendChild(source);

            document.body.appendChild(audio);
          }
          link.setAttribute("data-beeper", audioId);
          link.addEventListener("pointerenter", handlePointerEnter);
        }
      });
    }

    // Initial attachment
    attachListeners();

    // Observe DOM changes to attach listeners for dynamically rendered dropdown links
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      const navLinks = document.querySelectorAll(
        ".audioMenuMain, .audioMenuCat"
      );
      navLinks.forEach((link) => {
        link.removeEventListener("pointerenter", handlePointerEnter);
      });
    };
  }, []);

  return null;
}
