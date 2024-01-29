import Home from './Home.jsx';
import './Post.css';
import axios from 'axios'
import { useState } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import Carousel from 'react-bootstrap/Carousel';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';




export default function Post(props){

    let [isEditing, setIsEditing] = useState(false)
    const [speciesHarvestInput, setSpeciesHarvestInput] = useState([])

    function handleEditClick(){

        let newSpeciesHarvestInput = structuredClone(props.species)

        for (let i = 0; i < newSpeciesHarvestInput.length; i++) {
            newSpeciesHarvestInput[i].oldSpeciesName = newSpeciesHarvestInput[i].species
        }

        // console.log('jheyyyyy')
        // console.log(newSpeciesHarvestInput)

        setSpeciesHarvestInput(newSpeciesHarvestInput)
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
        // console.log(maBod)
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
            ? <div className="modal-wrapper">
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
                <DropdownButton className="hamburger"
                    align="end"
                    title=""
                    id="dropdown-menu-align-end"
                >
                    <Dropdown.Item eventKey="1">
                        <div className="btns">
                            <button className="btn1" onClick={handleDeleteClick}>Delete</button>
                            <button className="btn2" onClick={handleEditClick}>Edit</button>
                        </div>
                    </Dropdown.Item>
                </DropdownButton>
                <Carousel interval={null}>
                    <Carousel.Item>
                        <img className='card-img' src='https://www.shutterstock.com/image-photo/silhouette-red-deer-stag-mist-600nw-307943279.jpg'/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className='card-img' src='https://projectupland.com/wp-content/uploads/2020/11/A-Guide-to-Pheasant-Hunting-in-North-America-1600x1290.jpg'/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className='card-img' src='https://images.ctfassets.net/pujs1b1v0165/2jodACsV7Pa57M6wWHVI2R/7d10fbf6d4f189ad34f5619170c0ad85/public_land_deer_hunting.jpg?w=1280'/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className='card-img' src='https://images.newrepublic.com/ac4bb53a9544ef31698db7d960c759add238cd60.jpeg'/>
                    </Carousel.Item>
                </Carousel>

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
                    </table>
                        <Accordion>
                           <Accordion.Item eventKey="0">
                               <Accordion.Header className='storyHeader'>Story</Accordion.Header>
                                   <Accordion.Body>
                                           <div colSpan="3">{ props.story }</div>
                                   </Accordion.Body>
                                </Accordion.Item>
                           </Accordion>
            </div>
        }
        </>
    )
}