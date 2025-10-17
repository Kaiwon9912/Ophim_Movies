import { useSearchParams, useNavigate } from "react-router-dom";
import { useSearch } from "@/features/movies/hook";
import { Spinner } from "@/components/Spinner";
import { MovieCard } from "@/features/movies/components/movieCard";
import PaginationWrapper from "@/components/PaginationWrapper";

export default function SearchPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  // 🔍 Lấy keyword và page từ query
  const keyword = params.get("keyword") || "";
  const currentPage = parseInt(params.get("page") || "1", 10);
  const limit = 24;

  const { data, isLoading } = useSearch(keyword, currentPage, limit);
  const movies = data?.data?.items || [];

  const totalPages =
    data?.data?.params?.pagination?.totalPages ||
    Math.ceil((data?.data?.params?.pagination?.totalItems ?? 1) / limit);

  if (isLoading) return <Spinner />;

  const handlePageChange = (newPage: number) => {
    navigate(`/tim-kiem?keyword=${keyword}&page=${newPage}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-6">
      <h1 className="text-3xl font-bold mb-6">
        Kết quả tìm kiếm cho:{" "}
        <span className="text-red-500">{keyword}</span>
      </h1>

      {movies.length === 0 ? (
        <p className="text-gray-400">Không tìm thấy phim nào.</p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {movies.map((movie: any) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <PaginationWrapper
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
}
