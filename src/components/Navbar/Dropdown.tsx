import { useState, useEffect, useRef } from "react";
import "@/css/index.css"
type DropdownProps = {
  label: string;
  items: { name: string; slug: string }[];
  onSelect?: (item: string) => void;
};

export default function Dropdown({ label, items, onSelect }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
 console.log(items)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onClick={() => setOpen((prev) => !prev)}
    >
      <button className="px-3 py-2 hover:text-blue-400">{label}</button>

      {open && (
        <div
          className="absolute left-0 top-full mt-2 w-[30rem] rounded-lg bg-gray-800 shadow-lg z-50 h-96 overflow-scroll hide-scrollbar "
        >
          <ul className="grid grid-cols-3 gap-2 p-2">
            {items.map((item) => (
              <li
                key={item.slug}
                onClick={() => {
                  onSelect?.(item.slug);
                  setOpen(false); // 👉 đóng sau khi click chọn
                }}
                className="px-4 py-2 hover:bg-gray-700 cursor-pointer w-36"
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
