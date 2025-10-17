import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

export type CheckBoxProps = {
  label: string;
  items: { name: string; slug: string }[];
  selected: string[];
  setSelected: (values: string[]) => void;
};

const CheckboxFilter: React.FC<CheckBoxProps> = ({
  label,
  items,
  selected,
  setSelected,
}) => {
  const toggleValue = (slug: string) => {
    if (selected.includes(slug)) {
      setSelected(selected.filter((v) => v !== slug));
    } else {
      setSelected([...selected, slug]);
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-4 w-full sm:w-auto">
      <h3 className="font-semibold mb-2 text-lg">{label}</h3>
      <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
        {items.map((item) => (
          <label
            key={item.slug}
            className="flex items-center gap-2 cursor-pointer text-sm"
          >
            <Checkbox
              checked={selected.includes(item.slug)}
              onCheckedChange={() => toggleValue(item.slug)}
            />
            {item.name}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckboxFilter;
