const express = require('express');
const Order   = require('../models/Order');
const Product = require('../models/Product');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

// All order routes require auth
router.use(verifyToken);

// GET /api/v1/orders — list current user's orders (admin sees all)
router.get('/', async (req, res) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { user: req.user._id };
    const orders = await Order.find(filter).populate('items.product').sort({ createdAt: -1 });
    res.json({ data: orders });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// POST /api/v1/orders — body: { items: [{ productId, quantity }] }
router.post('/', async (req, res) => {
  try {
    const incoming = Array.isArray(req.body.items) ? req.body.items : [];
    if (!incoming.length) return res.status(400).json({ error: 'items[] is required' });

    const items = [];
    let total = 0;
    for (const it of incoming) {
      const product = await Product.findById(it.productId);
      if (!product) return res.status(400).json({ error: `Product ${it.productId} not found` });
      const quantity = Math.max(parseInt(it.quantity, 10) || 1, 1);
      items.push({ product: product._id, quantity, price: product.price });
      total += product.price * quantity;
    }

    const order = await Order.create({ user: req.user._id, items, total });
    res.status(201).json({ data: order });
  } catch (e) { res.status(400).json({ error: e.message }); }
});

module.exports = router;
