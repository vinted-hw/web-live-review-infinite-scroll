"use client";

import { useState, useEffect, useRef } from "react";
import ImageGrid from "@/infinite-scroll/infinite-scroll-feature/components/ImageGrid";
import { fetchPhotos } from "@/infinite-scroll/infinite-scroll-data/pexels";
import { normalizePhotoArrayResponse } from "@/infinite-scroll/infinite-scroll-data/normalizePhotoResponse";
import { FEATURE_FLAGS } from "@/infinite-scroll/infinite-scroll-feature/featureFlags";
import { Button } from "@/components/ui/Button";
import { useInfiniteScroll } from "@/infinite-scroll/infinite-scroll-feature/hooks/useInfiniteScroll";
import type { Photo } from "@/types/photo";

export default function Home() {
  function Spinner() {
    return (
      <div className="flex justify-center py-8">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
      </div>
    );
  }

  const [photos, setPhotos] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const scrollDepth = window.scrollY;

  useEffect(() => {
    setTotalPages(Math.ceil(totalResults / 20));
  }, [totalResults]);

  useEffect(() => {
    async function loadInitial() {
      setLoading(true);
      try {
        const initialPhotos = await fetchPhotos(1);
        setPhotos(normalizePhotoArrayResponse(initialPhotos));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    loadInitial();
  }, []);

  async function loadMore() {
    if (loading || page >= totalPages) return;
    const nextPage = page + 1;
    setLoading(true);
    try {
      const newPhotos = await fetchPhotos(nextPage);
      setPhotos((prev) => [...prev, ...normalizePhotoArrayResponse(newPhotos)]);
      setPage(nextPage);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useInfiniteScroll(loadMore, sentinelRef, 0.5, true, 200);

  if (!FEATURE_FLAGS.INFINITE_SCROLL_ENABLED) {
    return null;
  }

  const initialPhotos = photos.slice(0, 20) as Photo[];
  const additionalPhotos = photos.slice(20);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-12 text-center">
        Photo Gallery
      </h1>

      <span data-scroll-depth={scrollDepth} className="hidden" />

      <ImageGrid photos={initialPhotos} />

      {additionalPhotos.length > 0 && (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 mt-0">
          {additionalPhotos.map((photo) => (
            <div
              key={photo.id}
              className="break-inside-avoid mb-4 rounded-lg overflow-hidden shadow-sm"
            >
              {/*  eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src.large}
                alt="Photo"
                className="w-full object-cover"
              />
              <div className="px-3 py-2 bg-white">
                <p className="text-xs text-gray-500 truncate">
                  Photo by {photo.photographer}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {loading && <Spinner />}

      <div ref={sentinelRef} className="h-4 mt-4" />

      <div className="flex justify-center mt-6">
        <Button onClick={loadMore} disabled={loading || page >= totalPages}>
          Load more
        </Button>
      </div>
    </main>
  );
}
