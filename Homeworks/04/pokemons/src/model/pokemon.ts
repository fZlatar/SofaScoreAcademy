import { Types } from '../components/main/components/row/components/details/components/type/Type'

interface Pokemon {
    favourite: boolean
    name: string
    id: number
    height: number
    weight: number
    health: number | undefined
    types: Types[]
    details: string | undefined
    image: string
    overview: {
        front: string
        back: string
    }
}

export default Pokemon
