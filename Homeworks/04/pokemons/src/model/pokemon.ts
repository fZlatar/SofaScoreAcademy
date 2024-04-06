interface Pokemon {
    favourite: boolean
    name: string
    id: number
    height: number
    weight: number
    health: number | undefined
    types: string[]
    details: string | undefined
    image: string
    overview: {
        front: string
        back: string
    }
}

export default Pokemon
