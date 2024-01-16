import Home from './Home.jsx';

export default function Post(props){
    
const speciesData = props.species.map(speciesObj => (
        <tr key= {speciesObj.id}>
            <td>{ speciesObj.species }</td>
            <td>{ speciesObj.HuntsSpeciesHarvests.harvested }</td>
            <td>{props.totalHarvest[speciesObj.species]}</td>
        </tr>
    ));

    // console.log(speciesData)

    return (
        <>
        <div className= 'card'>
            <div className= 'card-pic'>
                <img className= 'card-img' src='blahhhhhhh'/>
                <table>
                    <thead>
                        <tr>
                            <th>Species</th>
                            <th>Harvested</th>
                            <th>Lifetime Harvest</th>
                        </tr>
                    </thead>
                    <tbody>
                    { speciesData }
                    </tbody>
                    <thead>
                        <tr>
                            <th>Story</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{ props.story }</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}