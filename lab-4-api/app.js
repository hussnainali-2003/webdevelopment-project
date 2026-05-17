// Lab 4 — Tesla RESTful API v1 with JWT
require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');

const authRoutes     = require('./routes/auth');
const productRoutes  = require('./routes/products');
const orderRoutes    = require('./routes/orders');

const app  = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tesla_api';

app.use(express.json());

// CORS for any frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// Health
app.get('/', (req, res) => res.json({ name: 'Tesla API', version: 'v1', docs: '/api/v1' }));
app.get('/api/v1', (req, res) => res.json({
  endpoints: [
    'POST   /api/v1/auth/register',
    'POST   /api/v1/auth/login',
    'GET    /api/v1/profile           (Bearer)',
    'GET    /api/v1/products',
    'GET    /api/v1/products/:id',
    'POST   /api/v1/products          (Bearer admin)',
    'PUT    /api/v1/products/:id      (Bearer admin)',
    'DELETE /api/v1/products/:id      (Bearer admin)',
    'GET    /api/v1/orders            (Bearer)',
    'POST   /api/v1/orders            (Bearer)'
  ]
}));

app.use('/api/v1',          authRoutes);   // auth + profile
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders',   orderRoutes);

// 404 + error
app.use((req, res) => res.status(404).json({ error: 'Not found' }));
app.use((err, req, res, next) => { console.error(err); res.status(500).json({ error: err.message }); });

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✔ MongoDB connected');
    app.listen(PORT, () => console.log(`Tesla API → http://localhost:${PORT}/api/v1`));
  })
  .catch(err => { console.error(err); process.exit(1); });
