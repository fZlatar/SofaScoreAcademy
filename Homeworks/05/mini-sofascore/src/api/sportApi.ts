import { AvailableTournamentForSport, Sport } from '@/models/sport'
import fetcher, { url } from './fetcher'
import { DateTime } from 'luxon'
import { EventDetails } from '@/models/event'

export async function getSports(): Promise<Sport[]> {
    const path = `${url}/sports`
    const data = await fetcher<Sport[]>(path)
    return data
}

export async function getEventsForSportAndDate(slug: string, date: DateTime): Promise<EventDetails[]> {
    const formattedDate = date.toISODate()
    const path = `${url}/sport/${slug}/events/${formattedDate}`
    const data = await fetcher<EventDetails[]>(path)
    return data
}

export function getEventsForSportAndDateSwr(slug: string, date: DateTime): string {
    const formattedDate = date.toISODate()
    const path = `api/sport/${slug}/events/${formattedDate}`
    return path
}

export async function getAvailableTournamentsForSport(slug: string): Promise<AvailableTournamentForSport[]> {
    const path = `${url}/sport/${slug}/tournaments`
    const data = await fetcher<AvailableTournamentForSport[]>(path)
    return data
}
