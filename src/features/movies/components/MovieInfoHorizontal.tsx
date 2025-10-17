import { Link } from "react-router-dom";
import { ophimIMG } from "@/constants";
import DOMPurify from "dompurify";

interface MovieInfoSmallProps {
  movie: any;
}

export default function MovieInfoSmall({ movie }: MovieInfoSmallProps) {
  const genres = movie.category?.map((c: any) => c.name).join(", ");

  return (
    <div className="flex gap-3 bg-gray-800 border border-gray-700 rounded-lg p-2 max-h-36 w-full shadow-sm overflow-hidden">
      
      {/* Ảnh */}
      <div className="w-24 flex-shrink-0">
        <img
          src={`${ophimIMG}${movie.thumb_url}`}
          alt={movie.name}
          className="w-full h-full object-cover rounded"
        />
      </div>

      {/* Nội dung */}
      <div className="flex-1 flex flex-col justify-between text-xs text-white">
        <h3 className="font-semibold truncate">{movie.name}</h3>
        <div className="flex flex-wrap gap-1">
          {movie.year && <span className="bg-red-600 px-1 rounded">{movie.year}</span>}
          {movie.quality && <span className="bg-green-600 px-1 rounded">{movie.quality}</span>}
          {movie.lang && <span className="bg-blue-600 px-1 rounded">{movie.lang}</span>}
        </div>
        {genres && (
          <div className="flex flex-wrap gap-1 text-gray-300">
            {movie.category?.map((cat: any) => (
              <Link key={cat.id} to={`/the-loai/${cat.slug}`} className="hover:text-blue-400 truncate">
                {cat.name}
              </Link>
            ))}
          </div>
        )}
      </div>
      
      {/* Content */}
      {movie.content && (
        <div
          className="hidden md:block bg-gray-700 border border-gray-600 rounded p-2 text-gray-200 text-xs flex-1 truncate"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize((movie.content || '').slice(0, 100)),
          }}
        />
      )}
    </div>
  );
}
