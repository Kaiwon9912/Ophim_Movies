import React from 'react'
import { type EmblaOptionsType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import type { Movie } from '@/types/movie.types'
import '@/css/embla.css'
import { useMovieDetail} from '@/features/movies/hook'
import { ophimIMG } from '@/constants'
import DOMPurify from 'dompurify'
type PropType = {
  movies: Movie[]
  options?: EmblaOptionsType
}

const MainCarousel: React.FC<PropType> = ({movies, options}) => {
  const [emblaRef] = useEmblaCarousel(options, [Autoplay({ stopOnInteraction: false})])
  
  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container ">
          {movies.map((movie) => (

          <MovieSlide key={movie._id} slug={movie.slug} />
          ))}
        </div>
      </div>
    </section>
  )
}

function MovieSlide({ slug }: { slug: string }) {
  const { data, isLoading } = useMovieDetail(slug)

  if (isLoading || !data) {
    return (
      <div className="embla__slide bg-gray-800 animate-pulse">
        Loading...
      </div>
    )
  }

  const movie = data.data.item
  const poster_url = ophimIMG + movie.poster_url

  return (
    <div
      className="embla__slide relative bg-cover bg-top flex items-end h-[26rem]  md:h-[32rem] text-white"
      style={{ backgroundImage: `url(${poster_url})` }}
    >
      {/* --- VÙNG NỀN ĐEN MỜ --- */}
      <div className="absolute bottom-0 left-0 w-[28rem] h-[17rem]  md:w-[34rem] md:h-[17rem] bg-black/70 rounded-tr-full pointer-events-none" />

      {/* --- NỘI DUNG TRÊN NỀN --- */}
      <div className="relative z-10 p-6  w-[22rem] h-[16rem] md:w-[32rem] md:h-[32-rem]  text-start">
         
        <div className='flex space-x-2 text-xs md:text-sm '>
              <div className='text-yellow-300 border-white rounded-2xl border w-12 px-1 text-center bg-black mb-2'> {movie.imdb.vote_average}</div>
              <Chip name={movie.episode_current}/>
              <Chip name={movie.quality}/>
              <Chip name={movie.type}/>
        </div>
        <h2 className="text-xl md:text-3xl font-bold mb-2 w-[90%]">{movie.name}</h2>
        <div
          className="text-sm text-gray-200 prose prose-invert max-w-none h-30 overflow-hidden line-clamp-6"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize((movie.content || '')),
          }}
        />
      </div>
    </div>
  )
}

function Chip({name}: {name: string})
{
  return (
     <div className='text-white w-fit border-white rounded-2xl border  px-3 text-center bg-black mb-2'> {name}</div>
  );
     
}

export default MainCarousel
