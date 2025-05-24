const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');
const fs = require('fs');
const path = require('path');

// Get all projects
router.get('/', async (req, res) => {
  const projects = await Project.find().populate('service').sort({ createdAt: -1 });
  res.json(projects);
});

// Create new project (with image)
router.post('/', auth, upload.single('image'), async (req, res) => {
  const { title, description, service } = req.body;
  const imageUrl = req.file ? `/uploads/projects/${req.file.filename}` : '';
  const project = new Project({ title, description, service, imageUrl });
  await project.save();
  res.status(201).json(project);
});

// Update project (data only)
router.put('/:id', auth, async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(project);
});

// Delete project + image
router.delete('/:id', auth, async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (project.imageUrl) {
    const imagePath = path.join(__dirname, '..', project.imageUrl);
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
  }
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: 'Project and image deleted' });
});

module.exports = router;
