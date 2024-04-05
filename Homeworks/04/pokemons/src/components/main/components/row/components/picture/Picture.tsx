import Pokemon from '../../../../../../model/pokemon'
import Icon from '../../../../../icon/Icon'
import styles from './Picture.module.css'

type Orientation = 'left' | 'right'

function Picture({
    orientation,
    pokemon,
}: {
    orientation: Orientation
    pokemon: Pokemon
}) {
    const className1: string = `${styles.conteiner} ${
        orientation === 'left' ? styles.left : styles.right
    }`.trim()
    const className2: string = `${styles.icon} ${
        orientation === 'left' ? styles.left : styles.right
    }`.trim()

    return (
        <div className={className1}>
            <img src={pokemon.image} alt={pokemon.name} />
            <Icon className={className2} type={'heart'} />
        </div>
    )
}

export default Picture
