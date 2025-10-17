import { Link } from "react-router-dom";
import { ophimIMG } from "@/constants";
import { InfoChip } from "@/components/ui/chip";
import { Clock, Globe } from "lucide-react";

interface MovieInfoVerticalProps {
  movie: any;
}

export default function MovieInfoVertical({ movie }: MovieInfoVerticalProps) {
  const genres = movie.category?.map((c: any) => c.name).join(", ");
  const countries = movie.country?.map((c: any) => c.name).join(", ");
  const actors = movie.actor?.join(",");

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4 space-y-4">
      {/* Ảnh và Trailer */}
      <div>
        <img
          src={`${ophimIMG}${movie.thumb_url}`}
          alt={movie.name}
          className="w-full h-full object-cover rounded-lg"
        />
        {movie.trailer_url && (
          <a
            href={movie.trailer_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full bg-blue-400 px-4 py-2 rounded hover:bg-blue-600 text-center mt-2"
          >
            Xem Trailer
          </a>
        )}
      </div>

      {/* Thông tin cơ bản */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold text-white">{movie.name}</h2>

        <div className="flex flex-wrap gap-2">
          {movie.year && <span className="bg-red-600 px-3 py-1 rounded-full text-sm">{movie.year}</span>}
          {movie.quality && <span className="bg-green-600 px-3 py-1 rounded-full text-sm">{movie.quality}</span>}
          {movie.lang && <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">{movie.lang}</span>}
          {movie.type === "series" && <span className="bg-purple-600 px-3 py-1 rounded-full text-sm">{movie.episode_current}</span>}
        </div>

        <div className="flex flex-wrap gap-2">
          {movie.time && <InfoChip icon={Clock} text={movie.time} />}
          {countries && <InfoChip icon={Globe} text={countries} />}
        </div>

        {genres && (
          <div className="flex flex-wrap gap-2">
            {movie.category?.map((cat: any) => (
              <Link key={cat.id} to={`/the-loai/${cat.slug}`} className="bg-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-600">
                {cat.name}
              </Link>
            ))}
          </div>
        )}

        {movie.director && <p className="text-gray-300">Đạo diễn: {movie.director}</p>}
        {actors && <p className="text-gray-300">Diễn viên: {actors}</p>}
      </div>
    </div>
  );
}
