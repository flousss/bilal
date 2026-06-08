import { useState, useEffect } from 'react';
import { rmaService } from '../services/api';
import RMACard from './RMACard';
import RMAModal from './RMAModal';
import SearchBar from './SearchBar';
import StatusFlow from './StatusFlow';

const RMAPortal = () => {
  const [rmas, setRmas] = useState([]);
  const [filteredRmas, setFilteredRmas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRma, setSelectedRma] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  // Fetch RMAs on mount
  useEffect(() => {
    fetchRMAs();
  }, []);

  // Update filtered RMAs when search or filter changes
  useEffect(() => {
    filterRMAs();
  }, [search, filter, rmas]);

  const fetchRMAs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await rmaService.getAllRMAs();
      setRmas(response.data.data || response.data);
    } catch (err) {
      setError('Failed to fetch RMAs');
      console.error('Error fetching RMAs:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterRMAs = () => {
    let filtered = rmas;

    // Filter by status
    if (filter !== 'All') {
      filtered = filtered.filter(rma => rma.status === filter);
    }

    // Filter by search term
    if (search.trim()) {
      filtered = filtered.filter(rma =>
        rma.id.toLowerCase().includes(search.toLowerCase()) ||
        rma.customer.toLowerCase().includes(search.toLowerCase()) ||
        rma.item.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredRmas(filtered);
  };

  const handleCreateRMA = async (formData) => {
    try {
      await rmaService.createRMA(formData);
      fetchRMAs();
      setShowModal(false);
      setSelectedRma(null);
    } catch (err) {
      setError('Failed to create RMA');
      console.error('Error creating RMA:', err);
    }
  };

  const handleUpdateRMA = async (id, formData) => {
    try {
      await rmaService.updateRMA(id, formData);
      fetchRMAs();
      setShowModal(false);
      setSelectedRma(null);
    } catch (err) {
      setError('Failed to update RMA');
      console.error('Error updating RMA:', err);
    }
  };

  const handleStatusChange = async (id, newStatus, notes) => {
    try {
      await rmaService.updateRMAStatus(id, newStatus, notes);
      fetchRMAs();
    } catch (err) {
      setError('Failed to update status');
      console.error('Error updating status:', err);
    }
  };

  const handleDeleteRMA = async (id) => {
    if (confirm('Are you sure you want to delete this RMA?')) {
      try {
        await rmaService.deleteRMA(id);
        fetchRMAs();
      } catch (err) {
        setError('Failed to delete RMA');
        console.error('Error deleting RMA:', err);
      }
    }
  };

  const handleViewDetails = (rma) => {
    setSelectedRma(rma);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">RMA Portal</h1>
          <button
            onClick={() => {
              setSelectedRma(null);
              setShowModal(true);
            }}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            + Create RMA
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
            <button
              onClick={() => setError(null)}
              className="ml-2 text-red-700 hover:text-red-900"
            >
              ✕
            </button>
          </div>
        )}

        {/* Search Bar */}
        <SearchBar search={search} onSearchChange={setSearch} />

        {/* Status Filter */}
        <div className="mb-6 flex flex-wrap gap-2">
          {['All', 'Created', 'Approved', 'In Transit', 'Received', 'Inspected', 'Closed'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-500">Loading RMAs...</p>
          </div>
        )}

        {/* RMA Cards Grid */}
        {!loading && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {filteredRmas.length > 0 ? (
                filteredRmas.map(rma => (
                  <RMACard
                    key={rma._id || rma.id}
                    rma={rma}
                    onViewDetails={handleViewDetails}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDeleteRMA}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">No RMAs found</p>
                </div>
              )}
            </div>

            {/* Status Flow */}
            <StatusFlow />
          </>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <RMAModal
          rma={selectedRma}
          onClose={() => {
            setShowModal(false);
            setSelectedRma(null);
          }}
          onSave={selectedRma ? handleUpdateRMA : handleCreateRMA}
        />
      )}
    </div>
  );
};

export default RMAPortal;
