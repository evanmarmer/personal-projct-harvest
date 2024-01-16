import App from './App.jsx';
import { useState, useEffect } from 'react'
import axios from 'axios'
import Post from './Post.jsx';

export default function Home(){
    const [harvestPosts, setHarvestPosts] = useState([])

    const [totalHarvest, setTotalHArvest] = useState({})

    useEffect(() => {
      axios.get('/posts')
      .then((response) => {
          setHarvestPosts(response.data)
        
          let sumObj = {}
        for (let i = 0; i < response.data.length; i++) {
            for (let k = 0; k < response.data[i].species.length; k++){
                // console.log(response.data[i].species[k].HuntsSpeciesHarvests.harvested)
                // console.log(response.data[i].species[k].species)
                //if it exists add to it
                if (sumObj[response.data[i].species[k].species]){
                    sumObj[response.data[i].species[k].species] += response.data[i].species[k].HuntsSpeciesHarvests.harvested
                //if it doesnt exist create it
                } else {
                    sumObj[response.data[i].species[k].species] = response.data[i].species[k].HuntsSpeciesHarvests.harvested
                }
            }
        }
          setTotalHArvest(sumObj)
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
            { harvestPosts.map((hunt) => {
              return <Post
                key = {hunt.id}
                  species={hunt.species}
                  story={hunt.story}
                  totalHarvest={totalHarvest}
                />
               })
            }
            </div>
        </div>
        <form>
            {/* <label for="img">Place holder for image</label>
            <input type="image" id="img"/> */}
            <label htmlFor="species">Species</label>
            <input type="text" id="species"/><br/>
            <label htmlFor="harvested">Harvested</label>
            <input type="text" id="harvested"/><br/>
            <span>Lifetime Harvest</span>
            <span> 0 </span><br/>
            <button>Add Species</button><br/>
            <p>Story</p>
        </form>
        </>
    )
}

