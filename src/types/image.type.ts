export interface ImageSizeGroup {
  original: string;
  w1280?: string;
  w780?: string;
  w300?: string;
  w342?: string;
  w185?: string;
}

export interface ImageItem {
  width: number;
  height: number;
  aspect_ratio: number;
  type: string; 
  file_path: string;
}

export interface MovieImage {
  tmdb_id: number;
  tmdb_type: string; 
  ophim_id: string;
  slug: string;
  imdb_id: string;
  image_sizes: {
    backdrop: ImageSizeGroup;
    poster: ImageSizeGroup;
  };
  images: ImageItem[];
}

export interface MovieImageResponse {
  success: boolean;
  message: string;
  data: MovieImage;
}
