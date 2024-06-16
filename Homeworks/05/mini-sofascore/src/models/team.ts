export interface TeamDetails {
    id: number
    name: string
    country: {
        id: number
        name: string
    }
    managerName: string | null
    venue: string | null
}
