export default function trackerRow(props){
    

   

        return (
            <>
             <tr>
                <td>{ props.species }</td>
                <td>{props.totalHarvest}</td>
            </tr>
            </>
        )
    }