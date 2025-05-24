const mongoose = require('mongoose');
const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  imageUrl: String,
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Project', ProjectSchema);
