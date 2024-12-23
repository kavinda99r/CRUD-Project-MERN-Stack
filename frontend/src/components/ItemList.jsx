import React, { useState } from "react";
import ItemForm from "./ItemForm";

const ItemList = ({ items, fetchItems }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const [editingItem, setEditingItem] = useState(null); // Track which item is being edited

  // Handle item deletion
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/items/${id}`, {
      method: "DELETE",
    });
    fetchItems(); // Fetch updated items after deletion
  };

  // Handle edit button click
  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true); // Open modal when editing
  };

  // Handle opening the modal for adding new items
  const openAddItemModal = () => {
    setEditingItem(null); // No item is being edited
    setIsModalOpen(true); // Open modal for adding new item
  };

  return (
    <div>
      <div className="flex justify-between border-b-4 w-full mb-4 pb-3">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Items List
        </h2>
        <button
          onClick={openAddItemModal} // Open modal for adding new item
          className="tracking-tight font-medium bg-teal-500 text-white px-5 py-2 rounded-[3px] hover:bg-teal-600 transition-all duration-200 ease-in-out"
        >
          Add Item
        </button>
      </div>

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-[4px] shadow-lg md:w-1/3 w-2/3">
            <h3 className="text-xl text-slate-900 font-bold tracking-tight mb-4">
              {editingItem ? "Edit Item" : "Add Item"}
            </h3>

            {/* Pass fetchItems and closeModal to ItemForm */}
            <ItemForm
              fetchItems={fetchItems}
              closeModal={() => setIsModalOpen(false)} // Close modal function
              itemToEdit={editingItem} // Pass the item being edited
            />
          </div>
        </div>
      )}

      {/* Display items */}
      <ul>
        {items.map((item) => (
          <li key={item._id} className="mb-2 flex flex-col border-b-2">
            <span className="text-slate-900 font-bold text-xl md:flex grid mb-1 md:justify-between">
              <span className="py-1 tracking-tight md:mb-0 mb-1">
                {item.name}
              </span>
              <span className="border-[1px] border-slate-900 rounded-[3px] px-2 py-1 text-slate-900 md:ml-3 ml-0 w-fit md:mb-0 mb-1">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(item.price)}
              </span>
            </span>
            <span className="text-slate-800 font-semibold tracking-tight">
              {item.description}
            </span>
            <span className="text-slate-600 text-sm md:mb-0 mb-1">
              {item.category}
            </span>
            <span className="text-base tracking-tight text-teal-500 font-semibold">
              {item.availability === "In Stock" ? (
                <span className="text-green-500">In Stock</span>
              ) : (
                <span className="text-red-500">Out of Stock</span>
              )}
            </span>
            <div className="flex gap-3 mt-3 mb-4">
              <button
                onClick={() => handleEdit(item)} // Trigger edit
                className="tracking-tight border-[1px] border-slate-400 text-slate-900 rounded-[3px] px-1 py-1 w-[100px] hover:bg-slate-200 transition-all duration-200 ease-in-out"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)} // Trigger delete
                className="tracking-tight border-[1px] border-slate-400 text-slate-900 bg-slate-100 hover:border-red-500 hover:bg-red-500 hover:text-white rounded-[3px] px-1 py-1 w-[100px] transition-all duration-200 ease-in-out"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
