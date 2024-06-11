import { PlayerDetails } from '@/models/player'
import fetcher, { url } from './fetcher'
import { EventDetails } from '@/models/event'

export async function getPlayerDetails(id: number): Promise<PlayerDetails> {
    const path = `${url}/player/${id}`
    const data = await fetcher<PlayerDetails>(path)
    return data
}

export async function getPlayerEvents(id: number, span: 'next' | 'last' = 'next', page = 0): Promise<EventDetails[]> {
    const path = `${url}/player/${id}/events/${span}/${page}`
    const data = await fetcher<EventDetails[]>(path)
    return data
}

export function getPlayerEventsSwr(id: number, span: 'next' | 'last' = 'next', page = 0) {
    const path = `/api/player/${id}/events/${span}/${page}`
    return path
}

export function getPlayerImageSrc(id: number): string {
    return `${url}/player/${id}/image`
}
