import type { Photo } from "@/types/photo";
import ImageCard from "./ImageCard";

interface ImageGridProps {
  photos: Photo[];
}

export default function ImageGrid({ photos }: ImageGridProps) {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
      {photos.map((photo) => (
        <ImageCard key={photo.id} photo={photo} />
      ))}
    </div>
  );
}
