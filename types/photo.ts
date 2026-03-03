export interface PhotoSrc {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}

export interface Photo {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string; // could be `\`#${string}\`` for stricter typing — open question
  src: PhotoSrc;
  liked: boolean;
  alt: string;
}

export interface PexelsPhotosResponse {
  total_results: number;
  page: number;
  per_page: number;
  photos: Photo[];
  next_page?: string;
  prev_page?: string;
}
