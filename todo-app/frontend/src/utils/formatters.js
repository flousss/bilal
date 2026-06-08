export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  }
  if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
  });
};

export const isOverdue = (dueDate, completed) => {
  if (completed || !dueDate) return false;
  return new Date(dueDate) < new Date();
};

export const isToday = (dueDate) => {
  if (!dueDate) return false;
  const date = new Date(dueDate);
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high':
      return 'text-red-500';
    case 'medium':
      return 'text-yellow-500';
    case 'low':
      return 'text-green-500';
    default:
      return 'text-gray-500';
  }
};

export const getPriorityBg = (priority) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 dark:bg-red-900';
    case 'medium':
      return 'bg-yellow-100 dark:bg-yellow-900';
    case 'low':
      return 'bg-green-100 dark:bg-green-900';
    default:
      return 'bg-gray-100 dark:bg-gray-900';
  }
};
