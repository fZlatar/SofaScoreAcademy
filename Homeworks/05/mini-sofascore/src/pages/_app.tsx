import { DateContextProvider } from '@/context/DateContext'
import { ThemeContextProvider } from '@/context/ThemeContext'
import '@/styles/globals.css'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ReactElement, ReactNode } from 'react'
import { SWRConfig } from 'swr'

//@ts-ignore
export const fetcher = (...args) =>
    //@ts-ignore
    fetch(...args).then(res => {
        if (res.ok) {
            return res.json()
        } else {
            throw new Error('404')
        }
    })

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? (page => page)
    return getLayout(
        <SWRConfig value={{ fetcher }}>
            <ThemeContextProvider>
                <DateContextProvider>
                    <>
                        <Head>
                            <meta name="viewport" content="width=device-width, initial-scale=1" />
                            <link rel="icon" href="/favicon.ico" />
                        </Head>
                        <Component {...pageProps} />
                    </>
                </DateContextProvider>
            </ThemeContextProvider>
        </SWRConfig>
    )
}
