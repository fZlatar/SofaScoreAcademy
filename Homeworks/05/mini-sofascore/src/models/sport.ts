export interface Sport {
    id: number
    name: string
    slug: string
}

export interface AvailableTournamentForSport {
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
}
