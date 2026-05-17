const express = require('express');
const Product = require('../models/Product');
const { verifyToken, requireAdmin } = require('../middleware/auth');
const router = express.Router();

// Public list with pagination/filter/search
router.get('/', async (req, res) => {
  try {
    const page  = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit, 10) || 8, 50);
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.search)   filter.name = { $regex: req.query.search, $options: 'i' };
    const total    = await Product.countDocuments(filter);
    const products = await Product.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);
    res.json({ data: products, page, limit, total, totalPages: Math.max(Math.ceil(total / limit), 1) });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Public single
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json({ data: product });
  } catch (e) { res.status(400).json({ error: 'Invalid id' }); }
});

// Admin only
router.post('/', verifyToken, requireAdmin, async (req, res) => {
  try { res.status(201).json({ data: await Product.create(req.body) }); }
  catch (e) { res.status(400).json({ error: e.message }); }
});

router.put('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!p) return res.status(404).json({ error: 'Not found' });
    res.json({ data: p });
  } catch (e) { res.status(400).json({ error: e.message }); }
});

router.delete('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const p = await Product.findByIdAndDelete(req.params.id);
    if (!p) return res.status(404).json({ error: 'Not found' });
    res.json({ data: { deleted: true, id: p._id } });
  } catch (e) { res.status(400).json({ error: e.message }); }
});

module.exports = router;
