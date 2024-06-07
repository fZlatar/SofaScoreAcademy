import { Box, Flex } from '@kuma-ui/core'
import { ReactElement, useState } from 'react'
import Layout from '@/modules/Layout'
import Head from 'next/head'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getAvailableTournamentsForSport, getEventsForSportAndDate } from '@/api/sportApi'
import { AvailableTournamentForSport, EventForSportAndDate } from '@/models/sport'
import { NextPageWithLayout } from '../_app'
import Breadcrumbs, { Crumb } from '@/components/Breadcrumbs'
import Leagues from '@/modules/Leagues'
import { DateTime } from 'luxon'
import Events from '@/modules/Events'
import { getEventIncidentsSwr } from '@/api/eventApi'
import useSWR from 'swr'
import { EventIncident } from '@/models/event'
import { AnimatePresence, motion } from 'framer-motion'
import EventPopup from '@/modules/eventPopup/EventPopup'

type AmericanFootballPageRepo = {
    tournaments: AvailableTournamentForSport[]
    events: EventForSportAndDate[]
}

type AmericanFootballPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

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

const AmericanFootballPage: NextPageWithLayout<AmericanFootballPageProps> = ({ repo }) => {
    const [selectedEvent, setSelectedEvent] = useState<EventForSportAndDate | undefined>(undefined)
    const { data, isLoading, error } = useSWR<EventIncident[]>(
        selectedEvent ? getEventIncidentsSwr(selectedEvent.id) : null
    )

    const crumbs: Crumb[] = [
        {
            name: 'Am. Football',
            link: '/american-football',
        },
        ...(selectedEvent
            ? [
                  {
                      name: selectedEvent.tournament.name,
                      link: `/american-football/league/${selectedEvent.tournament.slug}`,
                  },
                  {
                      name: `${selectedEvent.homeTeam.name} vs ${selectedEvent.awayTeam.name}`,
                      link: `/american-football/match/${selectedEvent.slug}?id=${selectedEvent.id}`,
                  },
              ]
            : []),
    ]

    return (
        <>
            <Head>
                <title>Sofascore</title>
                <meta name="description" content="Mini Sofascore app developed for Sofascore Academy 2024" />
            </Head>
            <Box ml={24} mr={24} mb={24}>
                <Breadcrumbs w="100%" crumbs={crumbs} />
                <Flex flexDirection="row" gap={24} w="100%" alignItems="flex-start">
                    <Leagues w="calc((100% - 48px) / 3)" leagues={repo.tournaments} />
                    <Events
                        w="calc((100% - 48px) / 3)"
                        events={repo.events}
                        initialDate={DateTime.now()}
                        sport="american-football"
                        selected={selectedEvent}
                        setSelected={setSelectedEvent}
                    />
                    <AnimatePresence mode="wait">
                        {selectedEvent && data && !isLoading && (
                            <MotionFlex
                                key={selectedEvent.id}
                                w="calc((100% - 48px) / 3)"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
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

AmericanFootballPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export const getServerSideProps = (async () => {
    const tournaments = await getAvailableTournamentsForSport('american-football')

    const events = await getEventsForSportAndDate('american-football', DateTime.now())

    const repo = {
        tournaments: tournaments,
        events: events,
    }

    return { props: { repo } }
}) satisfies GetServerSideProps<{ repo: AmericanFootballPageRepo }>

export default AmericanFootballPage
