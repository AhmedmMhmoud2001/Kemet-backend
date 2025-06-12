const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// تسجيل الدخول
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(400).json({ msg: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

  const token = jwt.sign({ admin: { id: admin._id } }, process.env.JWT_SECRET, { expiresIn: '2h' });
  res.json({ token });
});
router.put('/change-password',auth, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    
    // التحقق من الفاليديشن
    if (newPassword.length < 8) {
      return res.status(400).json({ msg: 'Password must be at least 8 characters long' });
    }
    if (!/[A-Z]/.test(newPassword) || !/[a-z]/.test(newPassword)) {
      return res.status(400).json({ msg: 'Password must contain both uppercase and lowercase letters' });
    }
    if (!/\d/.test(newPassword)) {
      return res.status(400).json({ msg: 'Password must contain at least one number' });
    }
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(newPassword)) {
      return res.status(400).json({ msg: 'Password must contain at least one special character' });
    }
    // استخدم الـ ID من req.admin
    const admin = await Admin.findById(req.admin.id);
    if (!admin) return res.status(404).json({ msg: 'Admin not found' });

    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) return res.status(400).json({ msg: 'Old password is incorrect' });

    const hashed = await bcrypt.hash(newPassword, 12);
    admin.password = hashed;
    await admin.save();

    res.json({ msg: 'Password updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});
module.exports = router;
