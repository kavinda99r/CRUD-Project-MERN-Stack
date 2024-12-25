const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  availability: {
    type: String,
    enum: ["In Stock", "Out of Stock"],
    required: true,
  },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
