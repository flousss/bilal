import { getStatusColor } from '../utils/statusColors';

const RMACard = ({ rma, onViewDetails, onStatusChange, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-4">
      <div className="flex justify-between items-start mb-3">
        <span className="text-lg font-bold text-gray-900">{rma.id}</span>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(rma.status)}`}>
          {rma.status}
        </span>
      </div>

      <div className="space-y-2 mb-4 text-sm">
        <div><span className="font-semibold text-gray-700">Customer:</span> <span className="text-gray-600">{rma.customer}</span></div>
        <div><span className="font-semibold text-gray-700">Item:</span> <span className="text-gray-600">{rma.item}</span></div>
        <div><span className="font-semibold text-gray-700">Quantity:</span> <span className="text-gray-600">{rma.qty}</span></div>
        {rma.date && <div><span className="font-semibold text-gray-700">Date:</span> <span className="text-gray-600">{new Date(rma.date).toLocaleDateString()}</span></div>}
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => onViewDetails(rma)}
          className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-2 px-3 rounded transition-colors text-sm"
        >
          Details
        </button>
        <button
          onClick={() => onDelete(rma.id || rma._id)}
          className="bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-2 px-3 rounded transition-colors text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default RMACard;
