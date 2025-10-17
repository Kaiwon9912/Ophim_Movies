import { api } from "@/lib/axios";
import type { MovieImageResponse } from "@/types/image.type";
import type { MovieListResponse, MovieDetailResponse } from "@/types/movie.types";

export const getHomeMovies = async (): Promise<MovieListResponse> => {
  const url = "/v1/api/home";

  const response = await api.get(url);

  return response.data;
};
export const getMovieDetail = async (slug: string): Promise<MovieDetailResponse> => {
  const { data } = await api.get(`/v1/api/phim/${slug}`);
  return data;
};

export const getMovieImage = async (slug: string): Promise<MovieImageResponse>  => {
  const {data} = await api.get(`/v1/api/phim/${slug}/images`)
  return data;
} 

export const getMovieByCategory = async(slug: string, page:number , limit: number): Promise<MovieListResponse> => {
  const {data} = await api.get(`/v1/api/the-loai/${slug}?page=${page}&limit=${limit}`)
  return data;
}
export const getMovieByCountry = async(slug: string, page:number , limit: number): Promise<MovieListResponse> => {
  const {data} = await api.get(`/v1/api/quoc-gia/${slug}?page=${page}&limit=${limit}`)
  return data;
}

export const getMovieBySearch = async (keyword: string, page = 1, limit = 24) => {
  const { data } = await api.get(
    `v1/api/tim-kiem?keyword=${keyword}&page=${page}&limit=${limit}`
  );
  return data;
};

export const getMovieFilter = async (
  slug: string,
  page: number,
  limit: number,
  sortfield?: string,
  category?: string | string[],
  country?: string | string[],
  year?: string
): Promise<MovieListResponse> => {
  const params: Record<string, any> = { page, limit };

  if (sortfield) params.sortfield = sortfield;
  if (category) params.category = Array.isArray(category) ? category.join(",") : category;
  if (country) params.country = Array.isArray(country) ? country.join(",") : country;
  if (year) params.year = year;

  const { data } = await api.get(`/v1/api/danh-sach/${slug}`, { params });
  return data;
};