const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');
const Order = require('../../models/Order');

function buildFilter(q) {
  const filter = {};
  if (q.q) filter.name = { $regex: q.q, $options: 'i' };
  if (q.category) filter.category = q.category;
  if (q.minPrice || q.maxPrice) {
    filter.price = {};
    if (q.minPrice) filter.price.$gte = Number(q.minPrice);
    if (q.maxPrice) filter.price.$lte = Number(q.maxPrice);
  }
  return filter;
}

router.get('/', async (req, res) => {
  const PER_PAGE = 8;
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const filter = buildFilter(req.query);

  const sort = (() => {
    switch (req.query.sort) {
      case 'price_asc': return { price: 1 };
      case 'price_desc': return { price: -1 };
      case 'rating': return { rating: -1 };
      default: return { createdAt: -1 };
    }
  })();

  const [items, total] = await Promise.all([
    Product.find(filter).sort(sort).skip((page - 1) * PER_PAGE).limit(PER_PAGE).lean(),
    Product.countDocuments(filter)
  ]);

  const totalPages = Math.max(Math.ceil(total / PER_PAGE), 1);

  res.render('products/list', {
    title: 'Shop Tesla',
    items,
    page,
    totalPages,
    total,
    categories: Product.CATEGORIES,
    qstring: req.query
  });
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) return res.status(404).render('404', { title: 'Not found' });
    res.render('products/show', { title: product.name, product });
  } catch {
    res.status(404).render('404', { title: 'Not found' });
  }
});

// Add to cart (session-based)
router.post('/:id/add-to-cart', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ error: 'Please log in first' });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const quantity = Math.max(parseInt(req.body.quantity) || 1, 1);
    if (quantity > product.stock) {
      return res.status(400).json({ error: 'Not enough stock' });
    }

    const order = await Order.create({
      user: req.session.user.id,
      items: [{ product: product._id, quantity, priceAtPurchase: product.price }],
      total: product.price * quantity
    });

    res.status(201).json({
      success: true,
      orderId: order._id,
      message: `Added ${quantity} item(s) to cart!`
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;