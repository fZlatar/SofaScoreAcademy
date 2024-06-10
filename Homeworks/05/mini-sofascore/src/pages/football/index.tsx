import { Box, Flex, FlexProps } from '@kuma-ui/core'
import { ReactElement, useEffect, useState } from 'react'
import Layout from '@/modules/Layout'
import Head from 'next/head'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getAvailableTournamentsForSport, getEventsForSportAndDate } from '@/api/sportApi'
import { NextPageWithLayout, fetcher } from '../_app'
import Breadcrumbs, { Crumb } from '@/components/Breadcrumbs'
import Leagues from '@/modules/Leagues'
import Events from '@/modules/events/Events'
import { DateTime } from 'luxon'
import { AnimatePresence, motion } from 'framer-motion'
import EventPopup from '@/modules/eventPopup/EventPopup'
import { getEventIncidentsSwr } from '@/api/eventApi'
import useSWR from 'swr'
import { EventDetails, EventIncident } from '@/models/event'
import { TournamentDetails } from '@/models/tournament'

type FootballPageRepo = {
    tournaments: TournamentDetails[]
    events: EventDetails[]
}

type FootballPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

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

const FootballPage: NextPageWithLayout<FootballPageProps> = ({ repo }) => {
    const [selectedEvent, setSelectedEvent] = useState<EventDetails | undefined>(undefined)
    const { data, isLoading, error } = useSWR<EventIncident[]>(
        selectedEvent ? getEventIncidentsSwr(selectedEvent.id) : null
    )

    const crumbs: Crumb[] = [
        {
            name: 'Football',
            link: '/football',
        },
        ...(selectedEvent
            ? [
                  {
                      name: selectedEvent.tournament.name,
                      link: `/football/league/${selectedEvent.tournament.slug}/${selectedEvent.tournament.id}`,
                  },
                  {
                      name: `${selectedEvent.homeTeam.name} vs ${selectedEvent.awayTeam.name}`,
                      link: `/football/match/${selectedEvent.slug}/${selectedEvent.id}`,
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
            <Box m="0px 24px 24px 24px">
                <Breadcrumbs w="100%" crumbs={crumbs} />
                <Flex {...flexStyles}>
                    <Leagues w="calc((100% - 48px) / 3)" leagues={repo.tournaments} />
                    <Events
                        w="calc((100% - 48px) / 3)"
                        events={repo.events}
                        initialDate={DateTime.now()}
                        sport="football"
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

FootballPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export const getServerSideProps = (async () => {
    const tournaments = await getAvailableTournamentsForSport('football')

    const events = await getEventsForSportAndDate('football', DateTime.now())

    const repo = {
        tournaments: tournaments,
        events: events,
    }

    return { props: { repo } }
}) satisfies GetServerSideProps<{ repo: FootballPageRepo }>

export default FootballPage