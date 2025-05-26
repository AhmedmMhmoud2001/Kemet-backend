const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const auth = require('../middleware/auth');

// ✅ جلب كل الرسائل (محمية)
router.get('/', auth, async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
});

// ✅ إرسال رسالة (عام)
router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ msg: 'Please fill required fields' });
  }

  const msg = new Message({ name, email, phone, message });
  await msg.save();
  res.status(201).json({ message: 'Message received successfully' });
});

// ✅ حذف رسالة (محمية)
router.delete('/:id', auth, async (req, res) => {
  try {
    const msg = await Message.findByIdAndDelete(req.params.id);
    if (!msg) return res.status(404).json({ msg: 'Message not found' });
    res.json({ msg: 'Message deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
