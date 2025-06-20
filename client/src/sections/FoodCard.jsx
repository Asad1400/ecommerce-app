import React from 'react';
import { burgers, wraps, familydeal } from '../constants';
import OurFoodCard from '../components/OurFoodCard';

const FoodCard = () => {
  return (
    <>

      <section className="my-10 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-red-700">Family Deals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {familydeal.map((deal) => (
            <OurFoodCard key={deal.id} {...deal} />
          ))}
        </div>
      </section>

      <section className="my-10 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-red-700">Our Burgers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {burgers.map((burger) => (
            <OurFoodCard key={burger.id} {...burger} />
          ))}
        </div>
      </section>


      <section className="my-10 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-red-700">Our Wraps</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wraps.map((wrap) => (
            <OurFoodCard key={wrap.id} {...wrap} />
          ))}
        </div>
      </section>



    </>
  );
};

export default FoodCard;
