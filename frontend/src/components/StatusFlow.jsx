const StatusFlow = () => {
  const statuses = ['Created', 'Approved', 'In Transit', 'Received', 'Inspected', 'Closed'];

  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">RMA Status Workflow</h2>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {statuses.map((status, index) => (
          <div key={status} className="flex items-center gap-2 sm:gap-3">
            <div className="bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm font-semibold whitespace-nowrap">
              {status}
            </div>
            {index < statuses.length - 1 && (
              <div className="hidden sm:block text-gray-400 text-xl">→</div>
            )}
            {index < statuses.length - 1 && (
              <div className="sm:hidden text-gray-400">↓</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusFlow;
