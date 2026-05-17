// Seed 24 Tesla-themed products. Run with: npm run seed
require('dotenv').config();
const mongoose = require('mongoose');
const Product  = require('./models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tesla_shop';

const items = [
  // Apparel
  { name: 'Tesla Logo T-Shirt',          category: 'Apparel',     price: 35,   rating: 4.6, stock: 120, image: '/public/images/model-3.jpg' },
  { name: 'Cybertruck Hoodie',           category: 'Apparel',     price: 75,   rating: 4.8, stock: 45,  image: '/public/images/model-x.jpg' },
  { name: 'Tesla Cap',                   category: 'Apparel',     price: 25,   rating: 4.3, stock: 200, image: '/public/images/model-y.jpg' },
  { name: 'Plaid Performance Jacket',    category: 'Apparel',     price: 199,  rating: 4.7, stock: 18,  image: '/public/images/model-s.jpg' },

  // Accessories
  { name: 'All-Weather Floor Mats',      category: 'Accessories', price: 220,  rating: 4.9, stock: 85,  image: '/public/images/model-y.jpg' },
  { name: 'Center Console Organizer',    category: 'Accessories', price: 35,   rating: 4.5, stock: 150, image: '/public/images/model-3.jpg' },
  { name: 'Wireless Phone Charger Pad',  category: 'Accessories', price: 125,  rating: 4.4, stock: 60,  image: '/public/images/model-s.jpg' },
  { name: 'Pet Liner for Trunk',         category: 'Accessories', price: 250,  rating: 4.6, stock: 22,  image: '/public/images/model-x.jpg' },
  { name: 'Sunshade for Glass Roof',     category: 'Accessories', price: 110,  rating: 4.5, stock: 70,  image: '/public/images/model-y.jpg' },

  // Charging
  { name: 'Wall Connector',              category: 'Charging',    price: 475,  rating: 4.9, stock: 30,  image: '/public/images/model-s.jpg' },
  { name: 'Mobile Connector Bundle',     category: 'Charging',    price: 230,  rating: 4.7, stock: 90,  image: '/public/images/model-3.jpg' },
  { name: 'NEMA 14-50 Adapter',          category: 'Charging',    price: 45,   rating: 4.6, stock: 140, image: '/public/images/model-y.jpg' },
  { name: 'CCS Combo 1 Adapter',         category: 'Charging',    price: 175,  rating: 4.4, stock: 50,  image: '/public/images/model-x.jpg' },
  { name: 'J1772 Adapter',               category: 'Charging',    price: 50,   rating: 4.8, stock: 200, image: '/public/images/model-s.jpg' },

  // Lifestyle
  { name: 'Tesla Tequila Decanter',      category: 'Lifestyle',   price: 250,  rating: 4.9, stock: 8,   image: '/public/images/model-x.jpg' },
  { name: 'Cyberwhistle',                category: 'Lifestyle',   price: 50,   rating: 4.5, stock: 25,  image: '/public/images/model-3.jpg' },
  { name: 'Stainless Steel Tumbler',     category: 'Lifestyle',   price: 35,   rating: 4.6, stock: 180, image: '/public/images/model-y.jpg' },
  { name: 'Diecast Cybertruck Toy',      category: 'Lifestyle',   price: 75,   rating: 4.7, stock: 60,  image: '/public/images/model-x.jpg' },
  { name: 'Tesla Throw Blanket',         category: 'Lifestyle',   price: 65,   rating: 4.4, stock: 45,  image: '/public/images/model-s.jpg' },

  // Vehicles
  { name: 'Model Y Long Range AWD',      category: 'Vehicles',    price: 49990,rating: 4.9, stock: 12,  image: '/public/images/model-y.jpg' },
  { name: 'Model 3 Performance',         category: 'Vehicles',    price: 52990,rating: 4.8, stock: 9,   image: '/public/images/model-3.jpg' },
  { name: 'Model S Plaid',               category: 'Vehicles',    price: 89990,rating: 4.9, stock: 5,   image: '/public/images/model-s.jpg' },
  { name: 'Model X Plaid',               category: 'Vehicles',    price: 99990,rating: 4.8, stock: 4,   image: '/public/images/model-x.jpg' },
  { name: 'Cybertruck All-Wheel Drive',  category: 'Vehicles',    price: 79990,rating: 4.7, stock: 7,   image: '/public/images/model-x.jpg' }
];

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await Product.deleteMany({});
    await Product.insertMany(items);
    console.log(`✔ Seeded ${items.length} products`);
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.disconnect();
  }
})();
