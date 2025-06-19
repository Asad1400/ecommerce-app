import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Hero, Footer} from "./sections"

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
