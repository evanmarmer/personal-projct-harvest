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
        <form>
            {/* <label for="img">Place holder for image</label>
            <input type="image" id="img"/> */}
            <label for="species">Species</label>
            <input type="text" id="species"/><br/>
            <label for="harvested">Harvested</label>
            <input type="text" id="harvested"/><br/>
            <span>Lifetime Harvest</span>
            <span> 0 </span><br/>
            <button>Add Species</button><br/>
            <p>Story</p>
        </form>
        </>
    )
}