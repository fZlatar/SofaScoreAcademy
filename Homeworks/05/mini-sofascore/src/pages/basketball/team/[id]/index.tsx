import { getEventIncidentsSwr } from '@/api/eventApi'
import { getAvailableTournamentsForSport } from '@/api/sportApi'
import { getTournamentStandings, getTournamentStandingsSwr } from '@/api/tournamentApi'
import Breadcrumbs, { Crumb } from '@/components/Breadcrumbs'
import { EventDetails, EventIncident } from '@/models/event'
import { TournamentDetails, TournamentStandings } from '@/models/tournament'
import Layout from '@/modules/Layout'
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
import { getTeamDetails, getTeamEvents, getTeamEventsSwr, getTeamPlayers, getTeamTournaments } from '@/api/teamApi'
import { PlayerDetails } from '@/models/player'
import { TeamDetails } from '@/models/team'
import TeamHeader from '@/modules/TeamHeader'
import TeamInfo from '@/modules/TeamInfo'
import TeamSquad from '@/modules/TeamSquad'
import { useRouter } from 'next/router'
import { getPrevAndNextIndex } from '@/utils/utils'
import useBreakpoint from '@/hooks/useBreakpoint'

type BasketballTeamPageRepo = {
    tournaments: TournamentDetails[]
    team: TeamDetails
    teamTournaments: TournamentDetails[]
    players: PlayerDetails[]
    events: EventDetails[]
    standings: TournamentStandings[]
}

type BasketballTeamPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

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

