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
    <form onSubmit={handleSubmit} className="mb-3 flex flex-col gap-3">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Item name"
        className="text-slate-900 border-[1px] border-slate-400 rounded-[3px] text-sm tracking-tight py-2 px-3 outline-none"
        required
      />
      <textarea
        type="text"
        rows="6"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="text-slate-900 border-[1px] border-slate-400 rounded-[3px] text-sm tracking-tight py-2 px-3 outline-none resize-none"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        className="text-slate-900 border-[1px] border-slate-400 rounded-[3px] text-sm tracking-tight py-2 px-3 outline-none"
        required
      />

      {/* Category selection */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="text-slate-900 border-[1px] border-slate-400 rounded-[3px] text-sm tracking-tight py-2 px-3 outline-none"
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

      <div className="flex gap-2 md:justify-end mt-4">
        <button
          type="submit"
          className="bg-teal-500 text-white font-medium tracking-tight py-2 rounded-[3px] md:w-[120px] w-full hover:bg-teal-600 transition-all duration-200 ease-in-out"
        >
          {itemToEdit ? 'Update Item' : 'Add Item'}
        </button>
        <button
          type="button" // Ensure this is a button to prevent form submission
          onClick={closeModal}
          className="tracking-tight border-[1px] font-medium  border-slate-400 text-slate-900 rounded-[3px] px-1 py-2 md:w-[120px] w-full hover:bg-slate-200 transition-all duration-200 ease-in-out"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ItemForm;
