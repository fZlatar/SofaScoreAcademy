import styles from './PokemonCard.module.css'
import { Heart } from 'lucide-react'
import Pokemon from '../../../../../../model/pokemon'
import { useContext, useState } from 'react'
import PokemonContext, {
    PokemonCtx,
} from '../../../../../../context/PokemonContext'
import { AnimatePresence, motion } from 'framer-motion'

const imageVariants = {
    hidden: {
        rotate: 0,
        opacity: 0,
        scale: 0,
        transition: {
            duration: 0.5,
        },
    },
    visible: {
        rotate: 360,
        opacity: 1,
        scale: 1,
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
    const [loaded, setLoaded] = useState<boolean>(false)

    const name: string = `#${pokemon.id.toString().padStart(4, '0')} ${
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
    }`

    const setFavorite = () => {
        pokemon.favorite = !pokemon.favorite
        setPokemons((prev) =>
            prev.map((p) => (p.id === pokemon.id ? { ...pokemon } : p))
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.heart_container}>
                <motion.button
                    onClick={() => setFavorite()}
                    whileHover={{ scale: 1.1 }}
                >
                    <Heart
                        className={`${styles.heart} ${
                            pokemon.favorite ? styles.favorite : ''
                        }`.trim()}
                    />
                </motion.button>
            </div>
            <div className={styles.image}>
                <AnimatePresence
                    mode="wait"
                    onExitComplete={() => setLoaded(false)}
                >
                    <motion.img
                        src={
                            pokemon.favorite
                                ? pokemon.image_shiny
                                : pokemon.image
                        }
                        alt={pokemon.name}
                        key={
                            pokemon.favorite
                                ? pokemon.image_shiny
                                : pokemon.image
                        }
                        variants={imageVariants}
                        initial="hidden"
                        animate={loaded ? 'visible' : 'hidden'}
                        exit="hidden"
                        onLoad={() => setLoaded(true)}
                    />
                </AnimatePresence>
            </div>
            <h2>{name}</h2>
        </div>
    )
}

export default PokemonCard
