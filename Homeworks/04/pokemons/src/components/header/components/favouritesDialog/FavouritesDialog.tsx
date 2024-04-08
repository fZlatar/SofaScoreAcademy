import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import styles from './FavouritesDialog.module.css'
import PokemonContext from '../../../../context/PokemonContext'
import PokemonCard from './components/PokemonCard'
import Pokemon from '../../../../model/pokemon'
import { motion } from 'framer-motion'

const backdropVariants = {
    hidden: {
        opacity: 0,
        transition: {
            duration: 0.5,
            when: 'beforeChildren',
        },
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
            when: 'afterChildren',
        },
    },
}

const modalVariants = {
    hidden: {
        y: '100%',
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

function FavouritesDialog({ setOpen }: { setOpen: (b: boolean) => void }) {
    const { pokemons, setPokemons } = useContext(PokemonContext)
    const [favoritePokemons, setFavouritePokemons] = useState<Pokemon[]>(
        pokemons.filter((p) => p.favourite)
    )
    const dialogRef = useRef<HTMLDivElement>(null)

    const onClose = useCallback(() => {
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
    }, [setPokemons, setOpen, favoritePokemons])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dialogRef.current &&
                !dialogRef.current.contains(event.target as Node)
            ) {
                onClose()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [onClose, setOpen])

    if (favoritePokemons.length === 0) {
        return (
            <motion.div
                className={styles.conteiner}
                key="backdrop"
                variants={backdropVariants}
                animate="visible"
                initial="hidden"
                exit="hidden"
            >
                <motion.div
                    className={styles.dialog_empty}
                    ref={dialogRef}
                    key="modal"
                    variants={modalVariants}
                    animate="visible"
                    initial="hidden"
                    exit="hidden"
                >
                    <h2>Not one pokemon was selecterd as favourite</h2>
                </motion.div>
            </motion.div>
        )
    }

    return (
        <motion.div
            className={styles.conteiner}
            key="backdrop"
            variants={backdropVariants}
            animate="visible"
            initial="hidden"
            exit="hidden"
        >
            <motion.div
                className={styles.dialog}
                ref={dialogRef}
                key="modal"
                variants={modalVariants}
                animate="visible"
                initial="hidden"
                exit="hidden"
            >
                {favoritePokemons.map((p) => (
                    <PokemonCard
                        key={p.id}
                        id={p.id}
                        setPokemons={setFavouritePokemons}
                    />
                ))}
            </motion.div>
        </motion.div>
    )
}

export default FavouritesDialog
