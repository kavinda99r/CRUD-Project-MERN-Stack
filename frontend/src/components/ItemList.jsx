import React, { useState } from "react";
import ItemForm from "./ItemForm";
import { LiaClipboardListSolid } from "react-icons/lia";

const ItemList = ({ items, fetchItems }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletePopup, setDeletePopup] = useState({
    visible: false,
    itemId: null,
  });

  // Handle item deletion
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/items/${id}`, {
      method: "DELETE",
    });
    fetchItems();
    setDeletePopup({ visible: false, itemId: null });
  };

  // Open delete confirmation popup
  const confirmDelete = (itemId) => {
    setDeletePopup({ visible: true, itemId });
  };

  // Close delete confirmation popup
  const closeDeletePopup = () => {
    setDeletePopup({ visible: false, itemId: null });
  };

  // Handle edit button click
  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  // Handle opening the modal for adding new items
  const openAddItemModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between border-b-4 w-full mb-4 pb-3">
        {/* ======================================================================================= */}
        {/* Title Section with Add Item Button */}
        <h2 className="flex items-center text-xl font-bold text-slate-900 tracking-tight">
          <LiaClipboardListSolid />
          <span className="ml-2">Items List</span>
        </h2>
        <button
          onClick={openAddItemModal}
          className="tracking-tight font-medium bg-teal-500 text-white px-5 py-2 rounded-[3px] hover:bg-teal-600 transition-all duration-200 ease-in-out"
        >
          Add Item
        </button>
      </div>

      {/* ======================================================================================= */}
      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-[4px] shadow-lg md:w-1/3 w-2/3">
            <h3 className="text-xl text-slate-900 font-bold tracking-tight mb-4">
              {editingItem ? "Edit Item" : "Add Item"}
            </h3>
            <ItemForm
              fetchItems={fetchItems}
              closeModal={() => setIsModalOpen(false)}
              itemToEdit={editingItem}
            />
          </div>
        </div>
      )}

      {/* ======================================================================================= */}
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
            <span className="text-base tracking-tight text-teal-500 font-semibold">
              {item.availability === "In Stock" ? (
                <span className="text-green-500">In Stock</span>
              ) : (
                <span className="text-red-500">Out of Stock</span>
              )}
            </span>
            <span className="text-slate-600 text-xs md:mb-0 mb-1">
              {item.category}
            </span>

            <div className="flex gap-3 mt-3 mb-4">
              <button
                onClick={() => handleEdit(item)}
                className="tracking-tight border-[1px] border-slate-400 text-slate-900 rounded-[3px] px-1 py-1 w-[100px] hover:bg-slate-200 transition-all duration-200 ease-in-out"
              >
                Edit
              </button>
              <button
                onClick={() => confirmDelete(item._id)}
                className="tracking-tight border-[1px] border-slate-400 text-slate-900 bg-slate-100 hover:border-red-500 hover:bg-red-500 hover:text-white rounded-[3px] px-1 py-1 w-[100px] transition-all duration-200 ease-in-out"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* ======================================================================================= */}
      {/* Delete Confirmation Toast */}
      {deletePopup.visible && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-[4px] shadow-lg w-[300px] text-center">
            <p className="text-slate-900 font-medium text-lg mb-4">
              Are you sure you want to delete this item?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => handleDelete(deletePopup.itemId)}
                className="bg-red-500 text-white px-4 w-[100px] py-2 rounded-[3px] hover:bg-red-600 transition-all duration-200"
              >
                Yes
              </button>
              <button
                onClick={closeDeletePopup}
                className="bg-gray-300 text-slate-900 px-4 w-[100px] py-2 rounded-[3px] hover:bg-gray-400 transition-all duration-200"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemList;
