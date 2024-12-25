import React, { useState, useEffect } from "react";

const ItemForm = ({ fetchItems, closeModal, itemToEdit }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [availability, setAvailability] = useState("");

  // Set form values if an item is being edited
  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.name);
      setDescription(itemToEdit.description);
      setPrice(itemToEdit.price);
      setCategory(itemToEdit.category);
      setAvailability(itemToEdit.availability || "");
    }
  }, [itemToEdit]);

  // Handle adding and updating items
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newItem = {
      name,
      description,
      price: parseFloat(price),
      category,
      availability,
    };

    if (itemToEdit) {
      // Update existing item
      await fetch(`http://localhost:5000/api/items/${itemToEdit._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
    } else {
      // Add new item
      await fetch("http://localhost:5000/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
    }

    fetchItems();
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3 flex flex-col gap-3">
      {/* ======================================================================================= */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Item name"
        className="text-slate-900 border-[1px] border-slate-400 rounded-[3px] text-sm tracking-tight py-2 px-3 outline-none"
        required
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="text-slate-900 border-[1px] border-slate-400 rounded-[3px] text-sm tracking-tight py-2 px-3 outline-none"
        required
      >
        <option value="">Select Category</option>
        <option value="Laptops">Laptops</option>
        <option value="Laptop Accessories">Laptop Accessories</option>
        <option value="Desktop Computers">Desktop Computers</option>
        <option value="Monitors">Monitors</option>
        <option value="Graphics Card">Graphics Card</option>
        <option value="Printer">Printer</option>
        <option value="Graphic Tab">Graphic Tab</option>
        <option value="Smart Phones">Smart Phones</option>
        <option value="Other Accessories">Other Accessories</option>
      </select>

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

      <select
        value={availability}
        onChange={(e) => setAvailability(e.target.value)}
        className="text-slate-900 border-[1px] border-slate-400 rounded-[3px] text-sm tracking-tight py-2 px-3 outline-none"
        required
      >
        <option value="">Select Availability</option>
        <option value="In Stock">In Stock</option>
        <option value="Out of Stock">Out of Stock</option>
      </select>

      {/* ======================================================================================= */}
      <div className="flex gap-2 md:justify-end mt-4">
        <button
          type="submit"
          className="bg-teal-500 text-white font-medium tracking-tight py-2 rounded-[3px] md:w-[120px] w-full hover:bg-teal-600 transition-all duration-200 ease-in-out"
        >
          {itemToEdit ? "Update Item" : "Add Item"}
        </button>
        <button
          type="button"
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
