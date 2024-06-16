import { EventDetails, EventIncident } from '@/models/event'

export interface PeriodInterface {
    period: number
    label: string
    homeScore: number | null
    awayScore: number | null
    incidents: EventIncident[]
    exists: boolean
}

export function extractPeriods(event: EventDetails, incidents: EventIncident[]) {
    const sport = event.tournament.sport.slug
    const labelType = sport === 'football' ? ' half' : 'Q'
    const period1: PeriodInterface = {
        period: 1,
        label: `${sport === 'football' ? 'First' : '1'}${labelType}`,
        homeScore: null,
        awayScore: null,
        incidents: [],
        exists: false,
    }
    const period2: PeriodInterface = {
        period: 2,
        label: `${sport === 'football' ? 'Second' : '2'}${labelType}`,
        homeScore: null,
        awayScore: null,
        incidents: [],
        exists: false,
    }
    const period3: PeriodInterface = {
        period: 3,
        label: `3${labelType}`,
        homeScore: null,
        awayScore: null,
        incidents: [],
        exists: false,
    }
    const period4: PeriodInterface = {
        period: 4,
        label: `4${labelType}`,
        homeScore: null,
        awayScore: null,
        incidents: [],
        exists: false,
    }
    const overtime: PeriodInterface = {
        period: 5,
        label: `Overtime`,
        homeScore: null,
        awayScore: null,
        incidents: [],
        exists: false,
    }

    if (incidents) {
        if (sport === 'football') {
            let period = 1
            for (let i = 0; i < incidents.length; i++) {
                if (incidents[i].type === 'period') {
                    switch (period) {
                        case 1:
                            period1.exists = true
                            break
                        case 2:
                            period2.exists = true
                            break
                        case 3:
                            overtime.exists = true
                            break
                        default:
                            break
                    }
                    period += 1
                    continue
                }
                if (period === 1) {
                    period1.incidents.push(incidents[i])
                    if (!period1.exists) period1.exists = true
                }
                if (period === 2) {
                    period2.incidents.push(incidents[i])
                    if (!period2.exists) period2.exists = true
                }
                if (period === 3) {
                    overtime.incidents.push(incidents[i])
                    if (!overtime.exists) overtime.exists = true
                }
            }
        } else {
            let period = 1
            for (let i = 0; i < incidents.length; i++) {
                if (incidents[i].type === 'period') {
                    switch (period) {
                        case 1:
                            period1.exists = true
                            break
                        case 2:
                            period2.exists = true
                            break
                        case 3:
                            period3.exists = true
                            break
                        case 4:
                            period4.exists = true
                            break
                        default:
                            break
                    }
                    period += 1
                    continue
                }
                if (period === 1) {
                    period1.incidents.push(incidents[i])
                }
                if (period === 2) {
                    period2.incidents.push(incidents[i])
                }
                if (period === 3) {
                    period3.incidents.push(incidents[i])
                }
                if (period === 4) {
                    period4.incidents.push(incidents[i])
                }
            }
        }
    }

    const periods: PeriodInterface[] = []
    if (period1.exists) {
        periods.push(period1)
    }
    if (period2.exists) {
        periods.push(period2)
    }
    if (period3.exists) {
        periods.push(period3)
    }
    if (period4.exists) {
        periods.push(period4)
    }
    if (overtime.exists) {
        periods.push(overtime)
    }

    let homeScore = 0
    let awayScore = 0
    periods.forEach(p => {
        p.incidents.forEach(i => {
            if (i.type === 'goal') {
                if (i.scoringTeam === 'home' && i.homeScore) {
                    homeScore = i.homeScore
                }
                if (i.scoringTeam === 'away' && i.awayScore) {
                    awayScore = i.awayScore
                }
            }
        })
        p.awayScore = awayScore
        p.homeScore = homeScore
        let label = `${p.label} (${homeScore} - ${awayScore})`
        p.label = label
    })

    return periods
}

interface Current {
    label: 'next' | 'last'
    index: number
}

export function getPrevAndNextIndex(indexCurr: number) {
    let prevIndex = indexCurr - 1
    let nextIndex = indexCurr + 1
    let prevLabel: 'last' | 'next' = 'next'
    let nextLabel: 'last' | 'next' = 'next'
    if (prevIndex < 0) {
        prevLabel = 'last'
        prevIndex = Math.abs(prevIndex + 1)
    }
    if (nextIndex < 0) {
        nextLabel = 'last'
        nextIndex = Math.abs(nextIndex + 1)
    }
    const prev: Current = {
        label: prevLabel,
        index: prevIndex,
    }
    const next: Current = {
        label: nextLabel,
        index: nextIndex,
    }
    return { prev, next }
}
