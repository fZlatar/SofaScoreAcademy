import Picture from './components/picture/Picture'
import Details from './components/details/Details'
import styles from './Row.module.css'

type Orientation = 'left' | 'right'

function Row({ orientation, id }: { orientation: Orientation; id: number }) {
    const className: string = `${styles.row} ${
        orientation === 'right' ? styles.right : ''
    }`.trim()

    return (
        <div className={className}>
            <Picture orientation={orientation} id={id} />
            <Details id={id} />
        </div>
    )
}

export default Row
