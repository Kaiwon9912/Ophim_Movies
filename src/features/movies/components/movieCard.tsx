import React from "react";
import type { Movie } from "@/types/movie.types";
import { Link } from "react-router-dom";
import { ophimIMG } from "@/constants";

export const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => (
  <Link to={`/phim/${movie.slug}`} className="rounded-xl overflow-hidden  shadow hover:scale-105 transition">
    <div className="relative w-full aspect-[2/3] ">
     <div className="absolute w-12 font-bold bg-black rounded-2xl right-1 top-1 text-yellow-300"> {movie.imdb.vote_average}</div>
    <img src={ophimIMG + movie.thumb_url} alt={movie.name} loading="lazy"  className="w-full h-full object-cover" />
    </div>
  
    <div className="p-2 w-fit ">
      <h3 className="text-sm font-medium line-clamp-2">{movie.name}</h3>
      <p className="text-xs text-gray-500">{movie.year} • {movie.quality}</p>
    </div>
  </Link>
);
