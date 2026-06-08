import { useState } from 'react';
import { FiDownload, FiUpload, FiTrash2, FiMoon, FiSun, FiX } from 'react-icons/fi';

const Settings = ({ theme, onThemeChange, onExport, onImport, onClearAll, onClose }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClearClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmClear = () => {
    onClearAll();
    setShowConfirm(false);
    onClose();
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onImport(event.target?.result);
        e.target.value = '';
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-dark-card rounded-lg max-w-md w-full shadow-xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-dark-border">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Theme */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">Theme</label>
            <div className="flex gap-2">
              <button
                onClick={() => onThemeChange('light')}
                className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                  theme === 'light'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                <FiSun className="w-4 h-4" />
                Light
              </button>
              <button
                onClick={() => onThemeChange('dark')}
                className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                  theme === 'dark'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                <FiMoon className="w-4 h-4" />
                Dark
              </button>
            </div>
          </div>

          {/* Export/Import */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white">Data</label>
            <button
              onClick={onExport}
              className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <FiDownload className="w-4 h-4" />
              Export Todos
            </button>
            <label className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer">
              <FiUpload className="w-4 h-4" />
              Import Todos
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
          </div>

          {/* Clear All */}
          <div>
            {!showConfirm ? (
              <button
                onClick={handleClearClick}
                className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <FiTrash2 className="w-4 h-4" />
                Clear All Todos
              </button>
            ) : (
              <div className="bg-red-50 dark:bg-red-900 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-800 dark:text-red-200 mb-3">Are you sure? This cannot be undone.</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="flex-1 px-3 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmClear}
                    className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    Delete All
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
