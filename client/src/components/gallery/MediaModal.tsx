import MediaViewer from "./MediaViewer";

interface MediaModalProps {
  src: string;
  type: "video" | "external" | "image";
  onClose: () => void;
}

export default function MediaModal({ src, type, onClose }: MediaModalProps) {
  console.log(src)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-6xl bg-black rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video">
          <MediaViewer type={type} src={src} />
        </div>
      </div>
    </div>
  );
}
