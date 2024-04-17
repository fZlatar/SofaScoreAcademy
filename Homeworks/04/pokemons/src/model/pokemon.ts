interface Pokemon {
    favorite: boolean
    name: string
    id: number
    height: number
    weight: number
    health: number | undefined
    types: string[]
    details: string | undefined
    image: string
    image_shiny: string
    overview: {
        front: string
        back: string
    }
    overview_shiny: {
        front: string
        back: string
    }
}

export default Pokemon
