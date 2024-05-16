import { Context, createContext } from 'react'
import Pokemon from '../model/pokemon'

export interface PokemonCtx {
    pokemons: Pokemon[]
    setPokemons: React.Dispatch<React.SetStateAction<Pokemon[]>>
}

// eslint-disable-next-line react-refresh/only-export-components
const PokemonContext = createContext<PokemonCtx>({
    pokemons: [],
    setPokemons: () => {
        throw new Error('setPokemons function must be overridden')
    },
})

export default PokemonContext as Context<PokemonCtx>
