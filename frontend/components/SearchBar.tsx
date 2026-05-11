"use client";

export default function SearchBar({
  value,
  onChange,
}: any) {
  return (
    <input
      value={value}
      onChange={(e) =>
        onChange(
          e.target.value
        )
      }
      placeholder="Search files..."
      className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700"
    />
  );
}