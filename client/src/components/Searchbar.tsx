"use search";

interface SearchbarProps {
  handleSearchChange: (search: string) => void;
  search: string;
}

export default function Searchbar({
  handleSearchChange,
  search,
}: SearchbarProps) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchChange(e.target.value);
  };

  return (
    <div className="w-full max-w-lg">
      <input
        value={search}
        onChange={handleSearch}
        type="text"
        placeholder="Search for songs..."
        className="w-full px-6 py-3 text-lg border-b-2 border-gray-300 focus:outline-none focus:border-black transition duration-300 font-cousine"
      />
    </div>
  );
}
