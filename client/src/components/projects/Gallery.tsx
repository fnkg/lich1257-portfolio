import { useState } from 'react';
// import MediaModal from './MediaModal';
// import MediaViewer from './MediaViewer';

interface Project {
    title: string;
    textEn: string;
    textRu: string;
    media: { src: string; type: "video" | "youtube" | "image" }[];
}

interface GalleryProps {
    project: Project;
    closeGallery: () => void;
    language: string;
    toggleLanguage: () => void;
}

const Gallery: React.FC<GalleryProps> = ({ project, closeGallery, language, toggleLanguage }) => {
    const [selectedMedia, setSelectedMedia] = useState<{ src: string | null; type: "video" | "youtube" | "image" | null }>({ src: null, type: null });

    interface Media {
        src: string;
        type: "video" | "youtube" | "image";
    }

    interface SelectedMedia {
        src: string | null;
        type: "video" | "youtube" | "image" | null;
    }

    const handleMediaClick = (src: Media['src'], type: Media['type']) => {
        setSelectedMedia({ src, type });
    };

    const handleCloseModal = () => {
        setSelectedMedia({ src: null, type: null });
    };

    return (
        <section className="fixed inset-0 z-30 flex">
            <article className="relative flex flex-col w-1/3 p-4 bg-black border border-r-0">
                <button
                    className="p-1 text-2xl hover:text-[#00ff00] hover:font-bold rounded-sm border"
                    onClick={toggleLanguage}
                >
                    {language === 'en' ? 'ru' : 'en'}
                </button>
                <h2 className="p-4 pb-2 text-4xl uppercase font-bold">{project.title}</h2>
                <p className=" px-4 text-2xl overflow-y-auto">
                    {language === 'en' ? project.textEn : project.textRu}
                </p>
            </article>
            <div className="relative flex flex-col w-2/3 p-4 bg-black border">
                <button
                    className="relative z-10 p-1 text-2xl hover:text-[#00ff00] hover:font-bold rounded-sm border"
                    onClick={closeGallery}
                >
                    ✕
                </button>
                <div className="grid grid-cols-2 gap-4 mt-4 px-4 pt-10 border overflow-y-auto rounded-sm">
                    {project.media.map((mediaItem, index) => (
                        <div
                            key={index}
                            className="relative w-full h-fit mb-4 border cursor-pointer rounded-sm"
                            onClick={() => handleMediaClick(mediaItem.src, mediaItem.type)}
                        >
                            <MediaViewer type={mediaItem.type} src={mediaItem.src} />
                            <div className="absolute inset-0 w-inherit h-inherit"></div>
                        </div>
                    ))}
                </div>
            </div>
            {selectedMedia.src && selectedMedia.type && (
                <MediaModal src={selectedMedia.src} type={selectedMedia.type} onClose={handleCloseModal} />
            )}
        </section>
    );
};
export default Gallery;