import './Tracker.css'
import TrackerRow from './TrackerRow.jsx'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Tracker(){

  const [totalHarvest, setTotalHarvest] = useState({})

  useEffect(() => {
    axios.get('/posts')
    .then((response) => {
    //  console.log(response.data)
      let sumObj = {}
        for (let i = 0; i < response.data.length; i++) {
          // console.log(sumObj)
            for (let k = 0; k < response.data[i].species.length; k++){
                // console.log(response.data[i].species[k].HuntsSpeciesHarvests.harvested)
                // console.log(response.data[i].species[k].species)
                //if it exists add to it
                if (sumObj[response.data[i].species[k].species]){
                    sumObj[response.data[i].species[k].species] += response.data[i].species[k].HuntsSpeciesHarvests.harvested
                //if it doesnt exist create it
                } 
                else {
                    sumObj[response.data[i].species[k].species] = response.data[i].species[k].HuntsSpeciesHarvests.harvested
                }
            }
        }
          setTotalHarvest(sumObj)
    })
  }, [])

    return (
        <>
          <table>
            <thead>
              <tr>
                <th>Species</th>
                <th>Lifetime Harvest</th>
              </tr>
            </thead>
            <tbody>
            { Object.entries(totalHarvest).map((rowTuple) => {
              return <TrackerRow
                  species={rowTuple[0]}
                  totalHarvest={rowTuple[1]}
                />
               })
          }
            </tbody>
          </table>
        </>
    )
}