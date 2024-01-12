import './App.css'
import Post from './Post.jsx'
import Tracker from './Tracker.jsx'
import { Link, Outlet } from 'react-router-dom'
// import { useState, useEffect } from 'react'
// import axios from 'axios'

function App() {

  return (
    <>
      <header>
        <div>Harvest</div>
        <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/tracker">Tracker</Link>
        </li>
      </ul>
      </header>
      <Outlet/>
    </>
  )
}

export default App
