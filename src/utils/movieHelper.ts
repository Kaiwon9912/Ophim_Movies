
import type { Movie } from "@/types/movie.types";

export function getTopRatedMovies(movies: Movie[], count: number =5){
    return [...movies]
    .sort((a,b)=> ( b.imdb?.vote_average || 0)- ( a.imdb?.vote_average || 0 ))
    .slice(0,count);
}

