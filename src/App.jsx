import './App.css'
import Post from './Post.jsx'
import Tracker from './Tracker.jsx'
import { Link, Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import harvestLogo from '/harvest-logo2.png'

function App() {

 

  return (
    <>
      <header>
        <img className="img" src={harvestLogo}/>
      <ul>
        <li>
          <Link className="links" to="/">Home</Link>
        </li>
        <li>
          <Link className="links" to="/tracker">Tracker</Link>
        </li>
      </ul>
      </header>
      <Outlet/>
    </>
  )
}

export default App
