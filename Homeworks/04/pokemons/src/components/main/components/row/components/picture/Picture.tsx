import { useContext, useEffect, useState } from 'react'
import styles from './Picture.module.css'
import { Heart } from 'lucide-react'
import PokemonContext from '../../../../../../context/PokemonContext'
import { motion, AnimatePresence } from 'framer-motion'

type Orientation = 'left' | 'right'

const pictureVariants = {
    hiddenLeft: {
        x: '-200%',
        transition: {
            duration: 0.5,
        },
    },
    hiddenRight: {
        x: '200%',
        transition: {
            duration: 0.5,
        },
    },
    visible: {
        x: 0,
        transition: {
            delay: 0.5,
            duration: 0.5,
        },
    },
}

function Picture({
    orientation,
    id,
}: {
    orientation: Orientation
    id: number
}) {
    const { pokemons, setPokemons } = useContext(PokemonContext)
    let pokemon = pokemons.find((p) => p.id === id)!
    const [loaded, setLoaded] = useState<boolean>(false)

    const [c1, c2, c3, c4] = getClassNames(orientation)

    useEffect(() => {}, [pokemon.favorite])

    const toggleFavorite = () => {
        const newFavorite = !pokemon.favorite
        const updatedPokemon = { ...pokemon, favorite: newFavorite }
        pokemon = updatedPokemon
        setPokemons((prev) =>
            prev.map((p) => (p.id === updatedPokemon.id ? updatedPokemon : p))
        )
        return newFavorite
    }

    return (
        <div className={c1}>
            <AnimatePresence
                mode="wait"
                onExitComplete={() => setLoaded(false)}
            >
                <motion.img
                    src={pokemon.favorite ? pokemon.image_shiny : pokemon.image}
                    alt={pokemon.name}
                    key={pokemon.favorite ? pokemon.image_shiny : pokemon.image}
                    variants={pictureVariants}
                    initial={
                        orientation === 'left' ? 'hiddenRight' : 'hiddenLeft'
                    }
                    animate={loaded ? 'visible' : 'hidden'}
                    exit={orientation === 'left' ? 'hiddenRight' : 'hiddenLeft'}
                    onLoad={() => setLoaded(true)}
                />
            </AnimatePresence>
            <motion.button
                className={c4}
                onClick={() => toggleFavorite()}
                whileHover={{ scale: 1.1 }}
            >
                <Heart className={pokemon.favorite ? c3 : c2} />
            </motion.button>
        </div>
    )
}

function getClassNames(
    orientation: Orientation
): [string, string, string, string] {
    const className1: string = `${styles.container} ${
        orientation === 'left' ? styles.left : styles.right
    }`.trim()
    const className2: string = `${styles.icon}`.trim()
    const className3: string = `${styles.icon} ${styles.favorite}`.trim()
    const className4: string = `${styles.icon_button} ${
        orientation === 'left' ? styles.left : styles.right
    }`
    return [className1, className2, className3, className4]
}

export default Picture
