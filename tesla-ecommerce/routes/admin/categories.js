const express = require('express');
const router = express.Router();
const Category = require('../../models/Category');

// List (with optional sort)
router.get('/', async (req, res) => {
  const sortField = req.query.sort === 'createdAt' ? 'createdAt' : 'name';
  const sortOrder = req.query.order === 'desc' ? -1 : 1;
  const categories = await Category.find().sort({ [sortField]: sortOrder }).lean();
  res.render('admin/categories/index', {
    title: 'Manage Categories',
    categories,
    sortField,
    sortOrder: sortOrder === 1 ? 'asc' : 'desc'
  });
});

// New form
router.get('/new', (req, res) => {
  res.render('admin/categories/new', { title: 'New Category' });
});

// Create
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !name.trim()) {
      req.flash('error', 'Name is required.');
      return res.redirect('/admin/categories/new');
    }
    await Category.create({ name: name.trim(), description: description || '' });
    req.flash('success', 'Category created.');
    res.redirect('/admin/categories');
  } catch (err) {
    req.flash('error', err.code === 11000 ? 'Category already exists.' : err.message);
    res.redirect('/admin/categories/new');
  }
});

// Edit form
router.get('/edit/:id', async (req, res) => {
  const category = await Category.findById(req.params.id).lean();
  if (!category) return res.redirect('/admin/categories');
  res.render('admin/categories/edit', { title: 'Edit Category', category });
});

// Update
router.post('/edit/:id', async (req, res) => {
  try {
    const { name, description } = req.body;
    await Category.findByIdAndUpdate(req.params.id, {
      name: name.trim(),
      description: description || ''
    }, { runValidators: true });
    req.flash('success', 'Category updated.');
    res.redirect('/admin/categories');
  } catch (err) {
    req.flash('error', err.message);
    res.redirect(`/admin/categories/edit/${req.params.id}`);
  }
});

// Delete
router.post('/delete/:id', async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  req.flash('success', 'Category deleted.');
  res.redirect('/admin/categories');
});

module.exports = router;
