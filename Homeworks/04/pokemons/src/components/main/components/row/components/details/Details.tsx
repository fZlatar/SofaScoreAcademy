import { useContext } from 'react'
import Type from './components/type/Type'
import styles from './Details.module.css'
import PokemonContext from '../../../../../../context/PokemonContext'

function Details({ id }: { id: number }) {
    const { pokemons } = useContext(PokemonContext)
    const pokemon = pokemons.find((p) => p.id === id)!

    const name: string = `#${pokemon.id.toString().padStart(4, '0')} ${
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
    }`

    return (
        <div className={styles.conteiner}>
            <h1>{name}</h1>
            <div className={styles.details}>
                <div className={styles.stats}>
                    <span>
                        <strong>Health Points:</strong> {pokemon.health} HP
                    </span>
                    <span>
                        <strong>Height:</strong> {pokemon.height * 10} cm
                    </span>
                    <span>
                        <strong>Weight:</strong> {pokemon.weight} kg
                    </span>
                    <span>
                        <strong>Type: </strong>
                        {pokemon.types.map((t) => (
                            <Type type={t} key={t} />
                        ))}
                    </span>
                    <span>
                        <strong>Details:</strong> {pokemon.details}
                    </span>
                </div>
                <div className={styles.evolutions}>
                    <span>
                        <strong>Full view:</strong>
                    </span>
                    <div className={styles.pictures}>
                        <img src={pokemon.overview.front} alt="Front" />
                        <img src={pokemon.overview.back} alt="Back" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details
