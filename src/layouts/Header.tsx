import Dropdown from "@/components/Navbar/Dropdown";
import SearchBar from "@/components/Navbar/SearchBar";
import { useOphimList } from "@/features/common/hooks";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { data: genresData } = useOphimList("the-loai");
  const genres = genresData?.items || [];

  const { data: countriesData } = useOphimList("quoc-gia");
  const countries = countriesData?.items || [];

  const navigate = useNavigate();

  const handleSelectCategory = (slug: string) => {
    navigate(`/the-loai/${slug}/1`);
  };

  const handleSelecteCountry = (slug: string) => {
    navigate(`/quoc-gia/${slug}/1`);
  };

  return (
    <nav className="fixed top-0 h-16 left-0 right-0 w-full bg-gray-900 text-white z-50 shadow-lg">
      <div className="w-full flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <a href="/" className="text-xl font-bold text-blue-400">
            PhimDex
          </a>

          <div className="items-center hidden md:flex md:text-sm font-bold space-x-5">
            <Dropdown label="Thể loại" items={genres} onSelect={handleSelectCategory} />
            <Dropdown label="Quốc gia" items={countries} onSelect={handleSelecteCountry} />

            <div
              className="hover:text-blue-400 cursor-pointer"
              onClick={() => navigate(`/danh-sach/phim-le/1`)}
            >
              Phim lẻ
            </div>
            <div
              className="hover:text-blue-400 cursor-pointer"
        onClick={() => navigate(`/danh-sach/phim-bo/1`)}
            >
              Phim bộ
            </div>
          </div>
        </div>

        <SearchBar />
      </div>
    </nav>
  );
}
