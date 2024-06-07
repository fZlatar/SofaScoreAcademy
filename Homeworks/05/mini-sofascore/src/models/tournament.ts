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

export interface TournamentEvent {
    id: number
    slug: string
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
    homeTeam: {
        id: number
        name: string
        country: {
            id: number
            name: string
        }
    }
    awayTeam: {
        id: number
        name: string
        country: {
            id: number
            name: string
        }
    }
    status: 'notstarted' | 'finished' | 'inprogress'
    startDate: string | null
    homeScore: {
        total: number | null
        period1: number | null
        period2: number | null
        period3: number | null
        period4: number | null
        overtime: number | null
    }
    awayScore: {
        total: number | null
        period1: number | null
        period2: number | null
        period3: number | null
        period4: number | null
        overtime: number | null
    }
    winnerCode: 'home' | 'away' | 'draw' | null
    round: number
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
