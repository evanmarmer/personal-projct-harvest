import './TrackerRow.css'

export default function trackerRow(props){
    
        return (
            <>
             <tr className="tr">
                <td className="td">{ props.species }</td>
                <td className="td">{props.totalHarvest}</td>
            </tr>
            </>
        )
    }