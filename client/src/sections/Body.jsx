import React from 'react'
import HeroSlider from './HeroSlider'
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";
import banner4 from "../assets/banner4.jpg";
import banner5 from "../assets/banner3.jpg";
import FoodCard from './FoodCard';
import AddToCart from './AddToCart';
import Footer from './Footer';

function Body() {
    const bannerImages = [banner1, banner2, banner3, banner4, banner5];

    return (
    <>
        <div className='w-full h-full overflow-hidden'>
            <AddToCart />
            <HeroSlider images={bannerImages} />
            <FoodCard />
            <Footer />
        </div>
    </>
  )
}

export default Body