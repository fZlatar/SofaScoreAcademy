import { Box, Flex, FlexProps } from '@kuma-ui/core'
import { ReactElement, useEffect, useState } from 'react'
import Layout from '@/modules/Layout'
import Head from 'next/head'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getAvailableTournamentsForSport, getEventsForSportAndDate } from '@/api/sportApi'
import { NextPageWithLayout } from '../_app'
import Breadcrumbs, { Crumb } from '@/components/Breadcrumbs'
import Leagues from '@/modules/Leagues'
import { DateTime } from 'luxon'
import Events from '@/modules/events/Events'
import { EventDetails, EventIncident } from '@/models/event'
import useSWR from 'swr'
import { getEventIncidentsSwr } from '@/api/eventApi'
import { AnimatePresence, motion } from 'framer-motion'
import EventPopup from '@/modules/eventPopup/EventPopup'
import { TournamentDetails } from '@/models/tournament'

type BasketballPageRepo = {
    tournaments: TournamentDetails[]
    events: EventDetails[]
}

type BasketballPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

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

const flexStyles: Partial<FlexProps> = {
    flexDirection: 'row',
    gap: 24,
    w: '100%',
    alignItems: 'flex-start',
}

const motionFlexStyles: Partial<FlexProps> = {
    w: 'calc((100% - 48px) / 3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

const BasketballPage: NextPageWithLayout<BasketballPageProps> = ({ repo }) => {
    const [selectedEvent, setSelectedEvent] = useState<EventDetails | undefined>(undefined)
    const { data, isLoading, error } = useSWR<EventIncident[]>(
        selectedEvent ? getEventIncidentsSwr(selectedEvent.id) : null
    )

    const crumbs: Crumb[] = [
        {
            name: 'Basketball',
            link: '/basketball',
        },
        ...(selectedEvent
            ? [
                  {
                      name: selectedEvent.tournament.name,
                      link: `/basketball/league/${selectedEvent.tournament.slug}/${selectedEvent.tournament.id}`,
                  },
                  {
                      name: `${selectedEvent.homeTeam.name} vs ${selectedEvent.awayTeam.name}`,
                      link: `/basketball/match/${selectedEvent.slug}/${selectedEvent.id}`,
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
                <Flex {...flexStyles}>
                    <Leagues w="calc((100% - 48px) / 3)" leagues={repo.tournaments} />
                    <Events
                        w="calc((100% - 48px) / 3)"
                        events={repo.events}
                        initialDate={DateTime.now()}
                        sport="basketball"
                        selected={selectedEvent}
                        setSelected={setSelectedEvent}
                    />
                    <AnimatePresence mode="wait">
                        {selectedEvent && data && !isLoading && (
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

BasketballPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export const getServerSideProps = (async () => {
    const tournaments = await getAvailableTournamentsForSport('basketball')

    const events = await getEventsForSportAndDate('basketball', DateTime.now())

    const repo = {
        tournaments: tournaments,
        events: events,
    }

    return { props: { repo } }
}) satisfies GetServerSideProps<{ repo: BasketballPageRepo }>

export default BasketballPage
