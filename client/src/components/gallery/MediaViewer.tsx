// MediaViewer.tsx
import Image from "next/image";
import { getBaseUrl } from "@/utils/getUrl";

interface MediaViewerProps {
  src: string;
  type: "video" | "external" | "image";
}

export default function MediaViewer({ type, src }: MediaViewerProps) {
  const fullURL = getBaseUrl(src);

  switch (type) {
    case "video":
      return (
        <video controls className="w-full h-full object-contain">
          <source src={fullURL} type="video/mp4" />
        </video>
      );
    case "external":
      return (
        <iframe
          src={fullURL}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
            src={fullURL}
            alt="project media image"
            fill
            className="object-contain"
          />
        </div>
      );
  }
}
