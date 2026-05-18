const express = require('express');
const router = express.Router();
const verifyToken = require('../../middlewares/verifyToken');
const Order = require('../../models/Order');
const Product = require('../../models/Product');

router.post('/', verifyToken, async (req, res) => {
  const { items } = req.body || {};
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'items[] required' });
  }
  const ids = items.map(i => i.product);
  const products = await Product.find({ _id: { $in: ids } });
  const map = new Map(products.map(p => [p._id.toString(), p]));

  let total = 0;
  const orderItems = items.map(i => {
    const p = map.get(String(i.product));
    if (!p) throw new Error('Invalid product: ' + i.product);
    const qty = Math.max(parseInt(i.quantity) || 1, 1);
    total += p.price * qty;
    return { product: p._id, quantity: qty, priceAtPurchase: p.price };
  });

  const order = await Order.create({ user: req.user.user_id, items: orderItems, total });
  res.status(201).json(order);
});

module.exports = router;