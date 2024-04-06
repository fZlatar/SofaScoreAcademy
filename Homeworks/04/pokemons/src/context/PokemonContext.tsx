import { Context, createContext } from 'react'
import Pokemon from '../model/pokemon'

export interface PokemonCtx {
    pokemons: Pokemon[]
    setPokemons: (pokemons: Pokemon[]) => void
}

// eslint-disable-next-line react-refresh/only-export-components
const PokemonContext = createContext<PokemonCtx>({
    pokemons: [],
    setPokemons(pokemons) {
        this.pokemons = pokemons
    },
})

export default PokemonContext as Context<PokemonCtx>
