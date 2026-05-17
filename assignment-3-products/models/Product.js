const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true, trim: true },
    price:    { type: Number, required: true, min: 0 },
    category: { type: String, required: true, enum: ['Apparel', 'Accessories', 'Charging', 'Lifestyle', 'Vehicles'] },
    rating:   { type: Number, default: 0, min: 0, max: 5 },
    stock:    { type: Number, default: 0, min: 0 },
    image:    { type: String, default: '/public/images/model-y.jpg' },
    description: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
