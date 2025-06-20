import React from 'react';

const OurFoodCard = ({ imgURL, name, price, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
      <img
        src={imgURL}
        alt={name}
        className="w-full h-[200px] object-cover rounded-lg mb-3"
      />
      <h3 className="text-lg font-bold text-gray-800">{name}</h3>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
      <p className="text-green-600 font-semibold text-md mt-2">{price}</p>
      <button className="mt-3 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">Order Now</button>
    </div>
  );
};

export default OurFoodCard;
