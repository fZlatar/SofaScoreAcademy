import Picture from './components/picture/Picture'
import Details from './components/details/Details';
import './Row.css'

type Orientation = 'left' | 'right';

function Row({orientation}: {orientation: Orientation}) {
    
    return (
        <div className={`row ${orientation}`}>
            <Picture orientation={orientation}/>
            <Details />
        </div>
    )
}

export default Row