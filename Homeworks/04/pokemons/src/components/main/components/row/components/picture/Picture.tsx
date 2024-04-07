import { useContext, useEffect } from 'react'
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
    let pokemon = pokemons.find((p) => p.id === id)!

    const [c1, c2, c3, c4] = getClassNames(orientation)

    useEffect(() => {}, [pokemon.favourite])

    const togleFavourite = () => {
        const newFavourite = !pokemon.favourite
        const updatedPokemon = { ...pokemon, favourite: newFavourite }
        pokemon = updatedPokemon
        setPokemons((prev) =>
            prev.map((p) => (p.id === updatedPokemon.id ? updatedPokemon : p))
        )
        return newFavourite
    }

    return (
        <div className={c1}>
            <img src={pokemon.image} alt={pokemon.name} />
            <button className={c4} onClick={() => togleFavourite()}>
                <Heart className={pokemon.favourite ? c3 : c2} />
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
