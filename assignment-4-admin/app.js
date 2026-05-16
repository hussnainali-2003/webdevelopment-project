// Assignment 4 — Tesla Shop with /admin CRUD + Multer image upload
require('dotenv').config();
const express        = require('express');
const path           = require('path');
const mongoose       = require('mongoose');
const methodOverride = require('method-override');

const productsRouter = require('./routes/products');
const adminRouter    = require('./routes/admin');

const app  = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tesla_shop';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));   // enables PUT / DELETE from forms

app.get('/', (req, res) => res.redirect('/products'));
app.use('/products', productsRouter);
app.use('/admin',    adminRouter);

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✔ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Tesla Shop  → http://localhost:${PORT}/products`);
      console.log(`Admin Panel → http://localhost:${PORT}/admin`);
    });
  })
  .catch(err => {
    console.error('✖ MongoDB connection failed:', err.message);
    process.exit(1);
  });
