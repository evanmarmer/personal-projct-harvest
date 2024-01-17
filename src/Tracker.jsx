import './Tracker.css'
import TrackerRow from './TrackerRow.jsx'

export default function Tracker(){

  const [harvestInfo, setHarvestInfo] = useState([])
  const [totalHarvest, setTotalHarvest] = useState([])

  useEffect(() => {
    axios.get('/posts')
    .then((response) => {
      setHarvestInfo(response.data)
      
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
            { harvestInfo.map((hunt) => {
              return <TrackerRow
                  species={hunt.species}
                  totalHarvest={totalHarvest}
                  setHarvestInfo={setHarvestInfo}
                />
               })
          }
            </tbody>
          </table>
        </>
    )
}