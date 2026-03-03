import Image from "next/image";
import type { Photo } from "@/types/photo";

interface ImageCardProps {
  photo: Photo;
}

export default function ImageCard({ photo }: ImageCardProps) {
  return (
    <div className="break-inside-avoid mb-4 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative w-full" style={{ aspectRatio: `${photo.width} / ${photo.height}` }}>
        <Image
          src={photo.src.large}
          // ⚠️ alt="Image from Pexels" is hardcoded — identical for every card. photo.alt is already provided by the Pexels API and should be used here instead.
          alt="Image from Pexels"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
          className="object-cover"
        />
      </div>
      <div className="px-3 py-2 bg-white">
        <p className="text-xs text-gray-500 truncate">
          Photo by{" "}
          <a
            href={photo.photographer_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:underline"
          >
            {photo.photographer}
          </a>
        </p>
      </div>
    </div>
  );
}
