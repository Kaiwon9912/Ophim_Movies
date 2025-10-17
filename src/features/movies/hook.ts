import { useQuery } from "@tanstack/react-query";
import { getHomeMovies, getMovieByCategory, getMovieByCountry, getMovieBySearch, getMovieDetail, getMovieFilter, getMovieImage } from "./api";

export const useHomeMovies = () =>
  useQuery({
    queryKey: ["home-movies"],
    queryFn: getHomeMovies,
  });

export const useMovieDetail = (slug: string) =>
  useQuery({
    queryKey: ["movie-detail", slug],
    queryFn: () => getMovieDetail(slug),
    enabled: !!slug,
  });

export const useMovieImage = (slug: string) =>
    useQuery({
        queryKey: ["movie-image", slug],
        queryFn: ()=> getMovieImage(slug),
        enabled: !! slug
})


export const useMovieCategory = (slug: string, page: number, limit: number) =>
   useQuery({
    queryKey: ["movie-category", slug,page],
    queryFn: ()=> getMovieByCategory(slug,page,limit),
    enabled: !! slug
})
export const useMovieCountry = (slug: string, page: number, limit: number) =>
   useQuery({
    queryKey: ["movie-country", slug,page],
    queryFn: ()=> getMovieByCountry(slug,page,limit),
    enabled: !! slug
})
export const useSearch = (keyword: string, page = 1, limit = 24) =>
  useQuery({
    queryKey: ["search", keyword, page,limit],
    queryFn: () => getMovieBySearch(keyword, page, limit),
    enabled: keyword.length >= 2,

  });

interface FilterOptions {
  sortfield?: string;
  category?: string | string[]; // cho phép mảng từ checkbox
  country?: string | string[];
  year?: string;
}

export const useMovieFilter = (
  slug: string,
  page: number,
  limit: number,
  options: FilterOptions = {}
) => {
  return useQuery({
    queryKey: [
      "movie-filter",
      slug,
      page,
      limit,
      options.sortfield,
      options.category,
      options.country,
      options.year,
    ],
    queryFn: () =>
      getMovieFilter(
        slug,
        page,
        limit,
        options.sortfield,
        options.category,
        options.country,
        options.year
      ),
    enabled: !!slug,
  });
};