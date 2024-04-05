import Picture from './components/picture/Picture'
import Details from './components/details/Details'
import styles from './Row.module.css'
import Pokemon from '../../../../model/pokemon'

type Orientation = 'left' | 'right'

function Row({
    orientation,
    pokemon,
}: {
    orientation: Orientation
    pokemon: Pokemon
}) {
    const className: string = `${styles.row} ${
        orientation === 'right' ? styles.right : ''
    }`.trim()
    return (
        <div className={className}>
            <Picture orientation={orientation} pokemon={pokemon} />
            <Details pokemon={pokemon} />
        </div>
    )
}

export default Row
