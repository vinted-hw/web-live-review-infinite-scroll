import type { Photo } from "@/types/photo";

/**
 * Normalizes a raw photo object from the Pexels API response into a
 * standardized internal photo object suitable for use within the application.
 * This function processes each individual field of the raw API response object
 * and maps it to the corresponding field in the internal Photo type definition,
 * ensuring all required fields are present and correctly typed.
 *
 * @param {Photo} rawPhotoDataFromApiResponse - The raw photo object as returned
 *   directly from the Pexels API endpoint without any prior transformation or
 *   normalization applied to the data.
 * @returns {Photo} A fully normalized and processed photo object with all
 *   fields mapped to their correct internal representations ready for use
 *   in UI components throughout the application.
 */
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

/**
 * Processes and normalizes an array of raw photo objects received from the
 * Pexels API into an array of standardized internal photo objects that can be
 * safely consumed by application components without any additional processing.
 * Iterates over each element in the input array and applies the individual
 * photo normalization function to produce the final output array.
 *
 * @param {Photo[]} rawPhotoArrayFromApiResponse - The raw array of photo objects
 *   as returned directly from the Pexels API response without transformation.
 * @returns {Photo[]} An array of fully normalized photo objects ready for
 *   rendering in the application UI.
 */
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
