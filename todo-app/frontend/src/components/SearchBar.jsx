import { FiSearch, FiX } from 'react-icons/fi';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative">
      <FiSearch className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search todos..."
        className="w-full pl-10 pr-10 py-2 border border-gray-200 dark:border-dark-border rounded-lg bg-white dark:bg-dark-card text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <FiX className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
