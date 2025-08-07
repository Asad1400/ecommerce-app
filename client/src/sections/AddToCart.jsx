import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddToCart = ({ isOpen, onClose, items = [], onQuantityChange, onDeleteItem }) => {
  const navigate = useNavigate();

  const totalPrice = items.reduce((total, item) => {
    const basePrice = parseFloat((item.price || "").replace(/[^\d.]/g, '')) || 0;
    const extraCharge = (item.extra ? 2 : 0) + (item.sauce ? 2 : 0);
    return total + (basePrice + extraCharge) * (item.quantity || 1);
  }, 0);

  useEffect(() => {
    const cartIcon = document.getElementById("cart-icon");

    const handleClick = () => {
      onClose?.();
    };

    if (cartIcon) {
      cartIcon.addEventListener("click", handleClick);
    }

    return () => {
      if (cartIcon) {
        cartIcon.removeEventListener("click", handleClick);
      }
    };
  }, [onClose]);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-[100] transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 border-b font-bold text-xl flex justify-between items-center">
        Cart
        <button
          onClick={onClose}
          className="text-red-500 text-sm border px-2 rounded hover:bg-red-100"
        >
          Close
        </button>
      </div>

      <div className="p-4 overflow-y-auto max-h-[calc(100%-160px)]">
        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {items.map((item, index) => {
              const basePrice = parseFloat((item.price || "").replace(/[^\d.]/g, '')) || 0;
              const extraCharge = (item.extra ? 2 : 0) + (item.sauce ? 2 : 0);
              const itemTotal = (basePrice + extraCharge) * (item.quantity || 1);

              return (
                <li key={index} className="border p-2 rounded shadow-sm relative">
                  <button
                    className="absolute top-1 right-1 text-red-500 text-xs hover:text-red-700"
                    onClick={() => onDeleteItem(index)}
                  >
                    ❌
                  </button>

                  <div className="flex gap-3">
                    <img
                      src={item.imgURL}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                      <p className="text-sm text-gray-600">Drink: {item.drink}</p>
                      <p className="text-sm text-gray-600">
                        Sauce: {item.sauce || "None"} {item.sauce && "+ 2$"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Extra: {item.extra || "None"} {item.extra && "+ 2$"}
                      </p>
                      <p className="text-sm text-green-600 font-semibold">
                        Total: {item.price}
                      </p>

                      <div className="flex items-center gap-2 mt-1">
                        <button
                          className="px-2 py-1 border rounded text-sm"
                          onClick={() =>
                            onQuantityChange(index, Math.max((item.quantity || 1) - 1, 1))
                          }
                        >
                          -
                        </button>
                        <span>{item.quantity || 1}</span>
                        <button
                          className="px-2 py-1 border rounded text-sm"
                          onClick={() =>
                            onQuantityChange(index, (item.quantity || 1) + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {items.length > 0 && (
        <div className="p-4 border-t">
          <div className="flex justify-between mb-3">
            <span className="font-semibold">Total:</span>
            <span className="font-bold text-green-600">
              $ {totalPrice.toFixed(2)}
            </span>
          </div>
          <button
            className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
            onClick={() => {
              onClose();
              navigate('/order-summary', { state: { items } });
            }}
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default AddToCart;
