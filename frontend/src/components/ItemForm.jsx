import React, { useState, useEffect } from 'react';

const ItemForm = ({ fetchItems, closeModal, itemToEdit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');  // New state for category

  // Set form values if an item is being edited
  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.name);
      setDescription(itemToEdit.description);
      setPrice(itemToEdit.price);
      setCategory(itemToEdit.category);  // Set category if editing
    }
  }, [itemToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newItem = {
      name,
      description,
      price: parseFloat(price),  // Ensure price is a number
      category,  // Add category to the item
    };

    if (itemToEdit) {
      // Update existing item
      await fetch(`http://localhost:5000/api/items/${itemToEdit._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });
    } else {
      // Add new item
      await fetch('http://localhost:5000/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });
    }

    fetchItems();
    closeModal();  // Close modal after submission
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Item name"
        className="border p-2 mr-2"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="border p-2 mr-2"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        className="border p-2 mr-2"
        required
      />

      {/* Category selection */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 mr-2"
        required
      >
        <option value="">Select Category</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
        <option value="Books">Books</option>
        <option value="Toys">Toys</option>
        <option value="Food">Food</option>
        {/* Add more categories as needed */}
      </select>

      <button type="submit" className="bg-blue-500 text-white p-2">
        {itemToEdit ? 'Update Item' : 'Add Item'}
      </button>
    </form>
  );
};

export default ItemForm;
