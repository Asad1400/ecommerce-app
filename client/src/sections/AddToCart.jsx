import React, { useState } from 'react';
import { FaShoppingCart, FaTimes } from 'react-icons/fa';

const AddToCart = () => {
  const [isOpen, setIsOpen] = useState(false);

  const cartItems = [
    { name: 'Burger', price: 250 },
    { name: 'Pizza', price: 800 },
  ];

  return (
    <>
      {/* Cart Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-5 right-5 z-50 px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2 hover:bg-blue-700 transition"
      >
        <FaShoppingCart size={18} />
        ({cartItems.length})
      </button>

      {/* Slide-out Cart Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 -left-10 bg-red-600 text-white p-2 rounded hover:bg-red-700"
        >
          <FaTimes size={16} />
        </button>

        {/* Cart Header */}
        <div className="mb-4 px-4 pt-5">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <hr className="border-t-2 border-black mt-2" />
        </div>

        {/* Cart Items */}
        <div className="px-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-500">No items in cart.</p>
          ) : (
            <ul className="space-y-3">
              {cartItems.map((item, index) => (
                <li key={index} className="border-b pb-2">
                  <span className="font-medium">{item.name}</span> – Rs {item.price}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default AddToCart;
