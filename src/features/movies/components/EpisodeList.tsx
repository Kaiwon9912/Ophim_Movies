import { PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";

type Episode = {
  name: string;
  slug: string;
  link_embed: string;
};

interface EpisodeListProps {
  movieSlug: string;
  movieType: string;
  episodes?: Episode[];
  currentEpisodeSlug?: string;
}

export default function EpisodeList({
  movieSlug,
  movieType,
  episodes = [],
  currentEpisodeSlug,
}: EpisodeListProps) {
  if (movieType != "single") {
    return (
      <div className="flex flex-wrap gap-2 mt-4 max-w-7xl m-auto">
        {episodes.map((ep, index) => {
          const isActive = ep.slug === currentEpisodeSlug;

          return (
            <Link
              key={index}
              to={`/xem/${movieSlug}/${ep.slug}`}
              className={`px-3 py-2 w-32 text-center text-sm rounded-md border transition ${
                isActive
                  ? "bg-blue-600 text-white border-blue-500 shadow"
                  : "bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700"
              }`}
            >
              Tập {ep.name || index + 1}
            </Link>
          );
        })}
      </div>
    );
  }

  // Nếu là phim lẻ (single)
  return (
    
    <Link
      to={`/xem/${movieSlug}/full`}
      className="mt-4 flex justify-center space-x-5 w-full  px-5 py-2 bg-red-600 hover:bg-red-700  text-md items-center font-semibold rounded-lg shadow transition"
    >
      <span>Xem ngay</span>
      <PlayCircle/>
    </Link>
  );
}
