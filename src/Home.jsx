import App from './App.jsx';
import { useState, useEffect } from 'react'



export default function Home(){
   
    function onNewPostClickHandler() {
        setIsMakingNewPost(true)
    } 
    
    return (
        <>
        <div>
      <button onClick={onNewPostClickHandler}>New Harvest</button>
      <p>No Posts Yet</p>
      </div>
        </>
    )
}