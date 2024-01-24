import Home from './Home.jsx';
import './Post.css';
import axios from 'axios'
import { useState } from 'react'

export default function Post(props){

    let [isEditing, setIsEditing] = useState(false)
    const [speciesHarvestInput, setSpeciesHarvestInput] = useState([])

    function handleEditClick(){
        setSpeciesHarvestInput(props.species)
        props.setStoryInput(props.story)
        setIsEditing(!isEditing)
    }
    // console.log(props.species)

    function onEditFieldsChange(e, i, property){
        let newSpeciesHarvestInput = structuredClone(speciesHarvestInput)

        if (property === 'species') {
            newSpeciesHarvestInput[i].species = e.target.value
        } else if (property === 'harvested') {
            newSpeciesHarvestInput[i].HuntsSpeciesHarvests.harvested = e.target.value
        }

        setSpeciesHarvestInput(newSpeciesHarvestInput)
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
        let maBod = {
            huntId: props.huntId,
            storyInput: props.storyInput,
            speciesHarvestInput: speciesHarvestInput
        }
        console.log(maBod)
        axios.put(`/edit-post`, maBod)
        .then((response) => {
            // console.log(response.data);
            setIsEditing(false)
            props.setHarvestPosts(response.data)
        })
    }

    
    return (
        <>
        { isEditing 
            ? <div className="modal">
                <div className="modal-box">
                    <form>
                    { speciesHarvestInput.map((shObj, i) => {
                        return (
                        <>
                            <label htmlFor="species">Species</label>
                            <input type="text" value={ shObj.species } onChange={(e) => onEditFieldsChange(e, i, 'species')} id="species"/><br/>
                            <label htmlFor="harvested">Harvested</label>
                            <input type="text" value={shObj.HuntsSpeciesHarvests.harvested} onChange={(e) => onEditFieldsChange(e, i, 'harvested')} id="harvested"/><br/>
                        </>
                            )
                         })
                    }
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