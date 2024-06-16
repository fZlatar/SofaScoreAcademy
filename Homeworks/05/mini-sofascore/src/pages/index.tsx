import { useEffect } from 'react'
import { useRouter } from 'next/router'

// redirect to /football
const Home = () => {
    const router = useRouter()

    useEffect(() => {
        router.replace('/football')
    }, [router])

    return null
}

export default Home
