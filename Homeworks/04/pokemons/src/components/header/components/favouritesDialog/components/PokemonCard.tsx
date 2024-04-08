import styles from './PokemonCard.module.css'
import { Heart } from 'lucide-react'
import Pokemon from '../../../../../model/pokemon'
import { useContext } from 'react'
import PokemonContext, {
    PokemonCtx,
} from '../../../../../context/PokemonContext'
import { AnimatePresence, motion } from 'framer-motion'

const imageVariants = {
    hidden: {
        rotate: 0,
        opacity: 0,
        transition: {
            duration: 0.5,
        },
    },
    visible: {
        rotate: 360,
        opacity: 1,
        transition: {
            delay: 0.5,
            duration: 0.5,
        },
    },
}

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
                <motion.button
                    onClick={() => setFavourite()}
                    whileHover={{ scale: 1.1 }}
                >
                    <Heart
                        className={`${styles.heart} ${
                            pokemon.favourite ? styles.favourite : ''
                        }`.trim()}
                    />
                </motion.button>
            </div>
            <div className={styles.image}>
                <AnimatePresence mode="wait" initial={false}>
                    {pokemon.favourite ? (
                        <motion.img
                            src={pokemon.image_shiny}
                            alt={pokemon.name}
                            key={pokemon.image_shiny}
                            variants={imageVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                        />
                    ) : (
                        <motion.img
                            src={pokemon.image}
                            alt={pokemon.name}
                            key={pokemon.image}
                            variants={imageVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                        />
                    )}
                </AnimatePresence>
            </div>
            <h2>{name}</h2>
        </div>
    )
}

export default PokemonCard
