import { FiX } from 'react-icons/fi';

const Settings = ({ units, onUnitsChange, onClose }) => {
  return (
    <div className="mb-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-30">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white text-xl font-bold">Settings</h3>
        <button
          onClick={onClose}
          className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded transition-colors"
        >
          <FiX size={20} />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-white font-semibold mb-2">Temperature Unit</p>
          <div className="flex gap-2">
            <button
              onClick={() => onUnitsChange('metric')}
              className={`flex-1 py-2 px-4 rounded-lg transition-all ${
                units === 'metric'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'
              }`}
            >
              Celsius (°C)
            </button>
            <button
              onClick={() => onUnitsChange('imperial')}
              className={`flex-1 py-2 px-4 rounded-lg transition-all ${
                units === 'imperial'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'
              }`}
            >
              Fahrenheit (°F)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
