import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const onClose = () => setIsOpen(false);

const AddToCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const onClose = () => setIsOpen(false);

  useEffect(() => {
    const cartIcon = document.getElementById("cart-icon");

    const handleClick = () => {
      setIsOpen(prev => !prev); // toggle open/close
    };

    if (cartIcon) {
      cartIcon.addEventListener("click", handleClick);
    }

    return () => {
      if (cartIcon) {
        cartIcon.removeEventListener("click", handleClick);
      }
    };
  }, []);

const AddToCart = ({ isOpen, onClose }) => {
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
      <div className="p-4">
        <p>Your cart is empty.</p>
        {/* Add cart items here */}
      <div className="p-4">
        <p>Your cart is empty.</p>
      </div>
    </div>
  );
};

export default AddToCart;
