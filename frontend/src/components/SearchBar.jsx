const SearchBar = ({ search, onSearchChange }) => {
  return (
    <div className="mb-6 flex gap-2">
      <input
        type="text"
        placeholder="Search RMA by ID, Customer, or Item..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
