import React, { useState } from 'react';
import { burgers, wraps, familydeal } from '../constants';
import OurFoodCard from '../components/OurFoodCard';
import FoodCardDetails from '../components/FoodCardDetails';
import ReviewSection from '../sections/ReviewSection';

const FoodCard = ({ addToCart, allowedItems }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = (customizedItem) => {
    addToCart(customizedItem);
    setIsModalOpen(false);
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const renderSection = (title, items) => (
    <section className="my-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-red-700">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <OurFoodCard
            key={item.id}
            {...item}
            onClick={() => handleCardClick(item)}
            // Optionally you can highlight if it's in cart:
            inCart={allowedItems?.includes(item.name)}
          />
        ))}
      </div>
    </section>
  );

  return (
    <>
      {renderSection('Family Deals', familydeal)}
      {renderSection('Our Burgers', burgers)}
      {renderSection('Our Wraps', wraps)}

      {selectedItem && (
        <FoodCardDetails
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          {...selectedItem}
          onAddToCart={handleAddToCart}
        />
      )}
      <ReviewSection />
    </>
  );
};

export default FoodCard;
