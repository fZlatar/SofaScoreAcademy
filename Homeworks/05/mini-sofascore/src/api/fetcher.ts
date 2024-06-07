export default async function fetcher<T>(path: string): Promise<T> {
    const res = await fetch(path)
    if (res.ok) {
        const data = await res.json()
        return data
    } else {
        throw new Error('404')
    }
}

export const url = 'https://academy-backend.sofascore.dev'
