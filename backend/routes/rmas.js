const express = require('express');
const router = express.Router();
const RMA = require('../models/RMA');
const { validateRMA } = require('../middleware/validation');

// Get all RMAs with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status, customer, search } = req.query;
    const skip = (page - 1) * limit;

    let query = {};

    if (status) query.status = status;
    if (customer) query.customer = new RegExp(customer, 'i');
    if (search) {
      query.$or = [
        { id: new RegExp(search, 'i') },
        { customer: new RegExp(search, 'i') },
        { item: new RegExp(search, 'i') }
      ];
    }

    const total = await RMA.countDocuments(query);
    const rmas = await RMA.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      data: rmas,
      pagination: {
        current: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single RMA
router.get('/:id', async (req, res) => {
  try {
    const rma = await RMA.findOne({ id: req.params.id });
    if (!rma) return res.status(404).json({ error: 'RMA not found' });
    res.json(rma);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new RMA
router.post('/', validateRMA, async (req, res) => {
  try {
    const rma = new RMA(req.body);
    await rma.save();
    res.status(201).json(rma);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update RMA
router.put('/:id', async (req, res) => {
  try {
    const rma = await RMA.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!rma) return res.status(404).json({ error: 'RMA not found' });
    res.json(rma);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update RMA Status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status, notes } = req.body;
    const validStatuses = ['Created', 'Approved', 'In Transit', 'Received', 'Inspected', 'Closed'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const updateData = { status };
    if (notes) updateData.notes = notes;
    if (status === 'Closed') updateData.closedDate = new Date();

    const rma = await RMA.findOneAndUpdate(
      { id: req.params.id },
      updateData,
      { new: true }
    );

    if (!rma) return res.status(404).json({ error: 'RMA not found' });
    res.json(rma);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete RMA
router.delete('/:id', async (req, res) => {
  try {
    const rma = await RMA.findOneAndDelete({ id: req.params.id });
    if (!rma) return res.status(404).json({ error: 'RMA not found' });
    res.json({ message: 'RMA deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search RMAs
router.get('/search/all', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json([]);

    const rmas = await RMA.find({
      $or: [
        { id: new RegExp(q, 'i') },
        { customer: new RegExp(q, 'i') },
        { item: new RegExp(q, 'i') }
      ]
    }).limit(10);

    res.json(rmas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
