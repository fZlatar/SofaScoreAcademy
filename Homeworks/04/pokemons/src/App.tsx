import Header from './components/header/Header'
import Main from './components/main/Main'
import './App.css'
import PokemonContext from './context/PokemonContext'
import { useState } from 'react'
import Pokemon from './model/pokemon'

function App() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([])

    return (
        <PokemonContext.Provider value={{ pokemons, setPokemons }}>
            <Header />
            <Main />
        </PokemonContext.Provider>
    )
}

export default App
