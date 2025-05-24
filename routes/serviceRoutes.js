const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const auth = require('../middleware/auth');

// Get all services
router.get('/', async (req, res) => {
  const services = await Service.find().sort({ createdAt: -1 });
  res.json(services);
});

// Create new service
router.post('/', auth, async (req, res) => {
  const service = new Service(req.body);
  await service.save();
  res.status(201).json(service);
});

// Update service
router.put('/:id', auth, async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(service);
});

// Delete service
router.delete('/:id', auth, async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: 'Service deleted' });
});

module.exports = router;
