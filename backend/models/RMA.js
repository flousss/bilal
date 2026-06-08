const mongoose = require('mongoose');

const RMASchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
      index: true
    },
    customer: {
      type: String,
      required: true,
      index: true
    },
    item: {
      type: String,
      required: true
    },
    qty: {
      type: Number,
      required: true,
      min: 1
    },
    status: {
      type: String,
      enum: ['Created', 'Approved', 'In Transit', 'Received', 'Inspected', 'Closed'],
      default: 'Created',
      index: true
    },
    reason: {
      type: String,
      default: ''
    },
    notes: {
      type: String,
      default: ''
    },
    date: {
      type: Date,
      default: Date.now
    },
    approvedBy: {
      type: String,
      default: null
    },
    closedBy: {
      type: String,
      default: null
    },
    closedDate: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

// Auto-generate RMA ID if not provided
RMASchema.pre('save', async function(next) {
  if (!this.id) {
    const count = await this.constructor.countDocuments();
    this.id = `RMA${String(count + 1001).padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('RMA', RMASchema);
