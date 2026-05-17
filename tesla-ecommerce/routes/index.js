const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  const featured = await Product.find({ category: 'Vehicles' }).limit(4).lean();
  res.render('index', { title: 'Tesla | Electric Cars, Solar & Clean Energy', featured });
});

module.exports = router;