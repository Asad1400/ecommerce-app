import { useEffect, useState } from 'react'
import './App.css'
import Footer from './sections/Footer'
import HeroSlider from "./sections/HeroSlider"
import banner1 from "./assets/banner1.jpg"
import banner2 from "./assets/banner2.jpg"
import banner3 from "./assets/banner3.jpg"
import banner4 from "./assets/banner4.jpg"
import banner5 from "./assets/banner3.jpg"
import Navbar from './components/NavBar'
import FoodCard from './sections/FoodCard'
import Signup from './components/Signup'
import AddToCart from './sections/AddToCart'
import Login from './components/Login'
import Profile from './components/Profile'
import { Route, Routes } from 'react-router-dom'
import Body from './sections/Body'
import OrderSummary from './sections/OrderSummary'

function App() {
  const [cartItems, setCartItems] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [user, setUser] = useState(null)
  const [userCartNames, setUserCartNames] = useState([])

  const addToCart = (item) => {
    const newItem = { ...item, quantity: 1 }
    setCartItems((prev) => [...prev, newItem])
    setShowCart(true)
  }

  useEffect(() => {
    // ✅ Load user cart on login
    if (user?.email) {
      const savedCart = localStorage.getItem(`cart_${user.email}`);
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } else {
      setCartItems([]); // reset cart if user logs out
    }
  }, [user]);

  const handleQuantityChange = (index, newQty) => {
    const updated = [...cartItems]
    updated[index].quantity = newQty
    setCartItems(updated)
  }

  const handleDeleteItem = (index) => {
    const updated = cartItems.filter((_, i) => i !== index)
    setCartItems(updated)
  }

  // ✅ When user logs in, fetch their cart items from backend
  useEffect(() => {
    const fetchUserCart = async () => {
      if (user && user._id) {
        try {
          const res = await fetch(`http://localhost:5000/cart/${user._id}`)
          const data = await res.json()
          setCartItems(data) // If you want to load into cart view as well
          setUserCartNames(data.map(item => item.name)) // Only names used for filtering
        } catch (err) {
          console.error('❌ Failed to fetch user cart:', err)
        }
      } else {
        // If user logs out, clear cart visibility
        setUserCartNames([])
        setCartItems([])
      }
    }

    fetchUserCart()
  }, [user])

  return (
    <main className="bg-white min-h-screen">
      <div className="w-full h-full overflow-hidden">
        <Navbar cartItems={cartItems} setCartItems={setCartItems} user={user} setUser={setUser} /> 
        <AddToCart
          isOpen={showCart}
          onClose={() => setShowCart(false)}
          items={cartItems}
          onQuantityChange={handleQuantityChange}
          onDeleteItem={handleDeleteItem}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Body
                addToCart={addToCart}
                user={user}
                allowedItems={user ? cartItems.map(item => item.name) : null}
              />
            }
          />
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/order-summary" element={<OrderSummary />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </div>
    </main>
  )
}

export default App
