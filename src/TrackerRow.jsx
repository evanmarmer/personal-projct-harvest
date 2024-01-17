export default function trackerRow(props){
    
    const speciesData = props.species.map(speciesObj => (
        <tr>
            <td>{ speciesObj.species }</td>
            <td>{props.totalHarvest[speciesObj.species]}</td>
        </tr>
    ));
   

        return (
            <>
             <tr>
                   {speciesData} 
            </tr>
            </>
        )
    }