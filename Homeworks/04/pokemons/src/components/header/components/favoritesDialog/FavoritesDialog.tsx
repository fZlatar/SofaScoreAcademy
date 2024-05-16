import { useContext, useState } from 'react'
import styles from './FavoritesDialog.module.css'
import PokemonContext from '../../../../context/PokemonContext'
import PokemonCard from './components/pokemonCard/PokemonCard'
import Pokemon from '../../../../model/pokemon'
import { motion } from 'framer-motion'

const backdropVariants = {
    hidden: {
        opacity: 0,
        transition: {
            duration: 0.2,
            when: 'afterChildren',
        },
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.2,
            when: 'beforeChildren',
        },
    },
}

const modalVariants = {
    hidden: {
        y: '200%',
        transition: {
            duration: 0.5,
        },
    },
    visible: {
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
}

function FavoritesDialog({ setOpen }: { setOpen: (b: boolean) => void }) {
    const { pokemons, setPokemons } = useContext(PokemonContext)
    const [favoritePokemons, setFavoritePokemons] = useState<Pokemon[]>(
        pokemons.filter((p) => p.favorite)
    )

    const onClose = () => {
        setPokemons((prev) => {
            return prev.map((p) => {
                const index = favoritePokemons.findIndex(
                    (pokemon) => pokemon.id === p.id
                )
                if (index !== -1) {
                    return favoritePokemons[index]
                }
                return p
            })
        })
        setOpen(false)
    }

    if (favoritePokemons.length === 0) {
        return (
            <motion.div
                className={styles.container}
                key="backdropEmpty"
                variants={backdropVariants}
                animate="visible"
                initial="hidden"
                exit="hidden"
                onClick={() => onClose()}
            >
                <motion.div
                    className={styles.dialog_empty}
                    key="modalEmpty"
                    variants={modalVariants}
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2>Not one pokemon was selected as favorite</h2>
                </motion.div>
            </motion.div>
        )
    }

    return (
        <motion.div
            className={styles.container}
            key="backdrop"
            variants={backdropVariants}
            animate="visible"
            initial="hidden"
            exit="hidden"
            onClick={() => onClose()}
        >
            <motion.div
                className={styles.dialog}
                key="modal"
                variants={modalVariants}
                onClick={(e) => e.stopPropagation()}
            >
                {favoritePokemons.map((p) => (
                    <PokemonCard
                        key={p.id}
                        id={p.id}
                        setPokemons={setFavoritePokemons}
                    />
                ))}
            </motion.div>
        </motion.div>
    )
}

export default FavoritesDialog
