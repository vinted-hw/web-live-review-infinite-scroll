import { fetchPhotos } from "@/lib/pexels";
import ImageGrid from "@/app/components/ImageGrid";

export default async function Home() {
  const photos = await fetchPhotos(1);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-12 text-center">
        Photo Gallery
      </h1>
      <ImageGrid photos={photos} />
    </main>
  );
}
