import { useContext, useEffect, useState } from 'react'
import { getPokemons } from '../../api/api.ts'
import Row from './components/row/Row'
import PokemonContext from '../../context/PokemonContext.tsx'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from './components/loader/Loader.tsx'

function Main() {
    const { pokemons, setPokemons } = useContext(PokemonContext)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [count, setCount] = useState<number>(0)

    useEffect(() => {
        async function fetchPokemons() {
            try {
                const [fetchedPokemons, total] = await getPokemons(10, 0)
                setPokemons(fetchedPokemons)
                setCount(fetchedPokemons.length)
                setHasMore(fetchedPokemons.length < total)
            } catch (error) {
                console.error(error)
            }
        }

        fetchPokemons()
    }, [setPokemons])

    const fetchMoreData = async () => {
        try {
            const [fetchedPokemons] = await getPokemons(10, count)
            setPokemons([...pokemons, ...fetchedPokemons])
            setCount((c) => c + fetchedPokemons.length)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <main>
            <InfiniteScroll
                dataLength={count}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<Loader />}
            >
                {pokemons.map((p, i) => (
                    <Row
                        orientation={i % 2 === 1 ? 'right' : 'left'}
                        id={p.id}
                        key={p.id}
                    />
                ))}
            </InfiniteScroll>
        </main>
    )
}

export default Main
