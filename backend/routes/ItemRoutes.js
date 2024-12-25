const express = require("express");
const Item = require("../models/Item");
const router = express.Router();

// Create an item
router.post("/", async (req, res) => {
  try {
    const { name, description, price, category, availability } = req.body;

    const newItem = new Item({
      name,
      description,
      price,
      category,
      availability,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a single item by ID
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an item
router.put("/:id", async (req, res) => {
  try {
    const { name, description, price, category, availability } = req.body;

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        category,
        availability,
      },
      { new: true }
    );

    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an item
router.delete("/:id", async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
