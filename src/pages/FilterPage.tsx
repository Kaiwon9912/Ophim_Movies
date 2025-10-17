import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner } from "@/components/Spinner";
import { MovieCard } from "@/features/movies/components/movieCard";
import PaginationWrapper from "@/components/PaginationWrapper";
import { useMovieFilter } from "@/features/movies/hook";
import FilterGroup from "@/features/movies/components/Filter";
import { useOphimList } from "@/features/common/hooks";
import { ListFilter } from "lucide-react";
import { danhsachphim } from "@/constants";

export default function FilterPage() {
  const navigate = useNavigate();
  const { slug, page } = useParams<{ slug: string; page?: string }>();
  const currentPage = page ? parseInt(page, 10) : 1;
  const limit = 24;

    const [appliedFilters, setAppliedFilters] = useState({
    slug: slug || "phim-moi",
    category: [] as string[],
    country: [] as string[],
    year: [] as string[],
  });

  const [showFilter, setShowFilter] = useState(false);

  const filters = {
    sortfield: "year",
    category: appliedFilters.category.join(","),
    country: appliedFilters.country.join(","),
    year: appliedFilters.year.join(","),
  };

    const { data, isLoading } = useMovieFilter(
    appliedFilters.slug,
    currentPage,
    limit,
    filters
  );
  const { data: genres } = useOphimList("the-loai");
  const { data: countries } = useOphimList("quoc-gia");
  const movies = data?.data?.items || [];
  const pagination = data?.data?.params?.pagination;
  const totalPages = Math.ceil(
    (pagination?.totalItems ?? 1) / (pagination?.totalItemsPerPage ?? 1)
  );
  useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    setAppliedFilters(prev => ({
      ...prev,
      slug: slug || "phim-moi"
    }));
  }, [movies,slug]);



  if (isLoading) return <Spinner />;



  const handleApply = (newFilters: typeof appliedFilters) => {
    setAppliedFilters(newFilters);
    navigate(`/danh-sach/${newFilters.slug}/1`);
    setShowFilter(false);
  };

  const handleClear = () => {
    setAppliedFilters({
      slug: "phim-moi",
      category: [],
      country: [],
      year: [],
    });
    navigate(`/danh-sach/phim-moi/1`);
    setShowFilter(false); //  đóng sau khi hủy
  };

  return (
    <div className="min-h-screen  bg-gray-900 text-white py-10 px-6">
      <div className="flex justify-between items-center mb-6 mt-5">
        <h1 className="text-md md:text-3xl font-bold capitalize">
  
          <span className="text-white">
            {appliedFilters.slug.replace(/-/g, " ")}
          </span>
        </h1>
        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className="text-sm md:text-md flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded"
        >
          <ListFilter size={20} />
          Bộ lọc
        </button>
      </div>

      {/* 🔥 Chỉ hiển thị filter khi mở */}
      {showFilter && (
        <div className="text-start p-2 animate-fadeIn">
          <FilterGroup
            slugItems={danhsachphim}
            categoryItems={genres.items}
            countryItems={countries.items}
            appliedFilters={appliedFilters}
            onApply={handleApply}
            onClear={handleClear}
          />
        </div>
      )}

      {/* Danh sách phim */}
      {movies.length === 0 ? (
        <p className="text-gray-400">Không có phim nào phù hợp.</p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <PaginationWrapper
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(newPage) =>
                navigate(`/danh-sach/${appliedFilters.slug}/${newPage}`)
              }
            />
          </div>
        </>
      )}
    </div>
  );
}
