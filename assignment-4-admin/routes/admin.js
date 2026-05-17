const express = require('express');
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');
const Product = require('../models/Product');

const router = express.Router();

// ---------- Multer storage ----------
const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename:    (req, file, cb) => {
    const ext  = path.extname(file.originalname).toLowerCase();
    const base = path.basename(file.originalname, ext).replace(/[^a-z0-9]/gi, '-').toLowerCase();
    cb(null, `${Date.now()}-${base}${ext}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },           // 5 MB
  fileFilter: (req, file, cb) => {
    if (/^image\/(jpeg|png|webp|gif)$/.test(file.mimetype)) cb(null, true);
    else cb(new Error('Only image files are allowed'));
  }
});

const CATEGORIES = ['Apparel', 'Accessories', 'Charging', 'Lifestyle', 'Vehicles'];

// ---------- Routes ----------

// LIST
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.render('admin/list', { title: 'Admin · Products', products });
  } catch (e) { next(e); }
});

// NEW form
router.get('/new', (req, res) => {
  res.render('admin/form', { title: 'Add Product', product: null, categories: CATEGORIES, action: '/admin', method: 'POST' });
});

// CREATE
router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    const data = pickBody(req.body);
    if (req.file) data.image = `/public/uploads/${req.file.filename}`;
    await Product.create(data);
    res.redirect('/admin');
  } catch (e) { next(e); }
});

// EDIT form
router.get('/:id/edit', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send('Not found');
    res.render('admin/form', {
      title: `Edit · ${product.name}`,
      product, categories: CATEGORIES,
      action: `/admin/${product._id}?_method=PUT`, method: 'POST'
    });
  } catch (e) { next(e); }
});

// UPDATE
router.put('/:id', upload.single('image'), async (req, res, next) => {
  try {
    const data = pickBody(req.body);
    if (req.file) data.image = `/public/uploads/${req.file.filename}`;
    await Product.findByIdAndUpdate(req.params.id, data, { runValidators: true });
    res.redirect('/admin');
  } catch (e) { next(e); }
});

// DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/admin');
  } catch (e) { next(e); }
});

function pickBody(b) {
  return {
    name: b.name,
    price: Number(b.price),
    category: b.category,
    rating: Number(b.rating || 0),
    stock: Number(b.stock || 0),
    description: b.description || ''
  };
}

module.exports = router;
