const validateRMA = (req, res, next) => {
  const { customer, item, qty } = req.body;

  if (!customer || !item || !qty) {
    return res.status(400).json({ error: 'Missing required fields: customer, item, qty' });
  }

  if (typeof qty !== 'number' || qty < 1) {
    return res.status(400).json({ error: 'Quantity must be a positive number' });
  }

  next();
};

module.exports = { validateRMA };
