export interface EventDetails {
    id: number
    slug: string
    tournament: {
        id: number
        name: string
        slug: string
        sport: {
            id: number
            name: string
            slug: 'football' | 'basketball' | 'american-football'
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

export interface EventIncident {
    player: {
        id: number
        name: string
        slug: string
        country: {
            id: number
            name: string
        }
        position: string
    }
    teamSide?: 'home' | 'away'
    color?: 'yellow' | 'red' | 'yellowred'
    id: number
    time: number
    type: 'card' | 'goal' | 'period'
    scoringTeam?: 'home' | 'away'
    homeScore?: number
    awayScore?: number
    goalType?:
        | 'regular'
        | 'owngoal'
        | 'penalty'
        | 'onepoint'
        | 'twopoint'
        | 'threepoint'
        | 'touchdown'
        | 'safety'
        | 'fieldgoal'
        | 'extrapoint'
    text?: string
}
