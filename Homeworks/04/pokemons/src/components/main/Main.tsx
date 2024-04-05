import { useEffect, useState } from 'react'
import { getPokemons } from '../../api/api.ts'
import Row from './components/row/Row'
import Pokemon from '../../model/pokemon.ts'

function Main() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([])

    useEffect(() => {
        async function fetchPokemons() {
            try {
                const fetchedPokemons = await getPokemons(10, 0)
                fetchedPokemons.sort((a, b) => a.id - b.id)
                setPokemons(fetchedPokemons)
                console.log(fetchedPokemons)
            } catch (error) {
                console.error(error)
            }
        }

        fetchPokemons()
    }, [])

    return (
        <main>
            {pokemons.map((p, i) => (
                <Row
                    orientation={i % 2 === 1 ? 'right' : 'left'}
                    pokemon={p}
                    key={p.id}
                />
            ))}
        </main>
    )
}

export default Main
