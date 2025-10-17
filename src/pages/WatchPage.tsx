import { useParams, Link } from "react-router-dom";
import { useMovieDetail } from "@/features/movies/hook";
import { Spinner } from "@/components/Spinner";
import EpisodeList from "@/features/movies/components/EpisodeList";
import { ChevronLeft } from "lucide-react";

export default function WatchPage() {
  const { slug, episodeSlug } = useParams<{ slug: string; episodeSlug: string }>();
  const { data, isLoading } = useMovieDetail(slug!);

  if (isLoading) return <Spinner />;

  const movie = data?.data.item;
  const episodes = movie?.episodes?.[0]?.server_data || [];
  const episode = episodes.find((ep: any) => ep.slug === episodeSlug);

  if (!movie || !episode)
    return <div className="p-4 text-white">Không tìm thấy tập phim</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header: Back + Title + Episode */}
      <div className=" mx-auto flex items-center justify-between px-4 py-3 border-b border-gray-800 max-w-[1650px]">
        <div className="flex items-center gap-3 ">
          <Link
            to={`/phim/${movie.slug}`}
            className="text-gray-300 hover:text-white transition"
          >
          <ChevronLeft/>
          </Link>
          <h1 className="text-lg md:text-xl font-semibold text-white">
            {movie.name}
            <span className="text-gray-400"> – Tập {episode.name}</span>
          </h1>
        </div>
      </div>

      {/* Video Player */}
      <div className="max-w-[1650px] m-auto aspect-video bg-black">
        <iframe
          src={episode.link_embed}
          title={`${movie.name} - Tập ${episode.name}`}
          className="w-full h-full border-0"
          allowFullScreen
        />
      </div>

      {/* Episode List */}
        <EpisodeList
            movieSlug={slug!}
            movieType={movie.type}
            episodes={episodes}
            currentEpisodeSlug={episodeSlug}
        />

    </div>
  );
}
