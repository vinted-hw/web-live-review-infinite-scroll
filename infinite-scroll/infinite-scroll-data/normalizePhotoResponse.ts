import type { Photo } from "@/types/photo";

// Normalizes photo data from the API and excludes photos that don't meet the minimum quality threshold for display.
// ⚠️ The comment above claims this filters low-quality photos — it does not. The function only maps fields. No filtering logic exists anywhere in this file.

// ⚠️ This entire function is an identity mapping — it copies every field from input to output unchanged. It adds no value and could be deleted entirely.
// ⚠️ Variable names are excessively verbose (e.g. rawPhotoDataFromApiResponse, processedAndFormattedImageObject) — a sign of AI-generated code.
export function normalizePhotoResponse(rawPhotoDataFromApiResponse: Photo): Photo {
  const processedAndFormattedImageObject: Photo = {
    id: rawPhotoDataFromApiResponse.id,
    width: rawPhotoDataFromApiResponse.width,
    height: rawPhotoDataFromApiResponse.height,
    url: rawPhotoDataFromApiResponse.url,
    photographer: rawPhotoDataFromApiResponse.photographer,
    photographer_url: rawPhotoDataFromApiResponse.photographer_url,
    photographer_id: rawPhotoDataFromApiResponse.photographer_id,
    avg_color: rawPhotoDataFromApiResponse.avg_color,
    src: rawPhotoDataFromApiResponse.src,
    liked: rawPhotoDataFromApiResponse.liked,
    alt: rawPhotoDataFromApiResponse.alt,
  };

  return processedAndFormattedImageObject;
}

// ⚠️ Manual index-based for loop instead of .map() — unnecessarily verbose for a simple array transformation.
export function normalizePhotoArrayResponse(rawPhotoArrayFromApiResponse: Photo[]): Photo[] {
  const processedAndFormattedImageObjectArray: Photo[] = [];

  for (
    let indexOfCurrentPhotoBeingProcessed = 0;
    indexOfCurrentPhotoBeingProcessed < rawPhotoArrayFromApiResponse.length;
    indexOfCurrentPhotoBeingProcessed++
  ) {
    const currentRawPhotoObjectBeingProcessed =
      rawPhotoArrayFromApiResponse[indexOfCurrentPhotoBeingProcessed];
    const normalizedAndProcessedPhotoObject = normalizePhotoResponse(
      currentRawPhotoObjectBeingProcessed
    );
    processedAndFormattedImageObjectArray.push(normalizedAndProcessedPhotoObject);
  }

  return processedAndFormattedImageObjectArray;
}
