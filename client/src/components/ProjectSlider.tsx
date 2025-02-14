'use client';
import { useState, useRef } from 'react';
import useSwiperUtils from '@/utils/useSwiper';
// import ProjectGallery from './ProjectGallery';
import '@/styles/slider.css';

interface Project {
    img: string;
    title: string;
}

interface ProjectSliderProps {
    projects: Project[];
}

const ProjectSlider = ({ projects }: ProjectSliderProps) => {
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
    const [language, setLanguage] = useState('en');
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const swiperRef = useRef(null);
    const [hoverState, setHoverState] = useState({
        isHovering: false,
        pointerPosition: { x: 0, y: 0 },
        hoveredProject: null
    });

    const handlePointerMove = (e, project) => {
        setHoverState((prevState) => ({
            ...prevState,
            pointerPosition: { x: e.clientX, y: e.clientY },
            hoveredProject: project
        }));
    };

    const handlePointerEnter = (project) => {
        setHoverState((prevState) => ({
            ...prevState,
            isHovering: true,
            hoveredProject: project
        }));
    };

    const handlePointerLeave = () => {
        setHoverState((prevState) => ({
            ...prevState,
            isHovering: false,
            hoveredProject: null
        }));
    };

    const openGallery = (index) => {
        setIsGalleryOpen(true);
        setSelectedProjectIndex(index);
    };

    const closeGallery = () => {
        setIsGalleryOpen(false);
        setSelectedProjectIndex(null);
    };

    const toggleLanguage = () => {
        setLanguage((currentLanguage) => (currentLanguage === 'en' ? 'ru' : 'en'));
    };

    useSwiperUtils(swiperRef, selectedProjectIndex, isGalleryOpen, closeGallery)

    return (
        <>
            <swiper-container ref={swiperRef} init="false" class="swiper-container">
                {projects.map((project, index) => (
                    <swiper-slide key={index} class="swiper-slide">
                        <div
                            className="project-card relative w-[600px] h-[600px] max-w-[250px] max-h-[400px] 2xl:max-w-[700px] 2xl:max-h-[700px] xl:max-w-[600px] xl:max-h-[600px] lg:max-w-[500px] lg:max-h-[500px] md:max-w-[400px] md:max-h-[400px] sm:max-w-[300px] sm:max-h-[300px] bg-cover bg-center bg-no-repeat cursor-pointer group"
                            style={{
                                backgroundImage: `url(${project.img})`,
                            }}
                            onClick={() => openGallery(index)}
                            onPointerEnter={() => handlePointerEnter(project)}
                            onPointerLeave={handlePointerLeave}
                            onPointerMove={(e) => handlePointerMove(e, project)}
                        >
                            <div className="card-hover"></div>
                        </div>
                    </swiper-slide>
                ))}
            </swiper-container>
            {hoverState.isHovering && hoverState.hoveredProject && (
                <h2 className="sticky-heading fixed pointer-events-none"
                    style={{ top: hoverState.pointerPosition.y, left: hoverState.pointerPosition.x }}>{hoverState.hoveredProject.title}</h2>
            )}
            {isGalleryOpen && selectedProjectIndex !== null && (
                <ProjectGallery
                    project={projects[selectedProjectIndex]}
                    closeGallery={closeGallery}
                    language={language}
                    toggleLanguage={toggleLanguage}
                />
            )}

        </>
    );
};

export default ProjectSlider;