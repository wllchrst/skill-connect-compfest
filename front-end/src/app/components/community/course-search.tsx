import { useState } from "react";

interface SearchProps {
  onSearch: (query: string) => void;
}

function CourseSearch({ onSearch }: SearchProps) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };
  return (
    <>
      <div className="flex items-center bg-white rounded-md shadow-md p-1 w-full max-w-md">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="flex-grow bg-transparent outline-none text-black px-2"
        />
        <button
          onClick={handleSearch}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-all duration-300"
        >
          Search
        </button>
      </div>
    </>
  );
}

export default CourseSearch;
