export interface TournamentDetails {
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

export interface TournamentStandings {
    id: number
    tournament: {
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
    type: 'total' | 'home' | 'away'
    sortedStandingsRows: [
        {
            id: number
            team: {
                id: number
                name: string
                country: {
                    id: number
                    name: string
                }
            }
            points: number | null
            scoresFor: number
            scoresAgainst: number
            played: number
            wins: number
            draws: number
            losses: number
            percentage: number | null
        }
    ]
}
