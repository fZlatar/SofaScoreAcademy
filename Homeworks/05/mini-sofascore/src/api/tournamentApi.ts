import { TournamentDetails, TournamentStandings } from '@/models/tournament'
import fetcher, { url } from './fetcher'
import { EventDetails } from '@/models/event'

export async function getTournamentDetails(id: number): Promise<TournamentDetails> {
    const path = `${url}/tournament/${id}`
    const data = await fetcher<TournamentDetails>(path)
    return data
}

export async function getTournamentEvents(
    id: number,
    span: 'next' | 'last' = 'next',
    page = 0
): Promise<EventDetails[]> {
    const path = `${url}/tournament/${id}/events/${span}/${page}`
    const data = await fetcher<EventDetails[]>(path)
    return data
}

export function getTournamentEventsSwr(id: number, label: 'next' | 'last', index: number) {
    const path = `/api/tournament/${id}/events/${label}/${index}`
    return path
}

export async function getTournamentStandings(id: number): Promise<TournamentStandings[]> {
    const path = `${url}/tournament/${id}/standings`
    const data = await fetcher<TournamentStandings[]>(path)
    return data
}

export function getTournamentStandingsSwr(id: number) {
    const path = `/api/tournament/${id}/standings`
    return path
}

export function getTournamentImageSrc(id: number): string {
    return `${url}/tournament/${id}/image`
}
