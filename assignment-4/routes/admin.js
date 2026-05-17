// Admin Routes — CRUD operations for products with image upload
const express = require('express');
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');
const Product = require('../models/Product');

const router = express.Router();

// ---------- Multer Configuration ----------
const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename: timestamp-productname.ext
    const ext  = path.extname(file.originalname).toLowerCase();
    const base = path.basename(file.originalname, ext)
                      .replace(/[^a-z0-9]/gi, '-')
                      .toLowerCase()
                      .substring(0, 20);
    const filename = `${Date.now()}-${base}${ext}`;
    cb(null, filename);
  }
});

// File filter for image types only
const fileFilter = (req, file, cb) => {
  const allowedMimes = /^image\/(jpeg|jpg|png|webp|gif)$/;
  if (allowedMimes.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (jpeg, jpg, png, webp, gif) are allowed'), false);
  }
};

// Create multer instance
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
  fileFilter
});

const CATEGORIES = ['Apparel', 'Accessories', 'Charging', 'Lifestyle', 'Vehicles'];

// ---------- Routes ----------

// 1. LIST all products (Dashboard)
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.render('admin/list', {
      title: 'Admin Dashboard · Products',
      products,
      message: req.query.msg || null
    });
  } catch (e) {
    next(e);
  }
});

// 2. SHOW form for creating new product
router.get('/new', (req, res) => {
  res.render('admin/form', {
    title: 'Add New Product',
    product: null,
    categories: CATEGORIES,
    formAction: '/admin',
    formMethod: 'POST'
  });
});

// 3. CREATE new product
router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    const { name, category, price, stock, rating, description } = req.body;

    // Validation
    if (!name || !category || !price) {
      return res.status(400).render('admin/form', {
        title: 'Add New Product',
        product: null,
        categories: CATEGORIES,
        formAction: '/admin',
        formMethod: 'POST',
        error: 'Name, Category, and Price are required.'
      });
    }

    // Build product data
    const productData = {
      name: name.trim(),
      category,
      price: Number(price),
      stock: Number(stock) || 0,
      rating: Number(rating) || 0,
      description: description || ''
    };

    // Add image if uploaded
    if (req.file) {
      productData.image = `/public/uploads/${req.file.filename}`;
    }

    // Create product
    const newProduct = await Product.create(productData);
    console.log(`✔ Product created: ${newProduct.name}`);

    res.redirect('/admin?msg=created');
  } catch (e) {
    next(e);
  }
});

// 4. SHOW edit form for existing product
router.get('/:id/edit', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send('Product not found');
    }

    res.render('admin/form', {
      title: `Edit Product · ${product.name}`,
      product,
      categories: CATEGORIES,
      formAction: `/admin/${product._id}?_method=PUT`,
      formMethod: 'POST'
    });
  } catch (e) {
    next(e);
  }
});

// 5. UPDATE existing product
router.put('/:id', upload.single('image'), async (req, res, next) => {
  try {
    const { name, category, price, stock, rating, description } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send('Product not found');
    }

    // Update fields
    product.name        = name.trim() || product.name;
    product.category    = category || product.category;
    product.price       = Number(price) || product.price;
    product.stock       = Number(stock) || 0;
    product.rating      = Number(rating) || 0;
    product.description = description || '';

    // Update image if new file uploaded
    if (req.file) {
      // Delete old image if exists and is not default
      if (product.image && product.image !== '/public/images/default.jpg') {
        const oldPath = path.join(__dirname, '..', product.image);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      product.image = `/public/uploads/${req.file.filename}`;
    }

    await product.save();
    console.log(`✔ Product updated: ${product.name}`);

    res.redirect('/admin?msg=updated');
  } catch (e) {
    next(e);
  }
});

// 6. DELETE product
router.delete('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).send('Product not found');
    }

    // Delete associated image if exists
    if (product.image && product.image !== '/public/images/default.jpg') {
      const imagePath = path.join(__dirname, '..', product.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    console.log(`✔ Product deleted: ${product.name}`);
    res.redirect('/admin?msg=deleted');
  } catch (e) {
    next(e);
  }
});

// Error handler for multer
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).send('File too large. Max 5 MB.');
    }
  } else if (err.message) {
    return res.status(400).send(err.message);
  }
  next(err);
});

module.exports = router;
