import { useState, useCallback } from 'react';
import { FiSettings, FiList } from 'react-icons/fi';
import useTodos from './hooks/useTodos';
import useKeyboardShortcuts from './hooks/useKeyboardShortcuts';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import Statistics from './components/Statistics';
import Settings from './components/Settings';

function App() {
  const {
    todos,
    categories,
    settings,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    reorderTodos,
    getStats,
    clearAllTodos,
    exportData,
    importData,
    saveSettings,
  } = useTodos();

  const [filter, setFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [theme, setTheme] = useState(settings.theme || 'dark');

  // Keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: 'n',
      ctrlKey: true,
      callback: () => {
        const input = document.querySelector('input[placeholder="Add a new todo..."]');
        input?.focus();
      },
    },
    {
      key: '/',
      ctrlKey: true,
      callback: () => {
        const input = document.querySelector('input[placeholder="Search todos..."]');
        input?.focus();
      },
    },
    {
      key: 'e',
      ctrlKey: true,
      callback: handleExport,
    },
    {
      key: 'i',
      ctrlKey: true,
      callback: handleImport,
    },
  ]);

  const handleEdit = useCallback((todo) => {
    setEditingTodo(todo);
  }, []);

  const handleEditSave = useCallback((updates) => {
    if (editingTodo) {
      updateTodo(editingTodo.id, updates);
      setEditingTodo(null);
    }
  }, [editingTodo, updateTodo]);

  const handleEditCancel = useCallback(() => {
    setEditingTodo(null);
  }, []);

  const handleExport = useCallback(() => {
    const data = exportData();
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(data)}`);
    element.setAttribute('download', `todos_${new Date().toISOString().split('T')[0]}.json`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }, [exportData]);

  const handleImport = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const success = importData(event.target?.result);
          if (success) {
            alert('Todos imported successfully!');
          } else {
            alert('Failed to import todos. Please check the file format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }, [importData]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    saveSettings({ ...settings, theme: newTheme });
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const stats = getStats();

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors">
        {/* Header */}
        <header className="bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <FiList className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Todos</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Stay organized and productive</p>
                </div>
              </div>
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-card transition-colors"
              >
                <FiSettings className="w-6 h-6" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
          {/* Statistics */}
          <Statistics stats={stats} />

          {/* Todo Form */}
          <TodoForm
            onAdd={addTodo}
            categories={categories}
            editingTodo={editingTodo}
            onEditSave={handleEditSave}
            onEditCancel={handleEditCancel}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar - Filters */}
            <div className="lg:col-span-1">
              <FilterBar
                filter={filter}
                onFilterChange={setFilter}
                priorityFilter={priorityFilter}
                onPriorityChange={setPriorityFilter}
                categoryFilter={categoryFilter}
                onCategoryChange={setCategoryFilter}
                categories={categories}
              />
            </div>

            {/* Main Content - Todos */}
            <div className="lg:col-span-3 space-y-4">
              {/* Search */}
              <SearchBar value={searchQuery} onChange={setSearchQuery} />

              {/* Todo List */}
              <TodoList
                todos={todos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={handleEdit}
                onReorder={reorderTodos}
                filter={filter}
                priorityFilter={priorityFilter}
                categoryFilter={categoryFilter}
                searchQuery={searchQuery}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <Settings
          theme={theme}
          onThemeChange={handleThemeChange}
          onExport={handleExport}
          onImport={handleImport}
          onClearAll={clearAllTodos}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}

export default App;
