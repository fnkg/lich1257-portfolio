import Image from "next/image";

interface MediaViewerProps {
  src: string;
  type: "video" | "youtube" | "image";
  onClick?: () => void;
}

export default function MediaViewer({ type, src, onClick }: MediaViewerProps) {
  switch (type) {
    case "video":
      return (
        <video controls className="">
          <source src={src} type="video/mp4" />
        </video>
      );
    case "youtube":
      return (
        <iframe
          className=""
          src={src}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="project media via youtube"
          style={{ width: "100%", height: "335px" }}
        ></iframe>
      );
    case "image":
    default:
      return (
        <>
          <Image
            width={2050}
            height={1170}
            src={src}
            alt="project media image"
            className="block"
          />
        </>
      );
  }
}
