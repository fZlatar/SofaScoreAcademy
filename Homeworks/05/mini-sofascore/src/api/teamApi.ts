import { TeamDetails, TeamEvent, TeamPlayer, TeamTournament } from '@/models/team'
import fetcher, { url } from './fetcher'

export async function getTeamDetails(id: number): Promise<TeamDetails> {
    const path = `${url}/team/${id}`
    const data = await fetcher<TeamDetails>(path)
    return data
}

export async function getTeamPlayers(id: number): Promise<TeamPlayer[]> {
    const path = `${url}/team/${id}/players`
    const data = await fetcher<TeamPlayer[]>(path)
    return data
}

export async function getTeamEvents(id: number, span: 'next' | 'last' = 'next', page = 0): Promise<TeamEvent[]> {
    const path = `${url}/team/${id}/events/${span}/${page}`
    const data = await fetcher<TeamEvent[]>(path)
    return data
}

export async function getTeamTournaments(id: number): Promise<TeamTournament[]> {
    const path = `${url}/team/${id}/tournaments`
    const data = await fetcher<TeamTournament[]>(path)
    return data
}

export function getTeamImageSrc(id: number): string {
    return `${url}/team/${id}/image`
}
