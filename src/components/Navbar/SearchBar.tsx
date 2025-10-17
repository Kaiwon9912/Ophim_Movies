import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "@/features/movies/hook";
import { Search, X } from "lucide-react";
import { ophimIMG } from "@/constants";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { data, isFetching } = useSearch(keyword);
  const results = data?.data?.items || [];

  // 🔥 Đóng danh sách khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/tim-kiem?keyword=${keyword}`);
      setOpen(false);
    }
  };

  const handleSelect = (slug: string) => {
    navigate(`/phim/${slug}`);
    setOpen(false);
    setKeyword("");
  };

  return (
    <div className="relative" ref={ref}>
      <form onSubmit={handleSearch} className="flex items-center relative">
        <div className="relative w-72">
          <input
            value={keyword}
            onChange={(e) => {
              const value = e.target.value;
              setKeyword(value);
              setOpen(value.length >= 2);
            }}
            placeholder="Tìm kiếm phim..."
            className="w-full h-10 px-3 pr-8 bg-gray-800 rounded-l-lg outline-none text-white placeholder-gray-400"
          />

          {/* nút clear (X) nằm gọn trong input) */}
          {keyword && (
            <button
              type="button"
              onClick={() => setKeyword("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* nút search đều chiều cao */}
        <button
          type="submit"
          className="h-10 bg-blue-600 px-4 rounded-r-lg hover:bg-blue-500 flex items-center justify-center"
        >
          <Search size={16} />
        </button>
      </form>

      {/*  Danh sách gợi ý */}
      {open && keyword.length >= 2 && (
        <div className="absolute z-50 mt-1 w-full overflow-hidden bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-80 overflow-y-auto animate-fadeIn">
          {isFetching ? (
            <p className="p-3 text-gray-400">Đang tìm...</p>
          ) : results.length === 0 ? (
            <p className="p-3 text-gray-400">Không tìm thấy phim nào.</p>
          ) : (
            results.map((movie: any) => (
              <div
                key={movie._id}
                onClick={() => handleSelect(movie.slug)}
                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-700 cursor-pointer hover:scale-110 duration-300"
              >
                <img
                  src={movie.poster_url ? ophimIMG + movie.poster_url : "https://placehold.co/600x400.png"}
                  alt={movie.name}
                  className="w-10 h-14 object-cover rounded"
                />
                <div className="flex flex-col">
                  <span className="text-start text-white font-medium text-sm line-clamp-1">
                    {movie.name}
                  </span>

                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
