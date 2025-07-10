import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const FoodCardDetails = ({ isOpen, onClose, imgURL, name, description, price, onAddToCart }) => {
  if (!isOpen) return null;
  const [drink, setDrink] = useState('coke');
  const [sauce, setSauce] = useState('');
  const [extra, setExtra] = useState('');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-xl relative w-full max-w-[100vh] max-h-[90vh] overflow-y-auto my-8 p-6">
        <button onClick={onClose} className="absolute top-3 right-4">
          <FaTimes className="w-7 h-7" />
        </button>

        {/* Food Info */}
        <div className="flex flex-row items-center gap-6 p-4 ">
          <div className="w-40 h-40 flex-shrink-0">
            <img
              src={imgURL}
              alt={name}
              className="w-full h-full object-cover rounded-md border border-gray-300"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-semibold text-gray-800">{name}</h2>
            <p className="text-gray-600 text-base mt-2">{description}</p>
            <p className="text-green-600 text-2xl font-semibold mt-3">Price: {price}</p>
          </div>
        </div>

        {/* Drink */}
        <div className="mt-4">
          <label className="block font-semibold">Choose Drink</label>
          <select className="w-full border rounded p-2 mt-1" onChange={(e) => setDrink(e.target.value)} value={drink}>
            <option value="coke">Coke</option>
            <option value="sprite">Sprite</option>
            <option value="water">Water</option>
            <option value="DEW">DEW</option>
            <option value="ZeroDietCoke">Zero Diet Coke</option>
            <option value="SpriteMint">Sprite Mint</option>
          </select>
        </div>

        {/* Sauce */}
        <div className="mt-4">
          <label className="block font-semibold">Select Sauce</label>
          <div className="flex gap-3 mt-1 flex-wrap accent-red-500">
            {['ketchup', 'mayo', 'BBQSauce', 'SmokeySauce'].map((s) => (
              <label key={s}>
                <input
                  type="radio"
                  name="sauce"
                  value={s}
                  checked={sauce === s}
                  onChange={(e) => setSauce(e.target.value)}
                />{" "}
                {s.replace(/([A-Z])/g, ' $1')}
              </label>
            ))}
          </div>
        </div>

        {/* Extras */}
        <div className="mt-4">
          <label className="block font-semibold">Add Extras</label>
          <div className="flex gap-3 mt-1 flex-wrap accent-red-500">
            {['fries', 'cheese', 'waffle', 'loadedfries'].map((e) => (
              <label key={e}>
                <input
                  type="radio"
                  name="extras"
                  value={e}
                  checked={extra === e}
                  onChange={(ev) => setExtra(ev.target.value)}
                />{" "}
                {e.replace(/([A-Z])/g, ' $1')}
              </label>
            ))}
          </div>
        </div>

        {/* Add Button */}
        <button
          className="mt-5 w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
          onClick={() => {
            const customizedItem = {
              name,
              price,
              imgURL,
              description,
              drink,
              sauce,
              extra,
              quantity: 1,
            };
            onAddToCart(customizedItem);
            onClose(); // optional: close modal after adding
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default FoodCardDetails;