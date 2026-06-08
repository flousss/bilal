export const getStatusColor = (status) => {
  const colors = {
    'Created': 'bg-gray-100 text-gray-700',
    'Approved': 'bg-blue-100 text-blue-700',
    'In Transit': 'bg-yellow-100 text-yellow-700',
    'Received': 'bg-purple-100 text-purple-700',
    'Inspected': 'bg-orange-100 text-orange-700',
    'Closed': 'bg-green-100 text-green-700'
  };
  return colors[status] || 'bg-gray-100 text-gray-700';
};
