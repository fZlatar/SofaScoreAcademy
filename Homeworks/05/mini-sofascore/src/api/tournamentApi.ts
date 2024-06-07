import { TournamentDetails, TournamentEvent, TournamentStandings } from '@/models/tournament'
import fetcher, { url } from './fetcher'

export async function getTournamentDetails(id: number): Promise<TournamentDetails> {
    const path = `${url}/tournament/${id}`
    const data = await fetcher<TournamentDetails>(path)
    return data
}

export async function getTournamentEvents(
    id: number,
    span: 'next' | 'last' = 'next',
    page = 0
): Promise<TournamentEvent[]> {
    const path = `${url}/tournament/${id}/events/${span}/${page}`
    const data = await fetcher<TournamentEvent[]>(path)
    return data
}

export async function getTournamentStandings(id: number): Promise<TournamentStandings[]> {
    const path = `${url}/tournament/${id}/standings`
    const data = await fetcher<TournamentStandings[]>(path)
    return data
}

export function getTournamentImageSrc(id: number): string {
    return `${url}/tournament/${id}/image`
}
