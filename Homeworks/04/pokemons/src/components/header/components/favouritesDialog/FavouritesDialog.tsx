import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import styles from './FavouritesDialog.module.css'
import PokemonContext from '../../../../context/PokemonContext'
import PokemonCard from './components/PokemonCard'
import Pokemon from '../../../../model/pokemon'

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
            <div className={styles.conteiner}>
                <div className={styles.dialog_empty} ref={dialogRef}>
                    <h2>Not one pokemon was selecterd as favourite</h2>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.conteiner}>
            <div className={styles.dialog} ref={dialogRef}>
                {favoritePokemons.map((p) => (
                    <PokemonCard
                        key={p.id}
                        id={p.id}
                        setPokemons={setFavouritePokemons}
                    />
                ))}
            </div>
        </div>
    )
}

export default FavouritesDialog
