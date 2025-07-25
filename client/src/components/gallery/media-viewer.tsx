import Image from "next/image";
import { getYouTubeEmbedUrl } from "@/utils/get-url";

interface MediaViewerProps {
  src: string;
  type: "video" | "external" | "image";
}

export default function MediaViewer({ type, src }: MediaViewerProps) {
  console.log("Image src at Modal:", src);

  switch (type) {
    case "video":
      return (
        <video controls className="w-full h-full object-contain">
          <source src={src} type="video/mp4" />
        </video>
      );
    case "external":
      const embedUrl = getYouTubeEmbedUrl(src);
      return (
        <iframe
          src={embedUrl}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture, fullscreen"
          allowFullScreen
          title="project media via youtube"
          className="w-full h-full"
        ></iframe>
      );
    case "image":
    default:
      return (
        <div className="relative w-full h-full">
          <Image
            src={src}
            alt="project media image"
            fill
            className="object-contain"
          />
        </div>
      );
  }
}
