import Home from './Home.jsx';
import './Post.css';
import axios from 'axios'
import { useState } from 'react'

export default function Post(props){

    let [isEditing, setIsEditing] = useState(false)

    function handleEditClick(){
        props.setSpeciesInput(props.species[0].species)
        props.setHarvestInput(props.species[0].HuntsSpeciesHarvests.harvested)
        props.setStoryInput(props.story)
        setIsEditing(!isEditing)
    }
    
const speciesData = props.species.map(speciesObj => (
    <tr key= {speciesObj.id}>
            <td>{ speciesObj.species }</td>
            <td>{ speciesObj.HuntsSpeciesHarvests.harvested }</td>
            <td>{props.totalHarvest[speciesObj.species]}</td>
        </tr>
    ));
    

    
    async function handleDeleteClick() {
        // console.log(props.huntId)
        let response = await axios.delete(`/post/${props.huntId}`)
        // console.log(response.data)
        props.setHarvestPosts(response.data)
    }
    
    function onSaveClick(e){
        e.preventDefault()
        axios.put(`/edit-post/${props.speciesInput}/${props.harvestInput}/${props.storyInput}/${props.huntId}`)
        .then((response) => {
            // console.log(response.data);
            setIsEditing(false)
            props.setHarvestPosts(response.data)
        })
    }
    // console.log(props.species)
    return (
        <>
        { isEditing 
            ? <div className="modal">
                <div className="modal-box">
                    <form>
                        <label htmlFor="species">Species</label>
                        <input type="text" value={ props.speciesInput } onChange={(e) => props.setSpeciesInput(e.target.value)} id="species"/><br/>
                        <label htmlFor="harvested">Harvested</label>
                        <input type="text" value={props.harvestInput} onChange={(e) => props.setHarvestInput(e.target.value)} id="harvested"/><br/>
                        <label htmlFor="story">Story</label>
                        <input type="text" value={props.storyInput} onChange={(e) => props.setStoryInput(e.target.value)} id="story"/><br/>
                        <button onClick={onSaveClick}>Save</button>
                    </form>
                </div>
                <div className="modal-background"></div>
            </div>

            :<div className= 'card'>
                <div className= 'card-pic'>
                    <img className='card-img' src='https://www.shutterstock.com/image-photo/silhouette-red-deer-stag-mist-600nw-307943279.jpg'/>
                </div>
                    <table className="table">
                        <thead>
                            <tr className="top-row">
                                <th>Species</th>
                                <th>Harvested</th>
                                <th>Lifetime Harvest</th>
                            </tr>
                        </thead>
                        <tbody className="species-data">
                        { speciesData }
                        </tbody>
                        <thead>
                            <tr>
                                <th className="story" colspan="3">Story</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td colspan="3">{ props.story }</td>
                        </tr>
                        <div className="btns">
                            <button onClick={handleDeleteClick}>Delete</button>
                            <button onClick={handleEditClick}>Edit</button>
                        </div>
                        </tbody>
                    </table>
            </div>
        }
        </>
    )
}