import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from 'react'

interface ContextValue {
    dateFormat: 'DD / MM / YYYY' | 'MM / DD / YYYY'
    setDateFormat: Dispatch<SetStateAction<'DD / MM / YYYY' | 'MM / DD / YYYY'>>
}

const DateContext = createContext<ContextValue>({} as ContextValue)

export const DateContextProvider = ({ children }: PropsWithChildren) => {
    const [dateFormat, setDateFormat] = useState<'DD / MM / YYYY' | 'MM / DD / YYYY'>('DD / MM / YYYY')

    return <DateContext.Provider value={{ dateFormat, setDateFormat }}>{children}</DateContext.Provider>
}

export const useDateContext = () => useContext(DateContext)
