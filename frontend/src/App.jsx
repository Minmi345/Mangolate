import { useState, useEffect } from 'react'
import HomePage, { Sidebar } from './pages/sidebar'
import './pages/sidebar.css'
import './App.css'

function App() {
  return (
    <>
      <Sidebar/>
      waaa
    </>
  )
}

function Main() {


  const [message, setMessage] = useState(0)
  useEffect(() => {
    fetch('http://localhost:3001/api/message')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
  }, [])
  const [count, setCount] = useState(0)
  return (
    <>
      <p>{message}</p>
      <section id="center">
        <button
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

    </>
  )
}

export default App
