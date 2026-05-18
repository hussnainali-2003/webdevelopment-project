const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');
const Category = require('../../models/Category');
const upload = require('../../middlewares/upload');
const fs = require('fs');
const path = require('path');

// Build category list: union of seed/static enum + DB-managed categories
async function buildCategoryList() {
  const dbCats = await Category.find().select('name').lean();
  const names = new Set([...(Product.CATEGORIES || []), ...dbCats.map(c => c.name)]);
  return Array.from(names);
}

// List
router.get('/', async (req, res) => {
  const items = await Product.find().sort({ createdAt: -1 }).lean();
  res.render('admin/products-list', { title: 'Manage Products', items });
});

// New
router.get('/new', async (req, res) => {
  res.render('admin/product-form', {
    title: 'New Product',
    product: {},
    action: '/admin/products',
    method: 'POST',
    categories: await buildCategoryList()
  });
});

function validate(body) {
  const errors = [];
  if (!body.name || !body.name.trim()) errors.push('Name is required');
  if (body.price === '' || body.price == null || isNaN(Number(body.price))) errors.push('Valid price required');
  if (!body.category) errors.push('Category required');
  if (body.stock === '' || isNaN(Number(body.stock))) errors.push('Valid stock required');
  return errors;
}

// Create
router.post('/', upload.single('image'), async (req, res) => {
  const errors = validate(req.body);
  if (errors.length) {
    req.flash('error', errors.join(', '));
    return res.redirect('/admin/products/new');
  }
  const data = {
    name: req.body.name.trim(),
    description: req.body.description || '',
    price: Number(req.body.price),
    category: req.body.category,
    rating: Number(req.body.rating) || 0,
    stock: Number(req.body.stock),
    isOnSale: Boolean(req.body.isOnSale)
  };
  if (req.file) data.image = '/uploads/' + req.file.filename;
  await Product.create(data);
  req.flash('success', 'Product created.');
  res.redirect('/admin/products');
});

// Edit form
router.get('/:id/edit', async (req, res) => {
  const product = await Product.findById(req.params.id).lean();
  if (!product) return res.redirect('/admin/products');
  res.render('admin/product-form', {
    title: 'Edit Product',
    product,
    action: `/admin/products/${product._id}?_method=PUT`,
    method: 'POST',
    categories: await buildCategoryList()
  });
});

// Update
router.put('/:id', upload.single('image'), async (req, res) => {
  const errors = validate(req.body);
  if (errors.length) {
    req.flash('error', errors.join(', '));
    return res.redirect(`/admin/products/${req.params.id}/edit`);
  }
  const update = {
    name: req.body.name.trim(),
    description: req.body.description || '',
    price: Number(req.body.price),
    category: req.body.category,
    rating: Number(req.body.rating) || 0,
    stock: Number(req.body.stock),
    isOnSale: Boolean(req.body.isOnSale)
  };
  if (req.file) update.image = '/uploads/' + req.file.filename;
  await Product.findByIdAndUpdate(req.params.id, update);
  req.flash('success', 'Product updated.');
  res.redirect('/admin/products');
});

// Delete
router.delete('/:id', async (req, res) => {
  const p = await Product.findByIdAndDelete(req.params.id);
  if (p && p.image && p.image.startsWith('/uploads/')) {
    const filePath = path.join(__dirname, '..', '..', 'public', p.image);
    fs.promises.unlink(filePath).catch(() => {});
  }
  req.flash('success', 'Product deleted.');
  res.redirect('/admin/products');
});

module.exports = router;
