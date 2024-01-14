import App from './App.jsx';
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Home(){
    const [harvestPosts, setHarvestPosts] = useState([])
    console.log(harvestPosts)

    useEffect(() => {
      axios.get('/posts')
      .then((response) => {
          setHarvestPosts(response.data)
      })
  }, [])
   
    function onNewPostClickHandler() {
        setIsMakingNewPost(true)
    } 
    
    return (
        <>
        <div>
            <button onClick={onNewPostClickHandler}>New Harvest</button>
            <p>No Posts Yet</p>
            <div>
            {/* { harvestPosts.map((postsArr) => {
              return <Post
                  species={postsArr.species}
                  harvested={postsArr.harvested}
                  story={postsArr.story}
                  setHarvestPosts={setHarvestPosts}
                />
               })
            } */}
            </div>
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

