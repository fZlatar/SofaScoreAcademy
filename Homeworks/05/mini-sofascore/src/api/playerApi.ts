import { PlayerDetails, PlayerEvent } from '@/models/player'
import fetcher, { url } from './fetcher'

export async function getPlayerDetails(id: number): Promise<PlayerDetails> {
    const path = `${url}/player/${id}`
    const data = await fetcher<PlayerDetails>(path)
    return data
}

export async function getPlayerEvents(id: number, span: 'next' | 'last' = 'next', page = 0): Promise<PlayerEvent[]> {
    const path = `${url}/player/${id}/${span}/${page}`
    const data = await fetcher<PlayerEvent[]>(path)
    return data
}

export function getPlayerImageSrc(id: number): string {
    return `${url}/player/${id}/image`
}
