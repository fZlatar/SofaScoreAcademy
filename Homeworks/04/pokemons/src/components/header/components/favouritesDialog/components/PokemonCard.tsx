import styles from './PokemonCard.module.css'
import { Heart } from 'lucide-react'
import Pokemon from '../../../../../model/pokemon'
import { useContext } from 'react'
import PokemonContext, {
    PokemonCtx,
} from '../../../../../context/PokemonContext'

function PokemonCard({
    id,
    setPokemons,
}: {
    id: number
    setPokemons: React.Dispatch<React.SetStateAction<Pokemon[]>>
}) {
    const { pokemons } = useContext<PokemonCtx>(PokemonContext)
    const pokemon = pokemons.find((p) => p.id === id)!

    const name: string = `#${pokemon.id.toString().padStart(4, '0')} ${
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
    }`

    const setFavourite = () => {
        pokemon.favourite = !pokemon.favourite
        setPokemons((prev) =>
            prev.map((p) => (p.id === pokemon.id ? { ...pokemon } : p))
        )
    }

    return (
        <div className={styles.conteiner}>
            <div className={styles.heart_conteiner}>
                <button onClick={() => setFavourite()}>
                    <Heart
                        className={`${styles.heart} ${
                            pokemon.favourite ? styles.favourite : ''
                        }`.trim()}
                    />
                </button>
            </div>
            <div className={styles.image}>
                <img src={pokemon.image} alt={pokemon.name} />
            </div>
            <h2>{name}</h2>
        </div>
    )
}

export default PokemonCard
