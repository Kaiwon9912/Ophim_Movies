import { Spinner } from "@/components/Spinner";
import { ophimIMG } from "@/constants";
import EpisodeList from "@/features/movies/components/EpisodeList";

import MovieInfoCard from "@/features/movies/components/MovieInfo";
import { useMovieDetail, useMovieImage } from "@/features/movies/hook";
import { useParams } from "react-router-dom";

import DOMPurify from 'dompurify'
import ImageCarousel from "@/features/movies/components/ImageCarousel";
export default function MovieDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading } = useMovieDetail(slug!);
  const {data: imageData,isLoading: isImageLoading} = useMovieImage(slug!);
  

  if (isLoading) return <Spinner />;

  const movie = data?.data.item;
  if (!movie) return <div className="p-4 text-white">Movie not found</div>;

  const episodes = movie.episodes?.[0]?.server_data || [];

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover  md:h-[36rem] bg-top bg-no-repeat z-0"
        style={{ backgroundImage: `url(${ophimIMG + movie.poster_url})` }}
      >
        <div className="absolute inset-0 bg-black/70" />
      </div>
      <div className="relative md:mt-[14rem]  z-10 px-4  mx-auto  grid grid-cols-1 lg:grid-cols-4 gap-8 pb-8">
        <div className="lg:col-span-1">
          <MovieInfoCard movie={movie} />
        </div>
        <div className="lg:col-span-3">
 
          <div className="lg:mt-[12rem]">
         <div className="text-4xl font-bold text-start">
         <p>{movie.name}</p> 
          <span className="text-sm text-gray-200">{movie.origin_name}</span>
         </div>
         
                        {movie.content && (
   
          
              <div
                  className="text-sm text-gray-200 prose prose-invert max-w-none mt-8 bg-gray-800 rounded-lg p-6 h-32 w-full"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize((movie.content || '').slice(0, 480)),
                  }}
                />
    

            )}
            <EpisodeList
                movieSlug={movie.slug}
                movieType={movie.type}
                episodes={episodes}
              />
            {
              imageData?.data.images &&
                  <div className="mt-12">
                  <h3 className="text-start text-xl p-2">Hình ảnh</h3>
                        <ImageCarousel images={imageData?.data.images}/>
                </div>
            }
          </div>
      
        </div>
      </div>
    </div>
  );
}
