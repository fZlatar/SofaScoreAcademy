import { useContext, useState } from 'react'
import styles from './Picture.module.css'
import { Heart } from 'lucide-react'
import PokemonContext from '../../../../../../context/PokemonContext'

type Orientation = 'left' | 'right'

function Picture({
    orientation,
    id,
}: {
    orientation: Orientation
    id: number
}) {
    const { pokemons, setPokemons } = useContext(PokemonContext)
    const pokemon = pokemons.find((p) => p.id === id)!

    const [favourite, setFavourite] = useState<boolean>(pokemon.favourite)

    const [c1, c2, c3, c4] = getClassNames(orientation)

    const togleFavourite = () => {
        setFavourite((f) => !f)
        pokemon.favourite = !favourite

        setPokemons(
            pokemons.map((p) => {
                if (p.id === id) {
                    return pokemon
                }
                return p
            })
        )
    }

    return (
        <div className={c1}>
            <img src={pokemon.image} alt={pokemon.name} />
            <button className={c4} onClick={() => togleFavourite()}>
                <Heart className={favourite ? c3 : c2} />
            </button>
        </div>
    )
}

function getClassNames(
    orientation: Orientation
): [string, string, string, string] {
    const className1: string = `${styles.conteiner} ${
        orientation === 'left' ? styles.left : styles.right
    }`.trim()
    const className2: string = `${styles.icon}`.trim()
    const className3: string = `${styles.icon} ${styles.favourite}`.trim()
    const className4: string = `${styles.icon_button} ${
        orientation === 'left' ? styles.left : styles.right
    }`
    return [className1, className2, className3, className4]
}

export default Picture
