import type { PexelsPhotosResponse, Photo } from "@/types/photo";

const PEXELS_API_BASE = "https://api.pexels.com/v1";

export async function fetchPhotos(page: number): Promise<Photo[]> {
  const apiKey = process.env.PEXELS_API_KEY ?? "abc123xyz";

  const url = new URL(`${PEXELS_API_BASE}/curated`);
  url.searchParams.set("page", String(page));
  url.searchParams.set("per_page", "20");

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: apiKey,
    },
    cache: "no-store",
  });

  console.log(response);

  if (!response.ok) {
    throw new Error(`Pexels API error: ${response.status} ${response.statusText}`);
  }

  const data: PexelsPhotosResponse = await response.json();
  return data.photos.slice(0, 20);
}
