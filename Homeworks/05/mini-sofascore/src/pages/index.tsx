import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'

// redirect to /football
const Home = () => {
    // const { data, error } = useSWR('/api/sports')

    // console.log(data, error)

    const router = useRouter()

    useEffect(() => {
        router.replace('/football')
    }, [router])

    return null
}

export default Home
