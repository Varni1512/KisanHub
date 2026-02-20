import express from 'express';
import Scheme from '../models/Scheme.js';

const router = express.Router();

// GET /api/schemes - Fetch all schemes (for Farmer dashboard)
router.get('/', async (req, res) => {
  try {
    const schemes = await Scheme.find({}).sort({ createdAt: -1 });
    res.json({ success: true, schemes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/schemes - Add new scheme (Admin only)
router.post('/', async (req, res) => {
  try {
    const { name, category, status, detail, apply, link, docs } = req.body;

    if (!name || !category || !detail || !apply || !link) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, category, detail, apply, and link',
      });
    }

    const docsArray = Array.isArray(docs)
      ? docs
      : typeof docs === 'string'
        ? docs.split(',').map((d) => d.trim()).filter(Boolean)
        : [];

    const scheme = await Scheme.create({
      name,
      category,
      status: status || 'ONGOING',
      detail,
      apply,
      link,
      docs: docsArray,
    });

    res.status(201).json({ success: true, scheme });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/schemes/:id - Update scheme (Admin only)
router.put('/:id', async (req, res) => {
  try {
    const { name, category, status, detail, apply, link, docs } = req.body;

    const docsArray = docs !== undefined
      ? (Array.isArray(docs)
          ? docs
          : typeof docs === 'string'
            ? docs.split(',').map((d) => d.trim()).filter(Boolean)
            : [])
      : undefined;

    const updateData = { name, category, status, detail, apply, link, docs: docsArray };
    const filtered = Object.fromEntries(
      Object.entries(updateData).filter(([, v]) => v !== undefined)
    );

    const scheme = await Scheme.findByIdAndUpdate(
      req.params.id,
      filtered,
      { new: true, runValidators: true }
    );

    if (!scheme) {
      return res.status(404).json({ success: false, message: 'Scheme not found' });
    }

    res.json({ success: true, scheme });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/schemes/:id - Delete scheme (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    const scheme = await Scheme.findByIdAndDelete(req.params.id);
    if (!scheme) {
      return res.status(404).json({ success: false, message: 'Scheme not found' });
    }
    res.json({ success: true, message: 'Scheme deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
