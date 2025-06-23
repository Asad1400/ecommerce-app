import { useState } from 'react'
import './App.css'
import Footer from './sections/Footer';
import HeroSlider from "./sections/HeroSlider";
import banner1 from "./assets/banner1.jpg";
import banner2 from "./assets/banner2.jpg";
import banner3 from "./assets/banner3.jpg";
import banner4 from "./assets/banner4.jpg";
import banner5 from "./assets/banner3.jpg";
import Navbar from './components/NavBar';
import FoodCard from './sections/FoodCard';
// import { Route,  Routes } from "react-router-dom"
import Signup from './components/Signup';

function App() {

  const bannerImages = [banner1, banner2, banner3, banner4, banner5];
  const [count, setCount] = useState(0)

  return (
    <>
    <main>
      <div className='w-full h-full overflow-hidden'>
        <Navbar />
        <HeroSlider images={bannerImages} />
        <FoodCard/>
        <Footer/>
      {/* <Signup /> */}
      </div>
    </main>
    </>
  )
}

export default App
