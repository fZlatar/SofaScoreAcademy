export interface TeamDetails {
    id: number
    name: string
    country: {
        id: number
        name: string
    }
    managerName: string | null
    venue: string | null
}

export interface TeamPlayer {
    id: number
    name: string
    slug: string
    country: {
        id: number
        name: string
    }
    position: string
}

export interface TeamEvent {
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

export interface TeamTournament {
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
