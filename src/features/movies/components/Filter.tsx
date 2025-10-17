import { useState } from "react";
import "@/css/index.css";
import type { Item } from "@/types/movie.types";

type FilterProps = {
  categoryItems: Item[];
  countryItems: Item[];
  slugItems: Item[]; // ✅ thêm nhóm lọc theo slug
  appliedFilters: {
    slug: string;
    category: string[];
    country: string[];
    year: string[];
  };
  onApply: (filters: {
    slug: string;
    category: string[];
    country: string[];
    year: string[];
  }) => void;
  onClear: () => void;
};

export default function FilterGroup({
  categoryItems,
  countryItems,
  slugItems,
  appliedFilters,
  onApply,
  onClear,
}: FilterProps) {
  const yearItems = Array.from({ length: 2025 - 1980 + 1 }, (_, i) => ({
    name: (1980 + i).toString(),
    slug: (1980 + i).toString(),
  }));

  const [selected, setSelected] = useState({
    slug: appliedFilters.slug,
    category: [...appliedFilters.category],
    country: [...appliedFilters.country],
    year: [...appliedFilters.year],
  });

  // Toggle multiple (cho thể loại, quốc gia, năm)
  const toggleSelect = (key: "category" | "country" | "year", slug: string) => {
    setSelected((prev) => {
      const alreadySelected = prev[key].includes(slug);
      return {
        ...prev,
        [key]: alreadySelected
          ? prev[key].filter((s) => s !== slug)
          : [...prev[key], slug],
      };
    });
  };

  // Chọn slug duy nhất
  const selectSlug = (slug: string) => {
    setSelected((prev) => ({ ...prev, slug }));
  };

  return (
    <div className="relative bg-black text-white p-6 rounded-lg grid gap-4">
      {/* --- Loại phim --- */}
      <div className="grid grid-cols-[150px_1fr] items-start gap-4">
        <div className="font-semibold text-start">Loại phim</div>
        <div className="flex flex-wrap gap-2">
          {slugItems.map((item) => {
            const isSelected = selected.slug === item.slug;
            return (
              <span
                key={item.slug}
                onClick={() => selectSlug(item.slug)}
                className={`px-2 py-1 rounded cursor-pointer whitespace-nowrap transition-colors ${
                  isSelected ? "bg-red-600" : "bg-gray-900 hover:bg-gray-700"
                }`}
              >
                {item.name}
              </span>
            );
          })}
        </div>
      </div>

      <div className="w-full h-[1px] bg-white"></div>

      {/* --- Thể loại --- */}
      <div className="grid grid-cols-[150px_1fr] items-start gap-4">
        <div className="font-semibold text-start">Thể loại</div>
        <div className="flex flex-wrap gap-2">
          {categoryItems.map((item) => {
            const isSelected = selected.category.includes(item.slug);
            return (
              <span
                key={item.slug}
                onClick={() => toggleSelect("category", item.slug)}
                className={`px-2 py-1 rounded cursor-pointer whitespace-nowrap transition-colors ${
                  isSelected ? "bg-red-600" : "bg-gray-900 hover:bg-gray-700"
                }`}
              >
                {item.name}
              </span>
            );
          })}
        </div>
      </div>

      <div className="w-full h-[1px] bg-white"></div>

      {/* --- Quốc gia --- */}
      <div className="grid grid-cols-[150px_1fr] items-start gap-4">
        <div className="font-semibold text-start">Quốc gia</div>
        <div className="flex flex-wrap gap-2">
          {countryItems.map((item) => {
            const isSelected = selected.country.includes(item.slug);
            return (
              <span
                key={item.slug}
                onClick={() => toggleSelect("country", item.slug)}
                className={`px-2 py-1 rounded cursor-pointer whitespace-nowrap transition-colors ${
                  isSelected ? "bg-red-600" : "bg-gray-900 hover:bg-gray-700"
                }`}
              >
                {item.name}
              </span>
            );
          })}
        </div>
      </div>

      <div className="w-full h-[1px] bg-white"></div>

      {/* --- Năm phát hành --- */}
      <div className="grid grid-cols-[150px_1fr] items-start gap-4">
        <div className="font-semibold text-start">Năm phát hành</div>
        <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-2">
          {yearItems.map((item) => {
            const isSelected = selected.year.includes(item.slug);
            return (
              <span
                key={item.slug}
                onClick={() => toggleSelect("year", item.slug)}
                className={`px-2 py-1 rounded cursor-pointer whitespace-nowrap transition-colors ${
                  isSelected ? "bg-red-600" : "bg-gray-900 hover:bg-gray-700"
                }`}
              >
                {item.name}
              </span>
            );
          })}
        </div>
      </div>

      {/* --- Nút hành động --- */}
      <div className="flex justify-end gap-4 mt-4">
        <button
          onClick={onClear}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Hủy
        </button>
        <button
          onClick={() => onApply(selected)}
          className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
        >
          Áp dụng
        </button>
      </div>
    </div>
  );
}
