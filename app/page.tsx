// ⚠️ This file is doing way too much all at once.
// ⚠️ 'use client' used at a very high level. Loses the opportunity to use server side for important parts.
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
  // ⚠️ Spinner is defined inside Home — it gets re-created on every render. Should be extracted outside the component or into its own file.
  function Spinner() {
    return (
      <div className="flex justify-center py-8">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
      </div>
    );
  }

  // ⚠️ Typed as any[] instead of Photo[] — loses all type safety downstream.
  const [photos, setPhotos] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // ⚠️ window.scrollY accessed at render time — throws ReferenceError on the server (SSR). Needs useEffect or a typeof window guard.
  const scrollDepth = window.scrollY;

  // ⚠️ totalPages is a pure derivation of totalResults — useEffect + setState adds an unnecessary extra render. Should just be: const totalPages = Math.ceil(totalResults / 20)
  useEffect(() => {
    setTotalPages(Math.ceil(totalResults / 20));
  }, [totalResults]);

  useEffect(() => {
    async function loadInitial() {
      setLoading(true);
      try {
        const initialPhotos = await fetchPhotos(1);
        setPhotos(normalizePhotoArrayResponse(initialPhotos));
        // ⚠️ totalResults is never set — totalPages will always be 0, which breaks the load-more guard.
      } catch (err) {
        // ⚠️ console.log instead of console.error. Error is swallowed — no error state, no feedback to the user.
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    loadInitial();
  }, []);

  // ⚠️ loadMore is not wrapped in useCallback — a new function reference is created on every render,
  // causing the useInfiniteScroll effect to tear down and re-subscribe on every render.
  async function loadMore() {
    if (loading || page >= totalPages) return;
    const nextPage = page + 1;
    setLoading(true);
    try {
      const newPhotos = await fetchPhotos(nextPage);
      setPhotos((prev) => [...prev, ...normalizePhotoArrayResponse(newPhotos)]);
      setPage(nextPage);
    } catch (err) {
      // ⚠️ Same as above — error silently swallowed, no user feedback.
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useInfiniteScroll(loadMore, sentinelRef, 0.5, true, 200);

  // ⚠️ Feature flag check placed after all hooks — data fetching has already fired by the time this returns null.
  // This guard should be at the very top of the component, before any hooks.
  if (!FEATURE_FLAGS.INFINITE_SCROLL_ENABLED) {
    return null;
  }

  // ⚠️ Type assertion as Photo[] papers over the any[] state type instead of fixing it at the source.
  const initialPhotos = photos.slice(0, 20) as Photo[];
  const additionalPhotos = photos.slice(20);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-12 text-center">
        Photo Gallery
      </h1>

      {/* ⚠️ scrollDepth is captured but this data attribute goes nowhere — never read, never sent anywhere. Dead code. */}
      <span data-scroll-depth={scrollDepth} className="hidden" />

      {/*  ⚠️  This separation of "initial photos" and "additional photos" is not the most elegant solution. */}
      <ImageGrid photos={initialPhotos} />

      {additionalPhotos.length > 0 && (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 mt-0">
          {additionalPhotos.map((photo) => (
            <div
              key={photo.id}
              className="break-inside-avoid mb-4 rounded-lg overflow-hidden shadow-sm"
            >
              {/* ⚠️ Raw <img> instead of Next.js <Image> — loses automatic optimisation, lazy loading, and WebP conversion. */}
              {/* ⚠️ alt="Photo" is hardcoded and identical for every image — useless for screen readers and SEO. photo.alt is available. */}
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

      {/*  ⚠️  This button is actually the opposite of what the Jira ticket asked for. Pinterest-style infinite scroll should not have a button to load more. */}
      <div className="flex justify-center mt-6">
        <Button onClick={loadMore} disabled={loading || page >= totalPages}>
          Load more
        </Button>
      </div>
    </main>
  );
}
