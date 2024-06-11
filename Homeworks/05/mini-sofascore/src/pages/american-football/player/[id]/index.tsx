import { getEventIncidentsSwr } from '@/api/eventApi'
import { getAvailableTournamentsForSport } from '@/api/sportApi'
import Breadcrumbs, { Crumb } from '@/components/Breadcrumbs'
import { EventDetails, EventIncident } from '@/models/event'
import { TournamentDetails } from '@/models/tournament'
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
import { PlayerDetails } from '@/models/player'
import { useRouter } from 'next/router'
import { getPlayerDetails, getPlayerEvents, getPlayerEventsSwr } from '@/api/playerApi'
import { getPrevAndNextIndex } from '@/utils/utils'
import PlayerHeader from '@/modules/PlayerHeader'
import useBreakpoint from '@/hooks/useBreakpoint'

type AmericanFootballPlayerPageRepo = {
    tournaments: TournamentDetails[]
    player: PlayerDetails
    events: EventDetails[]
}

type AmericanFootballPlayerPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

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

const AmericanFootballPlayerPage: NextPageWithLayout<AmericanFootballPlayerPageProps> = ({ repo }) => {
    const { isBig } = useBreakpoint()
    const { id } = useRouter().query
    const [selectedEvent, setSelectedEvent] = useState<EventDetails | undefined>(undefined)
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
    } = useSWR<EventDetails[]>(getPlayerEventsSwr(repo.player.id, prevIndex.label, prevIndex.index))
    const {
        data: next,
        isLoading: nextLoading,
        error: nextError,
    } = useSWR<EventDetails[]>(getPlayerEventsSwr(repo.player.id, nextIndex.label, nextIndex.index))

    const crumbs: Crumb[] = [
        {
            name: 'Am. Football',
            link: '/american-football',
        },
        {
            name: repo.player.name,
            link: `/american-football/player/${repo.player.id}`,
        },
    ]

    useEffect(() => {
        setEvents(repo.events)
    }, [id])

    return (
        <>
            <Head>
                <title>{`${repo.player.name}`}</title>
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
                        gap={[0, 12]}
                    >
                        <PlayerHeader player={repo.player} sport="american-football" w="100%" borderRadius={[0, 16]} />
                        <Flex
                            w="100%"
                            ml={[8, 0]}
                            mr={[8, 0]}
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            flexDirection={['column', 'row']}
                            gap={24}
                        >
                            <Matches
                                w={['calc(100% - 16px)', 'calc((100% - 24px) / 2)']}
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
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}

AmericanFootballPlayerPage.getLayout = function getLayout(page: ReactElement) {
    const { isSmall } = useBreakpoint()
    return <Layout noTabs={isSmall}>{page}</Layout>
}

export const getServerSideProps = (async context => {
    const { id } = context.query

    try {
        const tournaments = await getAvailableTournamentsForSport('american-football')
        const player = await getPlayerDetails(Number(id))
        const events = await getPlayerEvents(Number(id), 'next', 0)

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
            player,
            events,
        }

        return { props: { repo } }
    } catch (error) {
        return {
            notFound: true,
        }
    }
}) satisfies GetServerSideProps<{ repo: AmericanFootballPlayerPageRepo }>

export default AmericanFootballPlayerPage
