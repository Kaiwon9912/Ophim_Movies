import { Link } from "react-router-dom";
import { ophimIMG } from "@/constants";
import { InfoChip } from "@/components/ui/chip";
import { Clock, Globe } from "lucide-react";
import DOMPurify from 'dompurify'
interface MovieInfoCardProps {
  movie: any;
  horizontal?: boolean; // default false
}

export default function MovieInfoCard({ movie, horizontal = false }: MovieInfoCardProps) {
  const genres = movie.category?.map((c: any) => c.name).join(", ");
  const countries = movie.country?.map((c: any) => c.name).join(", ");
  const actors = movie.actor?.join(",");

  return (
    
      <div
      className={`rounded-lg shadow-lg overflow-hidden ${
        horizontal ? "flex flex-col md:flex-row gap-6 p-4" : "space-y-6 p-4 flex lg:block"
      }`}
    >
      {/* --- Ảnh movie --- */}
      <div>
              <div className={`${horizontal ? "md:w-48 flex-shrink-0" : "w-52  lg:w-full"}`}>
              <img
                src={`${ophimIMG}${movie.thumb_url}`}
                alt={movie.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            {/* Trailer */}
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
      {/* --- Nội dung thông tin --- */}
      <div className="flex-1 flex flex-col justify-between gap-4 p-2">
        {/* Tên movie */}
        <h2 className="text-xl md:text-2xl font-bold text-white text-start">
          {movie.name}
        </h2>

        {/* Chips thông tin */}
        <div className="flex flex-wrap gap-2">
          {movie.year && <span className="bg-red-600 px-3 py-1 rounded-full text-sm">{movie.year}</span>}
          {movie.quality && <span className="bg-green-600 px-3 py-1 rounded-full text-sm">{movie.quality}</span>}
          {movie.lang && <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">{movie.lang}</span>}
          {movie.type === "series" && (
            <span className="bg-purple-600 px-3 py-1 rounded-full text-sm">{movie.episode_current}</span>
          )}
        </div>

        {/* Thông tin thêm */}
        <div className="flex flex-wrap gap-2">
          {movie.time && <InfoChip icon={Clock} text={movie.time} />}
          {countries && <InfoChip icon={Globe} text={countries} />}
        </div>

        {/* Thể loại */}
        {genres && (
          <div className="flex flex-wrap gap-2">
            {movie.category?.map((cat: any) => (
              <Link
                key={cat.id}
                to={`/the-loai/${cat.slug}`}
                className="bg-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-600"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        )}

        {/* Đạo diễn & Diễn viên */}
        {movie.director && <p className="text-gray-300 text-start">Đạo diễn: {movie.director}</p>}
        {actors && <p className="text-gray-300 text-start">Diễn viên: {actors}</p>}


      </div >
          {horizontal &&  movie.content && (
   
          
              <div
                  className="text-sm text-gray-200 prose prose-invert max-w-none  bg-gray-800 rounded-lg p-6 border flex-1"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize((movie.content || '').slice(0, 480)),
                  }}
                />
    

            )}
              
    </div>

  );
}
