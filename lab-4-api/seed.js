// Seed an admin user + a few products
require('dotenv').config();
const mongoose = require('mongoose');
const User     = require('./models/User');
const Product  = require('./models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tesla_api';

const products = [
  { name: 'Wall Connector',         category: 'Charging',    price: 475,  rating: 4.9, stock: 30 },
  { name: 'Mobile Connector',       category: 'Charging',    price: 230,  rating: 4.7, stock: 90 },
  { name: 'All-Weather Floor Mats', category: 'Accessories', price: 220,  rating: 4.9, stock: 85 },
  { name: 'Tesla Logo T-Shirt',     category: 'Apparel',     price: 35,   rating: 4.6, stock: 120 },
  { name: 'Cyberwhistle',           category: 'Lifestyle',   price: 50,   rating: 4.5, stock: 25 },
  { name: 'Model Y Long Range',     category: 'Vehicles',    price: 49990,rating: 4.9, stock: 12 },
  { name: 'Model 3 Performance',    category: 'Vehicles',    price: 52990,rating: 4.8, stock: 9 },
  { name: 'Model S Plaid',          category: 'Vehicles',    price: 89990,rating: 4.9, stock: 5 }
];

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await User.deleteMany({});
    await Product.deleteMany({});
    await User.create({ name: 'Tesla Admin', email: 'admin@tesla.local', password: 'admin123', role: 'admin' });
    await User.create({ name: 'Demo User',   email: 'user@tesla.local',  password: 'user1234' });
    await Product.insertMany(products);
    console.log('✔ Seeded API:');
    console.log('   admin@tesla.local / admin123');
    console.log('   user@tesla.local  / user1234');
    console.log(`   ${products.length} products`);
  } catch (e) { console.error(e); }
  finally    { await mongoose.disconnect(); }
})();
