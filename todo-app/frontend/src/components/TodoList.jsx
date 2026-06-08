import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FiTrash2, FiEdit2, FiCheckCircle, FiCircle, FiCalendar } from 'react-icons/fi';
import { formatDate, isOverdue, isToday, getPriorityColor, getPriorityBg } from '../utils/formatters';

const TodoList = ({
  todos,
  onToggle,
  onDelete,
  onEdit,
  onReorder,
  filter = 'all',
  priorityFilter = 'all',
  categoryFilter = 'all',
  searchQuery = '',
}) => {
  const [filteredTodos, setFilteredTodos] = useState([]);

  // Filter and search todos
  useEffect(() => {
    let result = todos;

    // Filter by status
    if (filter === 'active') {
      result = result.filter(t => !t.completed);
    } else if (filter === 'completed') {
      result = result.filter(t => t.completed);
    }

    // Filter by priority
    if (priorityFilter !== 'all') {
      result = result.filter(t => t.priority === priorityFilter);
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      result = result.filter(t => t.category === categoryFilter);
    }

    // Search
    if (searchQuery) {
      result = result.filter(t =>
        t.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTodos(result);
  }, [todos, filter, priorityFilter, categoryFilter, searchQuery]);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.index === destination.index) return;
    onReorder(source.index, destination.index);
  };

  if (filteredTodos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-lg">No todos found</p>
        <p className="text-sm">Try adjusting your filters or add a new todo</p>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todos">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`space-y-2 rounded-lg p-4 transition-colors ${
              snapshot.isDraggingOver
                ? 'bg-gray-100 dark:bg-dark-card'
                : 'bg-transparent'
            }`}
          >
            {filteredTodos.map((todo, index) => (
              <Draggable key={todo.id} draggableId={todo.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`animate-fadeIn`}
                  >
                    <div
                      className={`flex items-center gap-3 p-4 rounded-lg border transition-all ${
                        snapshot.isDragging
                          ? 'bg-blue-50 dark:bg-blue-900 border-blue-300 dark:border-blue-700 shadow-lg'
                          : 'bg-white dark:bg-dark-card border-gray-200 dark:border-dark-border hover:border-gray-300 dark:hover:border-gray-600'
                      } ${isOverdue(todo.dueDate, todo.completed) ? 'border-red-300 dark:border-red-700' : ''}`}
                    >
                      {/* Checkbox */}
                      <button
                        onClick={() => onToggle(todo.id)}
                        className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      >
                        {todo.completed ? (
                          <FiCheckCircle className="w-6 h-6 text-green-500" />
                        ) : (
                          <FiCircle className="w-6 h-6" />
                        )}
                      </button>

                      {/* Todo Content */}
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-medium break-words ${
                            todo.completed
                              ? 'line-through text-gray-400 dark:text-gray-500'
                              : 'text-gray-900 dark:text-white'
                          }`}
                        >
                          {todo.text}
                        </p>
                        {todo.dueDate && (
                          <div
                            className={`flex items-center gap-1 text-xs mt-1 ${
                              isOverdue(todo.dueDate, todo.completed)
                                ? 'text-red-600 dark:text-red-400'
                                : 'text-gray-500 dark:text-gray-400'
                            }`}
                          >
                            <FiCalendar className="w-3 h-3" />
                            {formatDate(todo.dueDate)}
                            {isToday(todo.dueDate) && !todo.completed && (
                              <span className="ml-1 px-1.5 py-0.5 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded text-xs font-semibold">
                                Due Today
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Priority Badge */}
                      {todo.priority !== 'medium' && (
                        <span
                          className={`flex-shrink-0 px-2 py-1 rounded text-xs font-semibold capitalize ${getPriorityBg(
                            todo.priority
                          )} ${getPriorityColor(todo.priority)}`}
                        >
                          {todo.priority}
                        </span>
                      )}

                      {/* Actions */}
                      <div className="flex gap-1 flex-shrink-0">
                        <button
                          onClick={() => onEdit(todo)}
                          className="p-2 text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors rounded hover:bg-blue-50 dark:hover:bg-blue-900"
                          title="Edit"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDelete(todo.id)}
                          className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors rounded hover:bg-red-50 dark:hover:bg-red-900"
                          title="Delete"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;
