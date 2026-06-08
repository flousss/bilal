import { FiBarChart2, FiCheckCircle, FiAlertCircle, FiTrendingUp } from 'react-icons/fi';

const Statistics = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Total */}
      <div className="bg-white dark:bg-dark-card rounded-lg p-4 border border-gray-200 dark:border-dark-border">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <FiBarChart2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Todos</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
          </div>
        </div>
      </div>

      {/* Completed */}
      <div className="bg-white dark:bg-dark-card rounded-lg p-4 border border-gray-200 dark:border-dark-border">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
            <FiCheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completed}</p>
          </div>
        </div>
      </div>

      {/* Active */}
      <div className="bg-white dark:bg-dark-card rounded-lg p-4 border border-gray-200 dark:border-dark-border">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
            <FiTrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.active}</p>
          </div>
        </div>
      </div>

      {/* Completion Rate */}
      <div className="bg-white dark:bg-dark-card rounded-lg p-4 border border-gray-200 dark:border-dark-border">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
            <FiAlertCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completionPercentage}%</p>
          </div>
        </div>
      </div>

      {/* High Priority */}
      <div className="bg-white dark:bg-dark-card rounded-lg p-4 border border-gray-200 dark:border-dark-border">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
            <FiAlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">High Priority</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.highPriority}</p>
          </div>
        </div>
      </div>

      {/* Due Today */}
      <div className="bg-white dark:bg-dark-card rounded-lg p-4 border border-gray-200 dark:border-dark-border">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
            <FiAlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Due Today</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.dueToday}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
