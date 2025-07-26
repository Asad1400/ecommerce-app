import React, { useState } from "react";

const SearchModal = ({ isOpen, onClose, items = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const allItems = items;

  const filteredItems = allItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`fixed top-0 left-0 w-full bg-white shadow-md z-[100] transform transition-transform duration-300 ${
        isOpen ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Search</h2>
        <button
          onClick={onClose}
          className="text-sm text-red-500 border px-2 py-1 rounded hover:bg-red-100"
        >
          Close
        </button>
      </div>

      {/* Input */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Search food, restaurants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Search Results */}
      <div className="px-4 pb-4 max-h-96 overflow-y-auto">
        {searchTerm && filteredItems.length === 0 && (
          <p className="text-gray-500">No matching results.</p>
        )}
        <ul className="space-y-3">
          {filteredItems.map((item, index) => (
            <li key={index} className="p-3 border rounded shadow-sm">
              <div className="flex gap-4 items-center">
                <img
                  src={item.imgURL}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-sm text-green-600 font-bold">{item.price}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchModal;
