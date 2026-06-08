import { FiFilter } from 'react-icons/fi';

const FilterBar = ({ filter, onFilterChange, priorityFilter, onPriorityChange, categoryFilter, onCategoryChange, categories }) => {
  return (
    <div className="space-y-3 bg-white dark:bg-dark-card rounded-lg p-4 border border-gray-200 dark:border-dark-border">
      <div className="flex items-center gap-2 mb-3">
        <FiFilter className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        <h3 className="font-semibold text-gray-900 dark:text-white">Filters</h3>
      </div>

      {/* Status Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
        <div className="grid grid-cols-3 gap-2">
          {['all', 'active', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => onFilterChange(status)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                filter === status
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Priority Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
        <div className="grid grid-cols-4 gap-2">
          {['all', 'low', 'medium', 'high'].map((priority) => (
            <button
              key={priority}
              onClick={() => onPriorityChange(priority)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                priorityFilter === priority
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {priority}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategoryChange('all')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              categoryFilter === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${cat.icon} ${
                categoryFilter === cat.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
