import { EventDetails, EventIncident } from '@/models/event'
import fetcher, { url } from './fetcher'

export async function getEventDetails(id: number): Promise<EventDetails> {
    const path = `${url}/event/${id}`
    const data = await fetcher<EventDetails>(path)
    return data
}

export async function getEventIncidents(id: number): Promise<EventIncident[]> {
    const path = `${url}/event/${id}/incidents`
    const data = await fetcher<EventIncident[]>(path)
    return data
}

export function getEventIncidentsSwr(id: number): string {
    const path = `/api/event/${id}/incidents`
    return path
}
