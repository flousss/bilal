import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'todos';
const CATEGORIES_KEY = 'categories';
const SETTINGS_KEY = 'settings';

const DEFAULT_CATEGORIES = [
  { id: uuidv4(), name: 'Work', color: 'blue', icon: '💼' },
  { id: uuidv4(), name: 'Personal', color: 'purple', icon: '👤' },
  { id: uuidv4(), name: 'Shopping', color: 'green', icon: '🛒' },
  { id: uuidv4(), name: 'Health', color: 'red', icon: '❤️' },
];

const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [settings, setSettings] = useState({
    theme: 'dark',
    sortBy: 'dueDate',
    filterBy: 'all',
  });

  // Load from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    const savedCategories = localStorage.getItem(CATEGORIES_KEY);
    const savedSettings = localStorage.getItem(SETTINGS_KEY);

    if (savedTodos) setTodos(JSON.parse(savedTodos));
    if (savedCategories) setCategories(JSON.parse(savedCategories));
    else setCategories(DEFAULT_CATEGORIES);
    if (savedSettings) setSettings(JSON.parse(savedSettings));
  }, []);

  // Save todos to localStorage
  const saveTodos = useCallback((newTodos) => {
    setTodos(newTodos);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
  }, []);

  // Save categories to localStorage
  const saveCategories = useCallback((newCategories) => {
    setCategories(newCategories);
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(newCategories));
  }, []);

  // Save settings to localStorage
  const saveSettings = useCallback((newSettings) => {
    setSettings(newSettings);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
  }, []);

  // Add todo
  const addTodo = useCallback((text, priority = 'medium', category = null, dueDate = null) => {
    if (!text.trim()) return;

    const newTodo = {
      id: uuidv4(),
      text: text.trim(),
      completed: false,
      priority,
      category,
      dueDate,
      createdAt: new Date().toISOString(),
      completedAt: null,
    };

    saveTodos([...todos, newTodo]);
  }, [todos, saveTodos]);

  // Update todo
  const updateTodo = useCallback((id, updates) => {
    saveTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, ...updates } : todo
      )
    );
  }, [todos, saveTodos]);

  // Delete todo
  const deleteTodo = useCallback((id) => {
    saveTodos(todos.filter(todo => todo.id !== id));
  }, [todos, saveTodos]);

  // Toggle todo completion
  const toggleTodo = useCallback((id) => {
    saveTodos(
      todos.map(todo =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              completedAt: !todo.completed ? new Date().toISOString() : null,
            }
          : todo
      )
    );
  }, [todos, saveTodos]);

  // Reorder todos
  const reorderTodos = useCallback((sourceIndex, destinationIndex) => {
    const newTodos = Array.from(todos);
    const [removed] = newTodos.splice(sourceIndex, 1);
    newTodos.splice(destinationIndex, 0, removed);
    saveTodos(newTodos);
  }, [todos, saveTodos]);

  // Get statistics
  const getStats = useCallback(() => {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const active = total - completed;
    const highPriority = todos.filter(t => t.priority === 'high' && !t.completed).length;
    const today = todos.filter(t => {
      if (!t.dueDate) return false;
      const due = new Date(t.dueDate);
      const today = new Date();
      return due.toDateString() === today.toDateString() && !t.completed;
    }).length;

    return {
      total,
      completed,
      active,
      completionPercentage: total > 0 ? Math.round((completed / total) * 100) : 0,
      highPriority,
      dueToday: today,
    };
  }, [todos]);

  // Add category
  const addCategory = useCallback((name, color = 'blue', icon = '📝') => {
    const newCategory = {
      id: uuidv4(),
      name,
      color,
      icon,
    };
    saveCategories([...categories, newCategory]);
    return newCategory.id;
  }, [categories, saveCategories]);

  // Delete category
  const deleteCategory = useCallback((id) => {
    saveCategories(categories.filter(cat => cat.id !== id));
    // Remove category from todos
    saveTodos(todos.map(todo => (todo.category === id ? { ...todo, category: null } : todo)));
  }, [categories, saveCategories, todos, saveTodos]);

  // Clear all todos
  const clearAllTodos = useCallback(() => {
    saveTodos([]);
  }, [saveTodos]);

  // Export data
  const exportData = useCallback(() => {
    const data = { todos, categories, settings };
    return JSON.stringify(data, null, 2);
  }, [todos, categories, settings]);

  // Import data
  const importData = useCallback((jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      if (data.todos) saveTodos(data.todos);
      if (data.categories) saveCategories(data.categories);
      if (data.settings) saveSettings(data.settings);
      return true;
    } catch (error) {
      console.error('Import failed:', error);
      return false;
    }
  }, [saveTodos, saveCategories, saveSettings]);

  return {
    todos,
    categories,
    settings,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    reorderTodos,
    addCategory,
    deleteCategory,
    getStats,
    clearAllTodos,
    exportData,
    importData,
    saveSettings,
  };
};

export default useTodos;
