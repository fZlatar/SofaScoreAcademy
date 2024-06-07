import { SearchPlayer, SearchTeam } from '@/models/search'
import fetcher, { url } from './fetcher'

export async function getSearchTeams(query: string): Promise<SearchTeam[]> {
    checkQuery(query)
    const path = `${url}/search/team/${query}`
    const data = await fetcher<SearchTeam[]>(path)
    return data
}

export async function getSearchPlayers(query: string): Promise<SearchPlayer[]> {
    checkQuery(query)
    const path = `${url}/search/player/${query}`
    const data = await fetcher<SearchPlayer[]>(path)
    return data
}

function checkQuery(query: string) {
    const regex = /^[^/]{2,100}$/

    if (!regex.test(query)) {
        throw new Error('Invalid query string. It must be 2 to 100 characters long and cannot contain slashes.')
    }
}
