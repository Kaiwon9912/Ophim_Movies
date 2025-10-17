import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMovieCategory } from "@/features/movies/hook";
import { Spinner } from "@/components/Spinner";
import { MovieCard } from "@/features/movies/components/movieCard";
import { useNavigate } from "react-router-dom";

import PaginationWrapper from "@/components/PaginationWrapper";

export default function CategoryPage() {
    const navigate = useNavigate();
 const   limit = 24
const { slug, page } = useParams<{ slug: string; page?: string }>();
const currentPage = page ? parseInt(page, 10) : 1;

const { data, isLoading } = useMovieCategory(slug!, currentPage, limit);



  if (isLoading) return <Spinner />;

  const movies = data?.data?.items || [];
  const pagination = data?.data.params.pagination
 const totalPages = Math.ceil(
  (pagination?.totalItems ?? 1) / (pagination?.totalItemsPerPage ?? 1)
);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-6">
      <h1 className="text-3xl font-bold mb-6 capitalize text-start">
        Thể loại: <span className="text-red-500">{slug?.replace(/-/g, " ")}</span>
      </h1>

      {movies.length === 0 ? (
        <p className="text-gray-400">Không có phim nào trong thể loại này.</p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>

          {/* Shadcn Pagination */}
            <div className="mt-8 flex justify-center">
           <PaginationWrapper
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(newPage) => navigate(`/the-loai/${slug}/${newPage}`)}
            />
          </div>
        </>
      )}
    </div>
  );
}
