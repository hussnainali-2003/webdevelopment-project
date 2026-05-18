const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  const featured = await Product.find({ category: 'Vehicles' }).limit(4).lean();
  res.render('index', { title: 'Tesla | Electric Cars, Solar & Clean Energy', featured });
});

router.get('/onsale-products', async (req, res) => {
  const items = await Product.find({ isOnSale: true }).lean();
  res.render('onsale', { title: 'On Sale Products', items });
});

module.exports = router;