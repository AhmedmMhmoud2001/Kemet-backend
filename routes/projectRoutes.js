const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const multer = require('multer');
const { storage, cloudinary } = require('../utils/cloudinary');
const upload = multer({ storage });
const auth = require('../middleware/auth');

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().populate('service').sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error while fetching projects' });
  }
});

// Create new project (with Cloudinary image)
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, description, service } = req.body;

    if (!req.file) return res.status(400).json({ msg: 'Image is required' });

    const imageUrl = req.file.path;
    const imagePublicId = req.file.filename; // Cloudinary stores filename as public_id

    const project = new Project({ title, description, service, imageUrl, imagePublicId });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error while uploading project' });
  }
});

// Delete project and image from Cloudinary
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    // حذف الصورة من Cloudinary إذا وُجد imagePublicId
    if (project.imagePublicId) {
      await cloudinary.uploader.destroy(project.imagePublicId);
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Project and image deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error deleting project' });
  }
});

module.exports = router;