const BasketballTeamPage: NextPageWithLayout<BasketballTeamPageProps> = ({ repo }) => {
    const { isBig } = useBreakpoint()
    const { id } = useRouter().query
    const [selectedTab, setSelectedTab] = useState<'standings' | 'matches' | 'details' | 'squad'>('details')
    const [selectedEvent, setSelectedEvent] = useState<EventDetails | undefined>(undefined)
    const [selectedTournament, setSelectedTournament] = useState(repo.teamTournaments[0])
    const {
        data: incidents,
        isLoading: incidentsLoading,
        error: incidentsError,
    } = useSWR<EventIncident[]>(selectedEvent ? getEventIncidentsSwr(selectedEvent.id) : null)

    const [events, setEvents] = useState(repo.events)

    const index = useRef(0)
    const setIndex = (i: number) => {
        index.current = i
    }

    const { prev: prevIndex, next: nextIndex } = getPrevAndNextIndex(index.current)

    const {
        data: prev,
        isLoading: prevLoading,
        error: prevError,
    } = useSWR<EventDetails[]>(getTeamEventsSwr(repo.team.id, prevIndex.label, prevIndex.index))
    const {
        data: next,
        isLoading: nextLoading,
        error: nextError,
    } = useSWR<EventDetails[]>(getTeamEventsSwr(repo.team.id, nextIndex.label, nextIndex.index))

    const { data: standings, error: errorStandings } = useSWR<TournamentStandings[]>(
        selectedTournament !== repo.teamTournaments[0] ? getTournamentStandingsSwr(selectedTournament.id) : null,
        {
            fallbackData: repo.standings,
        }
    )

    const crumbs: Crumb[] = [
        {
            name: 'Basketball',
            link: '/basketball',
        },
        {
            name: repo.team.name,
            link: `/basketball/team/${repo.team.id}`,
        },
    ]

    useEffect(() => {
        setEvents(repo.events)
    }, [id])

    return (
        <>
            <Head>
                <title>{`${repo.team.name}`}</title>
                <meta name="description" content="Mini Sofascore app developed for Sofascore Academy 2024" />
            </Head>
            <Box ml={[0, 24]} mr={[0, 24]} mb={24}>
                <Breadcrumbs w="100%" crumbs={crumbs} display={['none', 'flex']} />
                <Flex flexDirection={['column', 'row']} gap={24} w="100%" alignItems="flex-start">
                    <Leagues w="calc((100% - 48px) / 3)" leagues={repo.tournaments} display={['none', 'flex']} />
                    <Flex
                        w={['100%', 'calc(((100% - 48px) / 3 * 2) + 24px)']}
                        justifyContent="flex-start"
                        flexDirection="column"
                        gap={12}
                    >
                        <TeamHeader
                            w="100%"
                            sport="basketball"
                            team={repo.team}
                            selectedTab={selectedTab}
                            setSelectedTab={setSelectedTab}
                            borderRadius={[0, 16]}
                        />
                        <Flex w="100%" justifyContent="flex-start" alignItems="flex-start" flexDirection="row" gap={24}>
                            {selectedTab === 'details' ? (
                                <TeamInfo
                                    team={repo.team}
                                    teamTournaments={repo.teamTournaments}
                                    nextEvent={repo.events.length === 0 ? undefined : repo.events[0]}
                                    totalPlayers={repo.players.length}
                                    foreignPlayers={
                                        repo.players.filter(p => p.country.id !== repo.team.country.id).length
                                    }
                                    w="100%"
                                />
                            ) : selectedTab === 'matches' ? (
                                <>
                                    <Matches
                                        w={['100%', 'calc((100% - 24px) / 2)']}
                                        ml={[8, 0]}
                                        mr={[8, 0]}
                                        events={events}
                                        loading={prevLoading || nextLoading}
                                        prev={prev}
                                        next={next}
                                        index={index.current}
                                        setIndex={setIndex}
                                        setSelected={setSelectedEvent}
                                        selected={selectedEvent?.id}
                                        setEvents={setEvents}
                                    />

                                    <AnimatePresence mode="wait">
                                        {selectedEvent && incidents && !incidentsLoading && isBig && (
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
                            ) : selectedTab === 'standings' ? (
                                <Standings
                                    w="100%"
                                    ml={[8, 0]}
                                    mr={[8, 0]}
                                    standings={standings ? standings : repo.standings}
                                    selected={selectedTournament}
                                    setSelected={setSelectedTournament}
                                    tournaments={repo.teamTournaments}
                                    teamId={repo.team.id}
                                    sport="football"
                                />
                            ) : (
                                <TeamSquad
                                    ml={[8, 0]}
                                    mr={[8, 0]}
                                    coach={repo.team.managerName ? repo.team.managerName : undefined}
                                    players={repo.players}
                                    sport="football"
                                    w="100%"
                                />
                            )}
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}

BasketballTeamPage.getLayout = function getLayout(page: ReactElement) {
    const { isSmall } = useBreakpoint()
    return <Layout noTabs={isSmall}>{page}</Layout>
}

export const getServerSideProps = (async context => {
    const { id } = context.query

    try {
        const tournaments = await getAvailableTournamentsForSport('basketball')
        const team = await getTeamDetails(Number(id))
        const teamTournaments = await getTeamTournaments(Number(id))
        const players = await getTeamPlayers(Number(id))
        const events = await getTeamEvents(Number(id), 'next', 0)
        const standings = await getTournamentStandings(teamTournaments[0].id)

        events.sort((a, b) => {
            const aDateTime = a.startDate ? DateTime.fromISO(a.startDate) : DateTime.invalid('Invalid Date')
            const bDateTime = b.startDate ? DateTime.fromISO(b.startDate) : DateTime.invalid('Invalid Date')
            if (aDateTime.isValid && bDateTime.isValid) {
                return aDateTime.toMillis() - bDateTime.toMillis()
            }
            return aDateTime.isValid ? -1 : 1
        })

        const repo = {
            tournaments,
            team,
            teamTournaments,
            players,
            events,
            standings,
        }

        return { props: { repo } }
    } catch (error) {
        return {
            notFound: true,
        }
    }
}) satisfies GetServerSideProps<{ repo: BasketballTeamPageRepo }>

export default BasketballTeamPage
