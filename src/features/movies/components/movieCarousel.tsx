import React from 'react'
import { type EmblaOptionsType } from 'embla-carousel'

import useEmblaCarousel from 'embla-carousel-react'
import {  ChevronRight } from "lucide-react"
import type { Movie } from '@/types/movie.types'
import { MovieCard } from './movieCard'
import { useNavigate } from 'react-router-dom'

type PropType = {
  sectionName: string
  movies?: Movie[] 
  options?: EmblaOptionsType
  slug: string 
  
}

const MovieCarousel: React.FC<PropType> = ({sectionName, movies,options, slug}) => {
  const [emblaRef] = useEmblaCarousel(options)
  const navigate = useNavigate()


  const handleViewAll = () => {
    navigate(`/danh-sach/${slug}/1`) // Ví dụ page mặc định = 1
  }



  return (
    <section className="embla max-w-8xl ">
        <div className='text-start text-3xl flex items-center cursor-default mt-2 mb-5'>
        <span>  {sectionName} </span>
       <div 
          className='cursor-pointer ml-4 rounded-full justify-between flex items-center border p-1 group w-8 hover:w-32 transition-all duration-300'
          onClick={handleViewAll} // Thêm event
        >
          <span className='group-hover:ml-2 text-sm max-w-0 group-hover:max-w-36 overflow-hidden text-nowrap'>Xem tất cả</span>
          <ChevronRight />
        </div>
        </div>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container_movies">
          {movies?.map((movie) => (
            <div className="embla__slide " key={movie._id}>
                <MovieCard movie={movie}/>
            </div>
          ))}
        </div>
      </div>


    </section>
  )
}

export default MovieCarousel
