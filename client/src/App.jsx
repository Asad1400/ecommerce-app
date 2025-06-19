import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='flex'>
      <h1 className='text-3xl font-bold bg-red-500'>Hello</h1>
      <h1 className='text-xl'>Ahmad</h1>
    </div>

    </>
  )
}

export default App
