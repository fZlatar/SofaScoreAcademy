import { Box, Flex, FlexProps } from '@kuma-ui/core'
import { ReactElement, useState } from 'react'
import Layout from '@/modules/Layout'
import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { getAvailableTournamentsForSport } from '@/api/sportApi'
import { NextPageWithLayout } from '../_app'
import Breadcrumbs, { Crumb } from '@/components/Breadcrumbs'
import Leagues from '@/modules/Leagues'
import { EventDetails, EventIncident } from '@/models/event'
import useSWR from 'swr'
import { getEventIncidentsSwr } from '@/api/eventApi'
import { AnimatePresence, motion } from 'framer-motion'
import EventPopup from '@/modules/eventPopup/EventPopup'
import { TournamentDetails } from '@/models/tournament'
import useBreakpoint from '@/hooks/useBreakpoint'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import FavoritesHeader from '@/modules/FavoritesHeader'
import FavoriteEvents from '@/modules/FavoriteEvents'
import { useFavoritesContext } from '@/context/FavoritesContext'

type FavoritesPageRepo = {
    tournamentsFootball: TournamentDetails[]
    tournamentsBasketball: TournamentDetails[]
    tournamentsAmericanFootball: TournamentDetails[]
}

type FavoritesPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const MotionFlex = motion(Flex)

const variants = {
    initial: {
        x: '200%',
    },
    animate: {
        x: 0,
    },
    exit: {
        x: '200%',
    },
}

const motionFlexStyles: Partial<FlexProps> = {
    w: 'calc((100% - 48px) / 3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

const FavoritesPage: NextPageWithLayout<FavoritesPageProps> = ({ repo }) => {
    const { favorites } = useFavoritesContext()
    const t = useTranslations('FavoritesPage')
    const router = useRouter()
    const { isBig } = useBreakpoint()
    const [selectedSport, setSelectedSport] = useState<'football' | 'basketball' | 'american-football'>('football')
    const [selectedEvent, setSelectedEvent] = useState<EventDetails | undefined>(undefined)
    const { data, isLoading, error } = useSWR<EventIncident[]>(
        selectedEvent ? getEventIncidentsSwr(selectedEvent.id) : null
    )

    if (error) {
        router.push('/404')
    }

    const crumbs: Crumb[] = [
        {
            name: t('favorites'),
            link: '/favorites',
        },
    ]

    return (
        <>
            <Head>
                <title>{t('favorites')}</title>
                <meta name="description" content="Mini Sofascore app developed for Sofascore Academy 2024" />
            </Head>
            <FavoritesHeader selected={selectedSport} setSelected={setSelectedSport} />
            <Box ml={[0, 24]} mr={[0, 24]} mb={24}>
                <Breadcrumbs w="100%" crumbs={crumbs} display={['none', 'flex']} />
                <Flex flexDirection={['column', 'row']} gap={[0, 24]} w="100%" alignItems="flex-start">
                    <Leagues
                        w="calc((100% - 48px) / 3)"
                        leagues={
                            selectedSport === 'football'
                                ? repo.tournamentsFootball
                                : selectedSport === 'basketball'
                                ? repo.tournamentsBasketball
                                : repo.tournamentsAmericanFootball
                        }
                        display={['none', 'flex']}
                    />
                    <FavoriteEvents
                        mt={[16, 0]}
                        favorites={favorites.filter(f => f.tournament.sport.slug === selectedSport)}
                        setSelected={setSelectedEvent}
                        w={['calc(100% - 16px)', 'calc((100% - 48px) / 3)']}
                    />
                    <AnimatePresence mode="wait">
                        {selectedEvent && data && !isLoading && isBig && (
                            <MotionFlex
                                key={selectedEvent.id}
                                {...motionFlexStyles}
                                variants={variants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{
                                    x: { duration: 0.3, type: 'tween' },
                                }}
                            >
                                <EventPopup
                                    event={selectedEvent}
                                    incidents={data}
                                    onClose={() => setSelectedEvent(undefined)}
                                />
                            </MotionFlex>
                        )}
                    </AnimatePresence>
                </Flex>
            </Box>
        </>
    )
}

FavoritesPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout noTabs>{page}</Layout>
}

export const getServerSideProps = (async ({ locale }: GetServerSidePropsContext) => {
    try {
        const tournamentsFootball = await getAvailableTournamentsForSport('football')
        const tournamentsBasketball = await getAvailableTournamentsForSport('basketball')
        const tournamentsAmericanFootball = await getAvailableTournamentsForSport('american-football')

        const repo = {
            tournamentsFootball,
            tournamentsBasketball,
            tournamentsAmericanFootball,
        }

        return { props: { repo, messages: (await import(`../../../messages/${locale}.json`)).default } }
    } catch (error) {
        return {
            notFound: true,
        }
    }
}) satisfies GetServerSideProps<{ repo: FavoritesPageRepo }>

export default FavoritesPage
