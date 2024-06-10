import { getEventIncidentsSwr } from '@/api/eventApi'
import { getAvailableTournamentsForSport } from '@/api/sportApi'
import { getTournamentEvents, getTournamentStandings } from '@/api/tournamentApi'
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
import { ReactElement, useState } from 'react'
import useSWR from 'swr'
import { DateTime } from 'luxon'
import Standings from '@/modules/Standings'

const DEFAULT_MATCHES_COUNT = 20

type BasketballLeaguePageRepo = {
    tournament: TournamentDetails
    tournaments: TournamentDetails[]
    events: EventDetails[]
    standings: TournamentStandings[]
}

type BasketballLeaguePageProps = InferGetServerSidePropsType<typeof getServerSideProps>

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

const BasketballLeaguePage: NextPageWithLayout<BasketballLeaguePageProps> = ({ repo }) => {
    const [selectedTab, setSelectedTab] = useState<'standings' | 'matches'>('matches')
    const [selectedEvent, setSelectedEvent] = useState<EventDetails | undefined>(undefined)
    const [eventIndex, setEventIndex] = useState(calculateFirstIndex(repo.events))
    const {
        data: incidents,
        isLoading: incidentsLoading,
        error: incidentsError,
    } = useSWR<EventIncident[]>(selectedEvent ? getEventIncidentsSwr(selectedEvent.id) : null)

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
                                        events={calculateMatchesForPage(repo.events, eventIndex)}
                                        index={eventIndex}
                                        setIndex={setEventIndex}
                                        offset={DEFAULT_MATCHES_COUNT}
                                        hasLess={hasLess(eventIndex)}
                                        hasMore={hasMore(eventIndex, repo.events.length)}
                                        setSelected={setSelectedEvent}
                                        selected={selectedEvent?.id}
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
                                <Standings w="100%" standings={repo.standings} sport="basketball" />
                            )}
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}

BasketballLeaguePage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export const getServerSideProps = (async context => {
    const { slug, id } = context.query

    try {
        const tournaments = await getAvailableTournamentsForSport('basketball')
        const events: EventDetails[] = []
        const standings = await getTournamentStandings(Number(id))

        // fetching is not optimal, I should have used SWR to fetch rest of the events.
        let page = 0
        while (true) {
            const tmp = await getTournamentEvents(Number(id), 'last', page)
            if (tmp.length === 0) {
                break
            }
            events.push(...tmp)
            page += 1
        }
        page = 0
        while (true) {
            const tmp = await getTournamentEvents(Number(id), 'next', page)
            if (tmp.length === 0) {
                break
            }
            events.push(...tmp)
            page += 1
        }

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
}) satisfies GetServerSideProps<{ repo: BasketballLeaguePageRepo }>

export function calculateFirstIndex(events: EventDetails[]) {
    const firstIndex = events.findIndex(e => e.status === 'notstarted')
    return firstIndex === -1 ? events.length - DEFAULT_MATCHES_COUNT : firstIndex
}

export function hasMore(index: number, eventsLen: number) {
    return index + DEFAULT_MATCHES_COUNT < eventsLen
}

export function hasLess(index: number) {
    return index - DEFAULT_MATCHES_COUNT >= 0
}

export function calculateMatchesForPage(events: EventDetails[], index: number) {
    return events.slice(index, index + DEFAULT_MATCHES_COUNT)
}

export default BasketballLeaguePage
