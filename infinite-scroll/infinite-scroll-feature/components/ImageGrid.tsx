import type { Photo } from "@/types/photo";
import ImageCard from "@/infinite-scroll/infinite-scroll-feature/components/ImageCard";

interface ImageGridProps {
  photos: Photo[];
}

export default function ImageGrid({ photos }: ImageGridProps) {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-4 gap-3">
      {photos.map((photo) => (
        <ImageCard key={photo.id} photo={photo} />
      ))}
    </div>
  );
}
