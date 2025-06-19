import { useState } from 'react'
import './App.css'
import Hero from './sections/Hero';
import Footer from './sections/Footer';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <main>
      <section><Hero/></section>
      <section><Footer/></section>
    </main>
    </>
  )
}

export default App
