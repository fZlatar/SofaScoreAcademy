import { useContext, useState } from 'react'
import Type from './components/type/Type'
import styles from './Details.module.css'
import PokemonContext from '../../../../../../context/PokemonContext'
import { AnimatePresence, motion } from 'framer-motion'

const overviewVariants = {
    hidden: {
        opacity: 0,
        transition: {
            duration: 0.5,
        },
    },
    visible: {
        opacity: 1,
        transition: {
            delay: 0.5,
            duration: 0.5,
            ease: 'easeInOut',
        },
    },
}

function Details({ id }: { id: number }) {
    const { pokemons } = useContext(PokemonContext)
    const pokemon = pokemons.find((p) => p.id === id)!
    const [loadedFront, setLoadedFront] = useState<boolean>(false)
    const [loadedBack, setLoadedBack] = useState<boolean>(false)

    const name: string = `#${pokemon.id.toString().padStart(4, '0')} ${
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
    }`

    return (
        <div className={styles.container}>
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
                    <AnimatePresence
                        mode="wait"
                        onExitComplete={() => {
                            setLoadedFront(false)
                            setLoadedBack(false)
                        }}
                    >
                        <motion.div
                            className={styles.pictures}
                            key={pokemon.favorite ? 'shiny' : 'normal'}
                            variants={overviewVariants}
                            initial="hidden"
                            animate={
                                loadedFront && loadedBack ? 'visible' : 'hidden'
                            }
                            exit="hidden"
                        >
                            <img
                                src={
                                    pokemon.favorite
                                        ? pokemon.overview_shiny.front
                                        : pokemon.overview.front
                                }
                                alt="Front"
                                onLoad={() => setLoadedFront(true)}
                            />
                            <img
                                src={
                                    pokemon.favorite
                                        ? pokemon.overview_shiny.back
                                        : pokemon.overview.back
                                }
                                alt="Back"
                                onLoad={() => setLoadedBack(true)}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
export default Details
