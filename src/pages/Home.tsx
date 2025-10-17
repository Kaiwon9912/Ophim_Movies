import MainCarousel from "@/components/MainCarousel";
import { Spinner } from "@/components/Spinner";

import MovieCarousel from "@/features/movies/components/movieCarousel";
import { useHomeMovies, useMovieFilter } from "@/features/movies/hook";
import { getTopRatedMovies } from "@/utils/movieHelper";

export default function Home() {
  const { data: homeResponse, isLoading: homeLoading } = useHomeMovies();

  const { data: newResponse, isLoading: newLoading } = useMovieFilter("phim-moi", 1, 16);
  const { data: seriesResponse, isLoading: seriesLoading } = useMovieFilter("phim-bo", 1, 16);
  const { data: singleResponse, isLoading: singleLoading } = useMovieFilter("phim-le", 1, 16);
  const { data: animationResponse, isLoading: animationLoading } = useMovieFilter("hoat-hinh", 1, 16);
  const { data: tvResponse, isLoading: tvLoading } = useMovieFilter("tv-shows", 1, 16);

  const isAnyLoading =
    homeLoading || newLoading || seriesLoading || singleLoading || animationLoading || tvLoading;

  if (isAnyLoading) return <Spinner />;

  const features = getTopRatedMovies(homeResponse?.data.items || [], 5);

  return (
    <div className="pt-16">
      <MainCarousel
        movies={features}
        options={{ loop: true }}
      />

      <MovieCarousel
        movies={newResponse?.data.items}
        sectionName="Phim mới"
        slug="phim-moi"
      />

      <MovieCarousel
        movies={singleResponse?.data.items}
        sectionName="Phim lẻ"
        slug="phim-le"
      />

      <MovieCarousel
        movies={seriesResponse?.data.items}
        sectionName="Phim bộ"
        slug="phim-bo"
      />

      <MovieCarousel
        movies={animationResponse?.data.items}
        sectionName="Hoạt hình"
        slug="hoat-hinh"
      />

      <MovieCarousel
        movies={tvResponse?.data.items}
        sectionName="TV - Shows"
        slug="tv-shows"
      />
    </div>
  );
}
