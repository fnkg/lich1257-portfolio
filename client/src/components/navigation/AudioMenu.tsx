'use client'
import { useEffect } from 'react';

export default function AudioMenu() {
    useEffect(() => {
        audioHover();

        return () => {
            const navLinks = document.querySelectorAll('.audioMenuMain, .audioMenuCat');
            navLinks.forEach((link) => {
                link.removeEventListener('pointerenter', () => {});
            });
        };
    }, []);

    function audioHover() {
        const navLinks = document.querySelectorAll('.audioMenuMain, .audioMenuCat');

        navLinks.forEach((link, i) => {
            const isNavLink = link.classList.contains('audioMenuMain');
            const audioId = `beep-${isNavLink ? 'main' : 'cat'}${i}`;

            if (!document.getElementById(audioId)) {
                const audio = document.createElement('audio');
                audio.id = audioId;
                audio.preload = 'auto';
                audio.style.display = 'none';
                audio.volume = 0.25;
                
                const source = document.createElement('source');
                source.src = isNavLink ? '/audio/menu1.wav' : '/audio/menu2.wav';
                audio.appendChild(source);

                document.body.appendChild(audio);
            }

            link.dataset.beeper = audioId;
        });

        navLinks.forEach((link) => {
            link.addEventListener('pointerenter', () => {
                const audio = document.getElementById(link.dataset.beeper);
                if (audio) {
                    audio.play();
                }
            });
        });
    }

    return null;
}