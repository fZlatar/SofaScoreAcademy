import { TeamDetails } from '@/models/team'
import fetcher, { url } from './fetcher'
import { EventDetails } from '@/models/event'
import { TournamentDetails } from '@/models/tournament'
import { PlayerDetails } from '@/models/player'

export async function getTeamDetails(id: number): Promise<TeamDetails> {
    const path = `${url}/team/${id}`
    const data = await fetcher<TeamDetails>(path)
    return data
}

export async function getTeamPlayers(id: number): Promise<PlayerDetails[]> {
    const path = `${url}/team/${id}/players`
    const data = await fetcher<PlayerDetails[]>(path)
    return data
}

export async function getTeamEvents(id: number, span: 'next' | 'last' = 'next', page = 0): Promise<EventDetails[]> {
    const path = `${url}/team/${id}/events/${span}/${page}`
    const data = await fetcher<EventDetails[]>(path)
    return data
}

export function getTeamEventsSwr(id: number, span: 'next' | 'last' = 'next', page = 0) {
    const path = `/api/team/${id}/events/${span}/${page}`
    return path
}

export async function getTeamTournaments(id: number): Promise<TournamentDetails[]> {
    const path = `${url}/team/${id}/tournaments`
    const data = await fetcher<TournamentDetails[]>(path)
    return data
}

export function getTeamImageSrc(id: number): string {
    return `${url}/team/${id}/image`
}
