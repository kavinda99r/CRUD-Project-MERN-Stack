import React, { useState, useEffect } from "react";
import ItemList from "../components/ItemList";
import { Link } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { MdHome } from "react-icons/md";

const MainPage = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]); // State for selected categories

  // Predefined list of categories
  const categories = [
    "Laptops",
    "Laptop Accessories",
    "Desktop Computers",
    "Monitors",
    "Graphics Card",
    "Printer",
    "Graphic Tab",
    "Smart Phones",
    "Other Accessories",
  ];

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
    <div className=" w-full min-h-screen flex flex-col ">
      <div className="flex items-center justify-between md:px-9 px-0 h-14 border-b-[1px] border-slate-300">
        <div className="flex gap-2 pl-9">
          <h1 className="text-xl font-bold">Logo</h1>
        </div>
        <div className="pr-9">
          <Link to="/">
            <button className="flex items-center gap-2 text-center text-2xl text-slate-900 font-medium px-2 py-2 rounded-[3px] hover:text-white hover:border-teal-500 hover:bg-teal-500 transition-all ease-in-out duration-300">
            <MdHome />
              
            </button>
          </Link>
        </div>
      </div>
      <div className="flex-grow md:px-9 px-0">
        <div className="px-9 pt-5  py-3">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            MERN <span className="text-teal-500">CRUD</span> Application
          </h1>
        </div>

        <div className="gird md:flex px-9 gap-4 pt-2 pb-5  ">
          <div className="w-full md:w-1/5">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Simplify and Optimize Data Management.
            </h1>
          </div>
          <div className="w-full md:w-4/5  ">
            <div>
              <h1 className="text-base font-medium text-slate-800  tracking-tight mb-4">
                A comprehensive platform to efficiently handle Create, Read,
                Update, and Delete operations with an intuitive interface,
                robust backend, and seamless integration across the MERN stack.
              </h1>
            </div>
            <div>
              {/* Search input field */}
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search items"
                className="border-[1px] border-slate-500  font-medium rounded-[3px] outline-none px-4 py-3 w-full tracking-tight text-sm text-slate-900"
              />
            </div>
          </div>
        </div>

        <div className="grid md:flex w-full px-9 gap-4 mb-5">
          <div className="w-full md:w-1/5 py-7 md:px-9 px-6 border-[1px] border-slate-300 rounded-[3px]">
            {/* Category checkboxes */}
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2 text-slate-900">Filter</h3>
              <div className="grid grid-cols-2 md:flex flex-col gap-2 px-2">
                {categories.map((category) => (
                  <label
                    key={category}
                    className="flex items-center text-base space-x-2 text-slate-700"
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
          <div className="md:w-4/5 w-full md:px-9 px-6 py-7 border-[1px] border-slate-300 rounded-[3px] ">
            {/* Item list */}
            <ItemList items={filteredItems} fetchItems={fetchItems} />

            {/* Display messages */}
            {items.length === 0 && (
              <p className="text-slate-500 text-center pt-7">
                No items added yet.
              </p>
            )}
            {items.length > 0 && filteredItems.length === 0 && (
              <p className="text-slate-500 text-center pt-7">
                No items found
                {searchQuery && ` for "${searchQuery}"`}
                {selectedCategories.length > 0 &&
                  ` in ${selectedCategories.join(", ")}`}
                .
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="footer w-full">
        <div className="h-14 bg-teal-800 text-teal-100 md:text-sm text-xs flex justify-center items-center">
          <p>&copy; 2024, Designed and Developed by Kavinda Ravihansa</p>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
