const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');
const Category = require('../../models/Category');
const User = require('../../models/User');
const Order = require('../../models/Order');

router.get('/', async (req, res) => {
  const [productCount, categoryCount, userCount, orderCount, lowStock] = await Promise.all([
    Product.countDocuments(),
    Category.countDocuments(),
    User.countDocuments(),
    Order.countDocuments(),
    Product.find({ stock: { $lt: 5 } }).limit(5).lean()
  ]);
  res.render('admin/dashboard', {
    title: 'Admin Dashboard',
    productCount, categoryCount, userCount, orderCount, lowStock
  });
});

module.exports = router;
