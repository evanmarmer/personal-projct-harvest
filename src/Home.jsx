import App from './App.jsx';
import { useState, useEffect } from 'react'
import axios from 'axios'
import Post from './Post.jsx';
import './Home.css';


export default function Home(){
    const [harvestPosts, setHarvestPosts] = useState([])

    const [totalHarvest, setTotalHArvest] = useState({})

    const [isMakingPost, setIsMakingPost] = useState(false)


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
        setIsMakingPost(true)
    } 

    function onSaveClickHandler() {
        let maBod = {
            ,
        }
        axios.post('/post')
        .then((response) => {
            setSpeciesData(response.data)
            setIsMakingPost(false)
            setSpeciesInput('')
        })
      }
    
    return (
        <>
        <div>
            <button onClick={onNewPostClickHandler}>New Harvest</button>
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
        {isMakingPost &&
        <div className="modal">
            <div className="modal-box">
             <form>
                 {/* <label for="img">Place holder for image</label>
                <input type="image" id="img"/> */}
                <label htmlFor="species">Species</label>
                <input type="text" id="species"/><br/>
                <label htmlFor="harvested">Harvested</label>
                <input type="text" id="harvested"/><br/>
                <label htmlFor="story">story</label>
                <input type="text" id="story"/><br/>
                {/* these two below are different ways of doing the same thing */}
                <button onClick={onSaveClickHandler}>Create Post</button>
                <button onClick={()=> setIsMakingPost(false)}>exit</button>
            </form>
            </div>
            <div className="modal-background"></div>
        </div>
        }
        </>
    )
}

