// Assignment 4 — Tesla Admin Panel with CRUD & Image Upload
require('dotenv').config();
const express        = require('express');
const path           = require('path');
const mongoose       = require('mongoose');
const methodOverride = require('method-override');

const adminRouter = require('./routes/admin');

const app  = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tesla_shop_admin';

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Routes
app.get('/', (req, res) => res.redirect('/admin'));
app.use('/admin', adminRouter);

// 404 error handler
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).render('error', { title: 'Server Error', error: err });
});

// Database connection
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✔ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Admin Panel → http://localhost:${PORT}/admin`);
    });
  })
  .catch(err => {
    console.error('✖ MongoDB connection failed:', err.message);
    process.exit(1);
  });
