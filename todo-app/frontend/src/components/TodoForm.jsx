import { useState, useEffect } from 'react';
import { FiPlus, FiCalendar, FiX } from 'react-icons/fi';

const TodoForm = ({ onAdd, categories, editingTodo, onEditSave, onEditCancel }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState(null);
  const [dueDate, setDueDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (editingTodo) {
      setText(editingTodo.text);
      setPriority(editingTodo.priority);
      setCategory(editingTodo.category);
      setDueDate(editingTodo.dueDate || '');
    } else {
      setText('');
      setPriority('medium');
      setCategory(null);
      setDueDate('');
    }
  }, [editingTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    if (editingTodo) {
      onEditSave({
        text: text.trim(),
        priority,
        category,
        dueDate,
      });
    } else {
      onAdd(text.trim(), priority, category, dueDate);
      setText('');
      setPriority('medium');
      setCategory(null);
      setDueDate('');
    }
  };

  const handleCancel = () => {
    setText('');
    setPriority('medium');
    setCategory(null);
    setDueDate('');
    onEditCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border p-4 shadow-sm">
      <div className="space-y-4">
        {/* Text Input */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo..."
          className="w-full px-4 py-2 border border-gray-200 dark:border-dark-border rounded-lg bg-white dark:bg-dark-card text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
        />

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Priority */}
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="px-3 py-2 border border-gray-200 dark:border-dark-border rounded-lg bg-white dark:bg-dark-card text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>

          {/* Category */}
          <select
            value={category || ''}
            onChange={(e) => setCategory(e.target.value || null)}
            className="px-3 py-2 border border-gray-200 dark:border-dark-border rounded-lg bg-white dark:bg-dark-card text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">No Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>

          {/* Due Date */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="w-full px-3 py-2 border border-gray-200 dark:border-dark-border rounded-lg bg-white dark:bg-dark-card text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center gap-2"
            >
              <FiCalendar className="w-4 h-4" />
              {dueDate ? new Date(dueDate).toLocaleDateString() : 'Due Date'}
            </button>
            {showDatePicker && (
              <input
                type="date"
                value={dueDate}
                onChange={(e) => {
                  setDueDate(e.target.value);
                  setShowDatePicker(false);
                }}
                className="absolute top-12 left-0 w-full"
                autoFocus
              />
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 justify-end">
          {editingTodo && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-200 dark:border-dark-border rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-card transition-colors flex items-center gap-2"
            >
              <FiX className="w-4 h-4" />
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2 font-medium"
          >
            <FiPlus className="w-4 h-4" />
            {editingTodo ? 'Save' : 'Add Todo'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default TodoForm;
