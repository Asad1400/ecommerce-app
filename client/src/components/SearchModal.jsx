import React from "react";

const SearchModal = ({ isOpen, onClose }) => {
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
      <div className="p-4">
        <input
          type="text"
          placeholder="Search food, restaurants..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>
    </div>
  );
};

export default SearchModal;
