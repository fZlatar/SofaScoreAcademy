import {
    PokemonListResponse,
    PokemonResponse,
    SpeciesResponse,
} from '../model/fetchResult'
import Pokemon from '../model/pokemon'

export const urlPokemons = 'https://pokeapi.co/api/v2/pokemon/'

export async function getPokemons(
    amount: number,
    offset: number
): Promise<[Pokemon[], number]> {
    const params = new URLSearchParams({
        limit: amount.toString(),
        offset: offset.toString(),
    })
    const response = await fetch(`${urlPokemons}?${params}`)
    if (response.ok) {
        const result: PokemonListResponse = await response.json()
        const pokemons: Pokemon[] = []
        await Promise.all(
            result.results.map(async (r) => {
                try {
                    const pokemon = await getPokemon(r.url)
                    pokemons.push(pokemon)
                } catch (error) {
                    console.error(error)
                }
            })
        )

        pokemons.sort((a, b) => a.id - b.id)
        return [pokemons, result.count]
    } else {
        throw new Error('Failed to fetch pokemons')
    }
}

export async function getPokemon(url: string): Promise<Pokemon> {
    const response = await fetch(url)
    if (response.ok) {
        const result: PokemonResponse = await response.json()
        let details: string | undefined = undefined
        try {
            details = await getFlavorText(result.species.url)
        } catch (error) {
            console.error(error)
        }
        const pokemon: Pokemon = {
            favourite: false,
            name: result.name,
            id: result.id,
            height: result.height,
            weight: result.weight,
            health: result.stats.find((s) => s.stat.name === 'hp')?.base_stat,
            types: result.types.map((t) => t.type.name),
            details: details,
            image: result.sprites.other['official-artwork'].front_default,
            overview: {
                front: result.sprites.front_default,
                back: result.sprites.back_default,
            },
        }
        return pokemon
    } else {
        throw new Error('Failed to fetch pokemon')
    }
}

export async function getFlavorText(url: string): Promise<string | undefined> {
    const response = await fetch(url)
    if (response.ok) {
        const result: SpeciesResponse = await response.json()
        return result.flavor_text_entries.find((f) => f.language.name === 'en')
            ?.flavor_text
    } else {
        throw new Error('Failed to fetch flavor text')
    }
}
