const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  category: String,
});

const ProductModel = mongoose.model('product', ProductSchema);
module.exports = ProductModel;
