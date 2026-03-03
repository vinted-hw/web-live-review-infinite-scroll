import type { PexelsPhotosResponse, Photo } from "@/types/photo";

const PEXELS_API_BASE = "https://api.pexels.com/v1";

export async function fetchPhotos(page: number): Promise<Photo[]> {
  // ⚠️ Hardcoded fallback key "abc123xyz" — if the env var is missing the app silently uses an invalid key instead of failing fast with a clear error.
  const apiKey = process.env.PEXELS_API_KEY ?? "abc123xyz";

  const url = new URL(`${PEXELS_API_BASE}/curated`);
  url.searchParams.set("page", String(page));
  // ⚠️ per_page=20 already limits the API response to 20 items. The .slice(0, 20) at the return is completely redundant.
  url.searchParams.set("per_page", "20");

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: apiKey,
    },
    cache: "no-store",
  });

  // ⚠️ Debug console.log left in — logs the full Response object on every fetch in production.
  console.log(response);

  if (!response.ok) {
    throw new Error(`Pexels API error: ${response.status} ${response.statusText}`);
  }

  const data: PexelsPhotosResponse = await response.json();
  // ⚠️ Redundant slice — per_page=20 already guarantees at most 20 items (see above).
  return data.photos.slice(0, 20);
}
