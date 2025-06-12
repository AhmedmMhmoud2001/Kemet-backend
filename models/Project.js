const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  },
  imageUrl: String,
  imagePublicId: String // 👈 ضروري لحذف الصورة من Cloudinary
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
