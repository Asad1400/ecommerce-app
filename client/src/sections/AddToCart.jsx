// AddToCart.jsx
import { useEffect, useState } from "react";

const AddToCart = () => {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 border-b font-bold text-xl flex justify-between items-center">
        Cart
        <button
          onClick={() => setIsOpen(false)}
          className="text-red-500 text-sm border px-2 rounded hover:bg-red-100"
        >
          Close
        </button>
      </div>
      <div className="p-4">
        <p>Your cart is empty.</p>
        {/* Add cart items here */}
      </div>
    </div>
  );
};

export default AddToCart;
