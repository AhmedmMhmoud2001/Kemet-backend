const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const auth = require('../middleware/auth');

// Get all Message
router.get('/', auth ,async (req, res) => {
  const message = await Message.find().sort({ createdAt: -1 });
  res.json(message);
}); 

router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ msg: 'Please fill required fields' });
  }

  const msg = new Message({ name, email, phone, message });
  await msg.save();
  res.status(201).json({ message: 'Message received successfully' });
});

module.exports = router;
