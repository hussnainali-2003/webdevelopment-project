// Assignment 3 — Tesla products with Mongo, pagination, filter, search
require('dotenv').config();
const express  = require('express');
const path     = require('path');
const mongoose = require('mongoose');
const productsRouter = require('./routes/products');

const app  = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tesla_shop';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.redirect('/products'));
app.use('/products', productsRouter);

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✔ MongoDB connected');
    app.listen(PORT, () => console.log(`Tesla Shop → http://localhost:${PORT}/products`));
  })
  .catch(err => {
    console.error('✖ MongoDB connection failed:', err.message);
    process.exit(1);
  });
