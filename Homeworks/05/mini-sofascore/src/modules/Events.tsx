import { EventForSportAndDate } from '@/models/sport'
import { Flex, FlexProps, Text, Image, Box } from '@kuma-ui/core'
import React, { useState } from 'react'
import DateSelector, { datesEqual } from './DateSelector'
import useSWR from 'swr'
import { getEventsForSportAndDateSwr } from '@/api/sportApi'
import typography from '@/utils/typography'
import { DateTime } from 'luxon'
import { getTournamentImageSrc } from '@/api/tournamentApi'
import PointerRight from '@/components/icons/PointerRight'
import { getTeamImageSrc } from '@/api/teamApi'
import { AnimatePresence, motion } from 'framer-motion'
import useBreakpoint from '@/hooks/useBreakpoint'
import { useRouter } from 'next/router'

export interface EventsProps extends FlexProps {
    events: EventForSportAndDate[]
    initialDate: DateTime
    sport: 'football' | 'basketball' | 'american-football'
    selected?: EventForSportAndDate
    setSelected: (event: EventForSportAndDate) => void
}

const MotionFlex = motion(Flex)

const variants = {
    initial: {
        height: 0,
    },
    animate: {
        height: 'auto',
    },
    exit: {
        height: 0,
    },
}

export default function Events({ events, initialDate, sport, selected, setSelected, ...restProps }: EventsProps) {
    const [selectedDate, setSelectedDate] = useState(initialDate)
    const { isSmall } = useBreakpoint()
    const router = useRouter()

    const { data, isLoading, error } = useSWR<EventForSportAndDate[]>(
        datesEqual(selectedDate, initialDate) ? null : getEventsForSportAndDateSwr(sport, selectedDate),
        {
            fallbackData: datesEqual(selectedDate, initialDate) ? events : undefined,
        }
    )
    const tournaments = getTournaments(data)

    const handleOnClickEvent = (event: EventForSportAndDate) => {
        setSelected(event)
        if (isSmall) {
            router.push(`/${sport}/match/${event.slug}?id=${event.id}`)
        }
    }

    return (
        <Flex
            {...restProps}
            justifyContent="flex-start"
            flexDirection="column"
            borderRadius="radii.xl"
            boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)"
            overflow="hidden"
            bg="colors.surface.s1"
            pb={16}
        >
            <DateSelector h={48} selected={selectedDate} setSelected={setSelectedDate} />

            {isLoading ? (
                <Flex
                    h={48}
                    justifyContent="center"
                    alignItems="center"
                    {...typography.body}
                    color="colors.onSurface.nLv2"
                >
                    Loading...
                </Flex>
            ) : (
                <Flex h={48} p="24px 16px 8px" {...typography.assistive} justifyContent="space-between">
                    <Text color="colors.onSurface.nLv1">
                        {datesEqual(DateTime.now(), selectedDate) ? 'TODAY' : selectedDate.toFormat('EEE dd MM')}
                    </Text>
                    <Text color="colors.onSurface.nLv2">{data?.length} events</Text>
                </Flex>
            )}
            <AnimatePresence mode="wait" initial={false}>
                {data !== undefined && (
                    <MotionFlex
                        key={selectedDate.toISO()}
                        display="flex"
                        flexDirection="column"
                        variants={variants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        {tournaments.map(
                            (tournament, index) =>
                                tournament && (
                                    <Flex
                                        key={`tournament-${tournament.id}`}
                                        flexDirection="column"
                                        justifyContent="flex-start"
                                    >
                                        {index !== 0 && (
                                            <Box
                                                borderBottom="1px solid"
                                                borderColor="colors.onSurface.nLv4"
                                                w="100%"
                                                mt={8}
                                            />
                                        )}
                                        <Flex
                                            justifyContent="flex-start"
                                            flexDirection="row"
                                            alignItems="center"
                                            h={56}
                                        >
                                            <Image src={getTournamentImageSrc(tournament.id)} w={32} h={32} ml={16} />
                                            <Flex
                                                {...typography.h3}
                                                justifyContent="flex-start"
                                                alignItems="center"
                                                ml={32}
                                                color="colors.onSurface.nLv2"
                                            >
                                                <Text as="h3" color="colors.onSurface.nLv1">
                                                    {tournament.country.name}
                                                </Text>
                                                <PointerRight width={24} height={24} />
                                                <Text as="h3" color="colors.onSurface.nLv2">
                                                    {tournament.name}
                                                </Text>
                                            </Flex>
                                        </Flex>

                                        {data.map(
                                            event =>
                                                event.tournament.id === tournament.id && (
                                                    <Event
                                                        event={event}
                                                        key={`event-${event.id}`}
                                                        selected={selected && selected.id}
                                                        onClick={() => handleOnClickEvent(event)}
                                                    />
                                                )
                                        )}
                                    </Flex>
                                )
                        )}
                    </MotionFlex>
                )}
            </AnimatePresence>
        </Flex>
    )
}

function getTournaments(events?: EventForSportAndDate[]) {
    if (!events) return []
    const tournamentIds = new Set(events?.map(event => event.tournament.id))
    const tournaments = Array.from(tournamentIds).map(
        id => events?.find(event => event.tournament.id === id)?.tournament
    )
    return tournaments
}

export interface EventProps extends FlexProps {
    event: EventForSportAndDate
    selected?: number
    onClick: () => void
}

export function Event({ event, selected, onClick, ...restProps }: EventProps) {
    return (
        <Flex
            {...restProps}
            h={56}
            flexDirection="row"
            cursor="pointer"
            bg={event.id === selected ? 'colors.primary.highlight' : 'default'}
            _hover={{
                bg: 'colors.primary.highlight',
            }}
            transition="all 0.3s ease"
            onClick={onClick}
        >
            <Flex
                w={64}
                {...typography.micro}
                color="colors.onSurface.nLv2"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
                flexDirection="column"
            >
                <Text>{event.startDate ? DateTime.fromISO(event.startDate).toFormat('HH:mm') : 'Unknown'}</Text>
                <Text>{event.status === 'finished' ? 'FT' : event.status === 'inprogress' ? 'LIVE' : '-'}</Text>
            </Flex>
            <Box borderRight="1px solid" borderColor="colors.onSurface.nLv4" h="calc(100% - 16px)" mt={8} />
            <Flex
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                {...typography.body}
                flex={1}
                gap={4}
            >
                <Flex
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    h={16}
                    w="100%"
                    pr={16}
                    pl={16}
                    color={event.winnerCode === 'away' ? 'colors.onSurface.nLv2' : 'colors.onSurface.nLv1'}
                >
                    <Flex flexDirection="row" justifyContent="flex-start" gap={8}>
                        <Image src={getTeamImageSrc(event.homeTeam.id)} w={16} h={16} />
                        <Text>{event.homeTeam.name}</Text>
                    </Flex>
                    <Text>{event.homeScore.total !== null && event.homeScore.total}</Text>
                </Flex>
                <Flex
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    h={16}
                    w="100%"
                    pr={16}
                    pl={16}
                    color={event.winnerCode === 'home' ? 'colors.onSurface.nLv2' : 'colors.onSurface.nLv1'}
                >
                    <Flex flexDirection="row" justifyContent="flex-start" gap={8}>
                        <Image src={getTeamImageSrc(event.awayTeam.id)} w={16} h={16} />
                        <Text>{event.awayTeam.name}</Text>
                    </Flex>
                    <Text>{event.awayScore.total !== null && event.awayScore.total}</Text>
                </Flex>
            </Flex>
        </Flex>
    )
}
