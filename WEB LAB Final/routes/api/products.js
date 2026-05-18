const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');

router.get('/', async (req, res) => {
  const PER_PAGE = Math.min(Number(req.query.limit) || 8, 50);
  const page = Math.max(parseInt(req.query.page) || 1, 1);

  const filter = {};
  if (req.query.q) filter.name = { $regex: req.query.q, $options: 'i' };
  if (req.query.category) filter.category = req.query.category;
  if (req.query.minPrice || req.query.maxPrice) {
    filter.price = {};
    if (req.query.minPrice) filter.price.$gte = Number(req.query.minPrice);
    if (req.query.maxPrice) filter.price.$lte = Number(req.query.maxPrice);
  }

  const [items, total] = await Promise.all([
    Product.find(filter).skip((page - 1) * PER_PAGE).limit(PER_PAGE).lean(),
    Product.countDocuments(filter)
  ]);

  res.json({
    page, perPage: PER_PAGE, total,
    totalPages: Math.max(Math.ceil(total / PER_PAGE), 1),
    items
  });
});

router.get('/:id', async (req, res) => {
  try {
    const p = await Product.findById(req.params.id).lean();
    if (!p) return res.status(404).json({ error: 'Not found' });
    res.json(p);
  } catch {
    res.status(404).json({ error: 'Not found' });
  }
});

module.exports = router;