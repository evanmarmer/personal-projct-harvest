import App from './App.jsx';
import { useState, useEffect } from 'react'
import axios from 'axios'
import Post from './Post.jsx';
import './Home.css';


export default function Home(){
    const [harvestPosts, setHarvestPosts] = useState([])
    const [totalHarvest, setTotalHarvest] = useState({})
    const [isMakingPost, setIsMakingPost] = useState(false)
    const [speciesInput, setSpeciesInput] = useState('')
    const [harvestInput, setHarvestInput] = useState('')
    const [speciesHarvestInput, setSpeciesHarvestInput] = useState([{species:"", harvested:""}])
    const [storyInput, setStoryInput] = useState('')
    const [img, setImg] = useState([])
    

    // console.log(harvestPosts)
    // console.log(speciesHarvestInput)

    function createTotalHarvestObjOutOfPosts(posts) { 
        let sumObj = {}
        for (let i = 0; i < posts.length; i++) {
            for (let k = 0; k < posts[i].species.length; k++){
                // console.log(response.data[i].species[k].HuntsSpeciesHarvests.harvested)
                // console.log(response.data[i].species[k].species)
                //if it exists add to it
                if (sumObj[posts[i].species[k].species]){
                    sumObj[posts[i].species[k].species] += posts[i].species[k].HuntsSpeciesHarvests.harvested
                //if it doesnt exist create it
                } else {
                    sumObj[posts[i].species[k].species] = posts[i].species[k].HuntsSpeciesHarvests.harvested
                }
            }
        }
    
        return sumObj
    }


    useEffect(() => {
      axios.get('/posts')
      .then((response) => {
          setHarvestPosts(response.data)
        
          setTotalHarvest(createTotalHarvestObjOutOfPosts(response.data))
      })
    }, [])
   
    function onNewPostClickHandler() {
        setIsMakingPost(true)
    } 


    function onSaveClickHandler(e) {
        e.preventDefault()
        let maBod = {
            species: speciesHarvestInput.species,
            harvest: speciesHarvestInput.harvested,
            // species: speciesInput,
            // harvest: harvestInput,
            story: storyInput,
        }
    


        axios.post('/post', maBod)
        .then((response) => {
            setTotalHarvest(createTotalHarvestObjOutOfPosts(response.data))
           setHarvestPosts(response.data)
            setIsMakingPost(false)
            // setSpeciesInput('')
            // setHarvestInput('')
            setSpeciesHarvestInput([{species:"", harvested:""}])
            setStoryInput('')
        })
      }
      
    //  console.log(harvestPosts);

    function handleAddSpeciesClick(e){
        e.preventDefault()
        setSpeciesHarvestInput([...speciesHarvestInput,{species:"", harvested:""}])
    }

    function handleAddSpeciesdelete(i){
        const deleteVal = [...speciesHarvestInput]
        deleteVal.splice(i, 1)
        setSpeciesHarvestInput(deleteVal)
    }

      return (
          <>
        <div className="posts">
            <button className="newPostBtn" onClick={onNewPostClickHandler}>New Harvest</button>
            <div>
            { harvestPosts.toReversed().map((hunt) => {
                return <Post
                key = {hunt.id}
                species={hunt.species}
                story={hunt.story}
                totalHarvest={totalHarvest}
                harvestPosts={harvestPosts}
                setHarvestPosts={setHarvestPosts}
                huntId= {hunt.id}
                setSpeciesHarvestInput={setSpeciesHarvestInput}
                // setSpeciesInput={setSpeciesInput}
                // setHarvestInput={setHarvestInput}
                setStoryInput={setStoryInput}
                // speciesInput={speciesInput}
                // harvestInput={harvestInput}
                storyInput={storyInput}
                />
            })
        }
            </div>
        </div>
        {isMakingPost &&
        <div className="modal">
            <div className="modal-box">
             <form>
                <label htmlFor="img">Upload Image</label>
                <input type="file" onChange={e => setImg(URL.createObjectURL(e.target.files[0]))}/><br/>
                {/* <label htmlFor="species">Species</label>
                <input type="text" value={speciesInput} onChange={(e) => setSpeciesInput(e.target.value)} id="species"/>
                <label htmlFor="harvested">Harvested</label> */}
                {/* <input type="text" value={harvestInput} onChange={(e) => setHarvestInput(e.target.value)} id="harvested"/><br/> */}
                <div>
                {
                    speciesHarvestInput.map((val, i)=>
                    <div>
                        <label htmlFor="species">Species</label>
                        <input name="species" value={val.species} onChange={(e)=> handleAddSpeciesChange(e,i)}/>
                        <label htmlFor="harvested">Harvested</label>
                        <input name="harvested" value={val.harvested} onChange={(e)=> handleAddSpeciesChange(e,i)}/>
                        <button onClick={()=> handleAddSpeciesdelete(i)}>Delete Species</button>
                    </div>
                    )
                }
                </div>
                <button onClick={handleAddSpeciesClick}>Add Species to Hunt</button><br/>
                <label htmlFor="story">Story</label>
                <input type="text" value={storyInput} onChange={(e) => setStoryInput(e.target.value)} id="story"/><br/>
                {/* these two below are different ways of doing the same thing */}
                <button onClick={onSaveClickHandler}>Create Post</button>
                <button onClick={()=> setIsMakingPost(false)}>exit</button><br/>
            </form>
            </div>
            <div className="modal-background"></div>
        </div>
        }
        </>
    )
}


