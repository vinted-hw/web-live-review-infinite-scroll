import type { PexelsPhotosResponse, Photo } from "@/types/photo";

const PEXELS_API_BASE = "https://api.pexels.com/v1";
const PER_PAGE = 20;

export async function fetchPhotos(page: number): Promise<Photo[]> {
  const apiKey = process.env.PEXELS_API_KEY;

  if (!apiKey) {
    throw new Error("PEXELS_API_KEY environment variable is not set");
  }

  const url = new URL(`${PEXELS_API_BASE}/curated`);
  url.searchParams.set("page", String(page));
  url.searchParams.set("per_page", String(PER_PAGE));

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: apiKey,
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Pexels API error: ${response.status} ${response.statusText}`);
  }

  const data: PexelsPhotosResponse = await response.json();
  return data.photos;
}
