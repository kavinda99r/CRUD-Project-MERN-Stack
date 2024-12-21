const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },  // Category field
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
