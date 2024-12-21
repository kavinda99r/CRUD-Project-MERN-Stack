import React, { useState, useEffect } from "react";
import ItemList from "../components/ItemList";

const MainPage = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]); // State for selected categories

  // Predefined list of categories
  const categories = ["Electronics", "Clothing", "Books", "Toys", "Food"];

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await fetch("http://localhost:5000/api/items");
    const data = await res.json();
    setItems(data);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle checkbox changes for categories
  const handleCategoryChange = (e) => {
    const category = e.target.value;

    if (e.target.checked) {
      // Add category to selectedCategories if checked
      setSelectedCategories((prev) => [...prev, category]);
    } else {
      // Remove category if unchecked
      setSelectedCategories((prev) => prev.filter((cat) => cat !== category));
    }
  };

  // Filter items based on search query and selected categories
  const filteredItems = items.filter((item) => {
    const matchesSearchQuery =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(item.category);

    return matchesSearchQuery && matchesCategory;
  });

  return (
    <div className=" w-full flex flex-col md:px-9 px-0">
      <div className="px-9 pt-9  py-3">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          MERN <span className="text-teal-500">CRUD</span> Application
        </h1>
      </div>

      <div className="gird md:flex px-9 gap-4 pt-3 pb-5  ">
        <div className="w-full md:w-1/5">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Simplify and Optimize Data Management.
          </h1>
        </div>
        <div className="w-full md:w-4/5  ">
          <div>
            <h1 className="text-base font-medium text-slate-600  tracking-tight mb-4">
              A comprehensive platform to efficiently handle Create, Read,
              Update, and Delete operations with an intuitive interface, robust
              backend, and seamless integration across the MERN stack.
            </h1>
          </div>
          <div>
            {/* Search input field */}
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search items..."
              className="border-[1px] border-slate-300 bg-slate-50 rounded-[3px] outline-none px-3 py-2 w-full tracking-tight text-sm text-slate-900"
            />
          </div>
        </div>
      </div>

      <div className="grid md:flex w-full px-9 gap-4">
        <div className=" w-full md:w-1/5 py-7 md:px-9 px-6  border-[1px] border-slate-300 rounded-[3px]">
          {/* Category checkboxes */}
          <div className="mb-4">
            <h3 className="font-bold mb-2 text-slate-900">Filter</h3>
            <div className="flex flex-col gap-2 ml-5">
              {categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center space-x-2 text-slate-700"
                >
                  <input
                    type="checkbox"
                    value={category}
                    onChange={handleCategoryChange}
                    className="form-checkbox"
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="md:w-4/5 w-full md:px-9 px-6 py-7 border-[1px] border-slate-300 rounded-[3px]">
          {/* Item list */}
          <ItemList items={filteredItems} fetchItems={fetchItems} />

          {/* Display messages */}
          {items.length === 0 && (
            <p className="text-red-500">No items added yet.</p>
          )}
          {items.length > 0 && filteredItems.length === 0 && (
            <p className="text-red-500">
              No items found
              {searchQuery && ` for "${searchQuery}"`}
              {selectedCategories.length > 0 &&
                ` in categories: ${selectedCategories.join(", ")}`}
              .
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
