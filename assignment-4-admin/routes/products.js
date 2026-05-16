const express = require('express');
const Product = require('../models/Product');

const router = express.Router();
const PER_PAGE = 8;

// GET /products?page=1&category=Charging&search=wall
router.get('/', async (req, res, next) => {
  try {
    const page     = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const category = (req.query.category || '').trim();
    const search   = (req.query.search   || '').trim();

    const filter = {};
    if (category) filter.category = category;
    if (search)   filter.name = { $regex: search, $options: 'i' };

    const total      = await Product.countDocuments(filter);
    const totalPages = Math.max(Math.ceil(total / PER_PAGE), 1);
    const products   = await Product.find(filter)
                                    .sort({ createdAt: -1 })
                                    .skip((page - 1) * PER_PAGE)
                                    .limit(PER_PAGE);

    const categories = ['Apparel', 'Accessories', 'Charging', 'Lifestyle', 'Vehicles'];

    res.render('products', {
      title: 'Tesla Shop',
      products, page, totalPages, total,
      category, search, categories
    });
  } catch (err) { next(err); }
});

module.exports = router;
