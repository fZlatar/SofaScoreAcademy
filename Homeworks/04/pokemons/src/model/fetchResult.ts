interface PokemonListResponse {
    count: number
    next: string | null
    previous: string | null
    results: NameUrl[]
}

interface PokemonResponse {
    abilities: {
        ability: NameUrl
        is_hidden: boolean
        slot: number
    }[]
    base_experience: number
    cries: {
        latest: string
        legacy: string
    }
    forms: NameUrl[]
    game_indices: {
        game_index: number
        version: NameUrl
    }[]
    height: number
    held_items: []
    id: number
    is_default: boolean
    location_area_encounters: string
    moves: {
        move: NameUrl
        version_group_details: {
            level_learned_at: number
            move_learn_method: NameUrl
            version_group: NameUrl
        }[]
    }[]
    name: string
    order: number
    past_abilities: []
    past_types: []
    species: NameUrl
    sprites: {
        back_default: string
        back_female: string | null
        back_shiny: string
        back_shiny_female: string | null
        front_default: string
        front_female: string | null
        front_shiny: string
        front_shiny_female: string | null
        other: {
            'official-artwork': {
                front_default: string
                front_shiny: string
            }
        }
    }
    stats: {
        base_stat: number
        effort: number
        stat: NameUrl
    }[]
    types: {
        slot: number
        type: NameUrl
    }[]
    weight: number
}

interface SpeciesResponse {
    base_happiness: number
    capture_rate: number
    color: NameUrl
    egg_groups: NameUrl[]
    evolution_chain: {
        url: string
    }
    evolves_from_species: NameUrl
    flavor_text_entries: {
        flavor_text: string
        language: NameUrl
        version: NameUrl
    }[]
    form_descriptions: []
    forms_switchable: boolean
    gender_rate: number
    genera: {
        genus: string
        language: NameUrl
    }[]
    generation: NameUrl
    growth_rate: NameUrl
    habitat: NameUrl
    has_gender_differences: boolean
    hatch_counter: number
    id: number
    is_baby: boolean
    is_legendary: boolean
    is_mythical: boolean
    name: string
    names: {
        language: NameUrl
        name: string
    }[]
    order: number
    pal_park_encounters: {
        area: NameUrl
        base_score: number
        rate: number
    }[]
    pokedex_numbers: {
        entry_number: number
        pokedex: NameUrl
    }[]
    shape: NameUrl
    varieties: {
        is_default: boolean
        pokemon: NameUrl
    }[]
}

interface NameUrl {
    name: string
    url: string
}

export type { PokemonListResponse, PokemonResponse, SpeciesResponse, NameUrl }
