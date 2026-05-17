// Seed database with 30 Tesla-themed products
require('dotenv').config();
const mongoose = require('mongoose');
const Product  = require('./models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tesla_shop_admin';

const SAMPLE_PRODUCTS = [
  // ===== APPAREL (6 products) =====
  { name: 'Tesla Logo T-Shirt (Black)',        category: 'Apparel',     price: 35.00,  rating: 4.6, stock: 120, description: 'Classic black t-shirt with Tesla logo' },
  { name: 'Tesla Logo T-Shirt (White)',        category: 'Apparel',     price: 35.00,  rating: 4.7, stock: 95,  description: 'Classic white t-shirt with Tesla logo' },
  { name: 'Cybertruck Hoodie',                 category: 'Apparel',     price: 75.00,  rating: 4.8, stock: 45,  description: 'Comfortable hoodie featuring Cybertruck design' },
  { name: 'Tesla Cap (Adjustable)',            category: 'Apparel',     price: 25.00,  rating: 4.3, stock: 200, description: 'Classic adjustable cap with embroidered Tesla T logo' },
  { name: 'Plaid Performance Jacket',          category: 'Apparel',     price: 199.00, rating: 4.7, stock: 18,  description: 'Premium jacket celebrating Plaid performance' },
  { name: 'Tesla Crew Socks (3 Pack)',         category: 'Apparel',     price: 18.00,  rating: 4.4, stock: 150, description: 'Comfortable crew socks with Tesla branding' },

  // ===== ACCESSORIES (8 products) =====
  { name: 'All-Weather Floor Mats (Set)',      category: 'Accessories', price: 220.00, rating: 4.9, stock: 85,  description: 'Premium floor mats for all Tesla models' },
  { name: 'Center Console Organizer',          category: 'Accessories', price: 35.00,  rating: 4.5, stock: 150, description: 'Slim organizer for center console storage' },
  { name: 'Wireless Phone Charger Pad',        category: 'Accessories', price: 125.00, rating: 4.4, stock: 60,  description: 'Fast wireless charging for compatible devices' },
  { name: 'Pet Liner for Trunk',               category: 'Accessories', price: 250.00, rating: 4.6, stock: 22,  description: 'Protective liner for trunk area' },
  { name: 'Sunshade for Glass Roof',           category: 'Accessories', price: 110.00, rating: 4.5, stock: 70,  description: 'Reflective sunshade for panoramic roof' },
  { name: 'Steering Wheel Cover',              category: 'Accessories', price: 45.00,  rating: 4.3, stock: 140, description: 'Premium leather-like steering wheel cover' },
  { name: 'Door Edge Protector (Pair)',        category: 'Accessories', price: 30.00,  rating: 4.7, stock: 180, description: 'Protective guards for door edges' },
  { name: 'Tesla Key Fob Case',                category: 'Accessories', price: 20.00,  rating: 4.6, stock: 250, description: 'Durable silicone case for key fob' },

  // ===== CHARGING (6 products) =====
  { name: 'Wall Connector (Home Charging)',    category: 'Charging',    price: 475.00, rating: 4.9, stock: 30,  description: 'Official Tesla Wall Connector for home charging' },
  { name: 'Mobile Connector Bundle',           category: 'Charging',    price: 230.00, rating: 4.7, stock: 90,  description: 'Complete mobile charging solution with adapters' },
  { name: 'NEMA 14-50 Adapter',                category: 'Charging',    price: 45.00,  rating: 4.6, stock: 140, description: 'Adapter for NEMA 14-50 outlets' },
  { name: 'CCS Combo 1 Adapter',               category: 'Charging',    price: 175.00, rating: 4.4, stock: 50,  description: 'Fast charging with CCS Combo adapter' },
  { name: 'J1772 Adapter',                     category: 'Charging',    price: 50.00,  rating: 4.8, stock: 200, description: 'Adapter for J1772 charging stations' },
  { name: 'Charging Cable Organizer',          category: 'Charging',    price: 25.00,  rating: 4.5, stock: 120, description: 'Wall-mounted organizer for charging cables' },

  // ===== LIFESTYLE (6 products) =====
  { name: 'Tesla Tequila Decanter',            category: 'Lifestyle',   price: 250.00, rating: 4.9, stock: 8,   description: 'Limited edition Tesla Tequila bottle (empty)' },
  { name: 'Tesla Whistle',                     category: 'Lifestyle',   price: 15.00,  rating: 4.2, stock: 300, description: 'Playful Tesla-branded whistle' },
  { name: 'Tesla Coffee Mug',                  category: 'Lifestyle',   price: 18.00,  rating: 4.6, stock: 200, description: 'Ceramic mug perfect for daily use' },
  { name: 'Tesla Desk Organizer',              category: 'Lifestyle',   price: 30.00,  rating: 4.4, stock: 90,  description: 'Modern desk organizer with Tesla logo' },
  { name: 'Tesla Wall Clock',                  category: 'Lifestyle',   price: 40.00,  rating: 4.5, stock: 70,  description: 'Contemporary wall clock with Tesla branding' },
  { name: 'Tesla Phone Grip Ring',             category: 'Lifestyle',   price: 12.00,  rating: 4.3, stock: 400, description: 'Practical phone grip with rotating ring' },

  // ===== VEHICLES (4 products - Premium items) =====
  { name: 'Model Y Scale Model (1:18)',        category: 'Vehicles',    price: 85.00,  rating: 4.8, stock: 50,  description: 'Die-cast scale model of Model Y' },
  { name: 'Model S Scale Model (1:18)',        category: 'Vehicles',    price: 85.00,  rating: 4.7, stock: 45,  description: 'Die-cast scale model of Model S' },
  { name: 'Cybertruck Scale Model (1:18)',     category: 'Vehicles',    price: 95.00,  rating: 4.9, stock: 38,  description: 'Die-cast scale model of Cybertruck' },
  { name: 'Model 3 Scale Model (1:18)',        category: 'Vehicles',    price: 85.00,  rating: 4.6, stock: 55,  description: 'Die-cast scale model of Model 3' }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('📦 Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert new products
    const created = await Product.insertMany(SAMPLE_PRODUCTS);
    console.log(`✔️  Seeded ${created.length} products successfully!\n`);

    // Display summary
    const categories = {};
    created.forEach(p => {
      categories[p.category] = (categories[p.category] || 0) + 1;
    });

    console.log('📊 Products by Category:');
    Object.entries(categories).forEach(([cat, count]) => {
      console.log(`   ${cat}: ${count}`);
    });

    console.log(`\n💰 Price Range: $${Math.min(...created.map(p => p.price)).toFixed(2)} - $${Math.max(...created.map(p => p.price)).toFixed(2)}`);
    console.log(`⭐ Average Rating: ${(created.reduce((sum, p) => sum + p.rating, 0) / created.length).toFixed(2)}`);
    console.log(`📦 Total Stock: ${created.reduce((sum, p) => sum + p.stock, 0)} units\n`);

    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
}

seed();
