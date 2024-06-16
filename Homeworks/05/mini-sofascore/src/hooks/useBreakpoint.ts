import { useState, useEffect } from 'react'

interface Breakpoints {
    isBig: boolean
    isSmall: boolean
}

const useBreakpoint = (minWidth = 900): Breakpoints => {
    const [isBig, setIsBig] = useState<boolean>(false)
    const [isSmall, setIsSmall] = useState<boolean>(true)

    const breakpoints = {
        desktop: `(min-width: ${minWidth}px)`,
        mobile: `(max-width: ${minWidth - 1}px)`,
    }

    useEffect(() => {
        const mediaQueryLists: { [key: string]: MediaQueryList } = Object.keys(breakpoints).reduce((acc, key) => {
            acc[key] = window.matchMedia(breakpoints[key as keyof typeof breakpoints])
            return acc
        }, {} as { [key: string]: MediaQueryList })

        const handleChange = () => {
            setIsBig(mediaQueryLists.desktop.matches)
            setIsSmall(mediaQueryLists.mobile.matches)
        }

        handleChange()

        Object.values(mediaQueryLists).forEach(mql => mql.addEventListener('change', handleChange))

        return () => {
            Object.values(mediaQueryLists).forEach(mql => mql.removeEventListener('change', handleChange))
        }
    }, [])

    return { isBig: isBig, isSmall: isSmall }
}

export default useBreakpoint
