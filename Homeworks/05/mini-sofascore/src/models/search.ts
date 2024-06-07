export interface SearchTeam {
    id: number
    name: string
    sport: {
        id: number
        name: string
        slug: string
    }
    country: {
        id: number
        name: string
    }
}

export interface SearchPlayer {
    id: number
    name: string
    slug: string
    sport: {
        id: number
        name: string
        slug: string
    }
    country: {
        id: number
        name: string
    }
    position: string
}
