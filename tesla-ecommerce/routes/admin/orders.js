const express = require('express');
const router = express.Router();
const Order = require('../../models/Order');

// List
router.get('/', async (req, res) => {
  const orders = await Order.find()
    .populate('user', 'name email')
    .sort({ createdAt: -1 })
    .lean();
  res.render('admin/orders/index', { title: 'Manage Orders', orders });
});

// Details
router.get('/:id', async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('user', 'name email')
    .populate('items.product', 'name')
    .lean();
  if (!order) {
    req.flash('error', 'Order not found.');
    return res.redirect('/admin/orders');
  }
  // normalize price field for the view
  order.items = order.items.map(i => ({ ...i, price: i.price ?? i.priceAtPurchase ?? 0 }));
  order.shippingInfo = order.shippingInfo || { address: '', city: '', zip: '' };
  res.render('admin/orders/details', { title: `Order #${order._id}`, order });
});

// Update status
router.post('/status/:id', async (req, res) => {
  const { status } = req.body;
  const allowed = ['pending', 'paid', 'shipped', 'delivered', 'cancelled'];
  if (!allowed.includes(status)) {
    req.flash('error', 'Invalid status.');
    return res.redirect(`/admin/orders/${req.params.id}`);
  }
  await Order.findByIdAndUpdate(req.params.id, { status });
  req.flash('success', 'Order status updated.');
  res.redirect(`/admin/orders/${req.params.id}`);
});

module.exports = router;
