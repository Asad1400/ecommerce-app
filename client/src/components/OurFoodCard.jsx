import React from 'react';
import { useNavigate } from 'react-router-dom';

const OurFoodCard = ({ imgURL, name, price, description, onClick }) => {
  const navigate = useNavigate();

  const handleOrderClick = (e) => {
    e.stopPropagation(); // To prevent triggering the parent onClick
    const user = localStorage.getItem('user');

    if (!user) {
      // If user is not logged in, redirect to Login
      alert('Please log in to place an order.');
      navigate('/login');
    } else {
      // If user is logged in, proceed with order
      onClick();
    }
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <img
        src={imgURL}
        alt={name}
        className="w-full h-[200px] object-cover rounded-lg mb-3"
      />
      <h3 className="text-lg font-bold text-gray-800">{name}</h3>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
      <p className="text-green-600 font-semibold text-md mt-2">{price}</p>
      <button
        className="mt-3 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        onClick={handleOrderClick}
      >
        Order Now
      </button>
    </div>
  );
};

export default OurFoodCard;
