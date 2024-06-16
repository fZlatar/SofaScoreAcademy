import { EventDetails } from '@/models/event'
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from 'react'

interface ContextValue {
    favorites: EventDetails[]
    removeFavorite: (id: number) => void
    addFavorite: (favorite: EventDetails) => void
    isFavorite: (id: number) => boolean
}

const FavoriteContext = createContext<ContextValue>({} as ContextValue)

export const FavoriteContextProvider = ({ children }: PropsWithChildren) => {
    const [favorites, setFavorites] = useState<EventDetails[]>([])

    const removeFavorite = (id: number) => {
        setFavorites(favorites.filter(f => f.id !== id))
    }

    const addFavorite = (favorite: EventDetails) => {
        if (!isFavorite(favorite.id)) {
            setFavorites([...favorites, favorite])
        }
    }

    const isFavorite = (id: number) => {
        if (favorites.find(f => f.id === id)) {
            return true
        }
        return false
    }

    return (
        <FavoriteContext.Provider value={{ favorites, removeFavorite, addFavorite, isFavorite }}>
            {children}
        </FavoriteContext.Provider>
    )
}

export const useFavoritesContext = () => useContext(FavoriteContext)
