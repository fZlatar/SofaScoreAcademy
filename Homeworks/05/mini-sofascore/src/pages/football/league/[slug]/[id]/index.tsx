import { getEventIncidentsSwr } from '@/api/eventApi'
import { getAvailableTournamentsForSport } from '@/api/sportApi'
import { getTournamentEvents, getTournamentEventsSwr, getTournamentStandings } from '@/api/tournamentApi'
import Breadcrumbs, { Crumb } from '@/components/Breadcrumbs'
import { EventDetails, EventIncident } from '@/models/event'
import { TournamentDetails, TournamentStandings } from '@/models/tournament'
import Layout from '@/modules/Layout'
import LeagueHeader from '@/modules/LeagueHeader'
import Leagues from '@/modules/Leagues'
import Matches from '@/modules/Matches'
import EventPopup from '@/modules/eventPopup/EventPopup'
import { NextPageWithLayout } from '@/pages/_app'
import { Box, Flex } from '@kuma-ui/core'
import { AnimatePresence, motion } from 'framer-motion'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { ReactElement, useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import { DateTime } from 'luxon'
import Standings from '@/modules/Standings'

type FootballLeaguePageRepo = {
    tournament: TournamentDetails
    tournaments: TournamentDetails[]
    events: EventDetails[]
    standings: TournamentStandings[]
}

type FootballLeaguePageProps = InferGetServerSidePropsType<typeof getServerSideProps>

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

interface Current {
    label: 'next' | 'last'
    index: number
}

const FootballLeaguePage: NextPageWithLayout<FootballLeaguePageProps> = ({ repo }) => {
    const [selectedTab, setSelectedTab] = useState<'standings' | 'matches'>('matches')
    const [selectedEvent, setSelectedEvent] = useState<EventDetails | undefined>(undefined)
    const {
        data: incidents,
        isLoading: incidentsLoading,
        error: incidentsError,
    } = useSWR<EventIncident[]>(selectedEvent ? getEventIncidentsSwr(selectedEvent.id) : null)

    const [events, setEvents] = useState(repo.events)
    const [index, setIndex] = useState(0)

    const { prev: prevIndex, next: nextIndex } = getPrevAndNextIndex(index)

    console.log(`${prevIndex.label} ${prevIndex.index}`)
    console.log(`${nextIndex.label} ${nextIndex.index}`)

    const {
        data: next,
        isLoading: nextLoading,
        error: nextError,
    } = useSWR<EventDetails[]>(getTournamentEventsSwr(repo.tournament.id, prevIndex.label, prevIndex.index))
    const {
        data: prev,
        isLoading: prevLoading,
        error: prevError,
    } = useSWR<EventDetails[]>(getTournamentEventsSwr(repo.tournament.id, nextIndex.label, nextIndex.index))

    const crumbs: Crumb[] = [
        {
            name: 'Football',
            link: '/football',
        },
        {
            name: repo.tournament.name,
            link: `/football/league/${repo.tournament.slug}/${repo.tournament.id}`,
        },
    ]

    return (
        <>
            <Head>
                <title>{`${repo.tournament.name}`}</title>
                <meta name="description" content="Mini Sofascore app developed for Sofascore Academy 2024" />
            </Head>
            <Box ml={24} mr={24} mb={24}>
                <Breadcrumbs w="100%" crumbs={crumbs} />
                <Flex flexDirection="row" gap={24} w="100%" alignItems="flex-start">
                    <Leagues w="calc((100% - 48px) / 3)" leagues={repo.tournaments} selected={repo.tournament.id} />
                    <Flex
                        w="calc(((100% - 48px) / 3 * 2) + 24px)"
                        justifyContent="flex-start"
                        flexDirection="column"
                        gap={12}
                    >
                        <LeagueHeader
                            w="100%"
                            league={repo.tournament}
                            selectedTab={selectedTab}
                            setSelectedTab={setSelectedTab}
                        />
                        <Flex w="100%" justifyContent="flex-start" alignItems="flex-start" flexDirection="row" gap={24}>
                            {selectedTab === 'matches' ? (
                                <>
                                    <Matches
                                        w="calc((100% - 24px) / 2)"
                                        events={events}
                                        loading={prevLoading || nextLoading}
                                        prev={prev}
                                        next={next}
                                        index={index}
                                        setIndex={setIndex}
                                        setSelected={setSelectedEvent}
                                        selected={selectedEvent?.id}
                                        setEvents={setEvents}
                                    />

                                    <AnimatePresence mode="wait">
                                        {selectedEvent && incidents && !incidentsLoading && (
                                            <MotionFlex
                                                key={selectedEvent.id}
                                                w="calc((100% - 24px) / 2)"
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
                                                    incidents={incidents}
                                                    onClose={() => setSelectedEvent(undefined)}
                                                />
                                            </MotionFlex>
                                        )}
                                    </AnimatePresence>
                                </>
                            ) : (
                                <Standings w="100%" standings={repo.standings} sport="football" />
                            )}
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}

FootballLeaguePage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export const getServerSideProps = (async context => {
    const { slug, id } = context.query

    try {
        const tournaments = await getAvailableTournamentsForSport('football')
        const events = await getTournamentEvents(Number(id), 'next', 0)
        const standings = await getTournamentStandings(Number(id))

        events.sort((a, b) => {
            const aDateTime = a.startDate ? DateTime.fromISO(a.startDate) : DateTime.invalid('Invalid Date')
            const bDateTime = b.startDate ? DateTime.fromISO(b.startDate) : DateTime.invalid('Invalid Date')
            if (aDateTime.isValid && bDateTime.isValid) {
                return aDateTime.toMillis() - bDateTime.toMillis()
            }
            return aDateTime.isValid ? -1 : 1
        })

        const tournament = tournaments.find(t => t.id === Number(id))

        if (!tournament || tournament.slug !== slug) {
            return {
                notFound: true,
            }
        }

        const repo = {
            tournaments: tournaments,
            events: events,
            tournament: tournament,
            standings: standings,
        }

        return { props: { repo } }
    } catch (error) {
        return {
            notFound: true,
        }
    }
}) satisfies GetServerSideProps<{ repo: FootballLeaguePageRepo }>

export default FootballLeaguePage

export function getPrevAndNextIndex(indexCurr: number) {
    let prevIndex = indexCurr - 1
    let nextIndex = indexCurr + 1
    let prevLabel: 'last' | 'next' = 'next'
    let nextLabel: 'last' | 'next' = 'next'
    if (prevIndex < 0) {
        prevLabel = 'last'
        prevIndex = Math.abs(prevIndex + 1)
    }
    if (nextIndex < 0) {
        nextLabel = 'last'
        nextIndex = Math.abs(nextIndex + 1)
    }
    const prev: Current = {
        label: prevLabel,
        index: prevIndex,
    }
    const next: Current = {
        label: nextLabel,
        index: nextIndex,
    }
    return { prev, next }
}