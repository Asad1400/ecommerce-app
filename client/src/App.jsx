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
import AddToCart from './sections/AddToCart';
import Login from './components/Login'
import Profile from './components/Profile'
import { Route, Routes } from 'react-router-dom'
import Body from './sections/Body';
import OrderSummary from './sections/OrderSummary';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (item) => {
    const newItem = { ...item, quantity: 1 };
    setCartItems((prev) => [...prev, newItem]);
    setShowCart(true);
  };

  const handleQuantityChange = (index, newQty) => {
    const updated = [...cartItems];
    updated[index].quantity = newQty;
    setCartItems(updated);
  };

  const handleDeleteItem = (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
  };

  return (
    <main className="bg-white min-h-screen ">
      <div className="w-full h-full overflow-hidden">
        <Navbar cartItems={cartItems} setCartItems={setCartItems} /> 
        {/* Navbar is causing the issue that its is displayed on every page */}
        <AddToCart
          isOpen={showCart}
          onClose={() => setShowCart(false)}
          items={cartItems}
          onQuantityChange={handleQuantityChange}
          onDeleteItem={handleDeleteItem}
        />
        <Routes>
          <Route path="/" element={<Body addToCart={addToCart} />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<div>Page Not Found</div>} />
          <Route path="/order-summary" element = {<OrderSummary/>}/>
        </Routes>
      </div>
    </main>
  );
}

export default App;