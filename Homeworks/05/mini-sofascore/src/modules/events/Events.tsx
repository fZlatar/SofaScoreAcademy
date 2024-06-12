import { Flex, FlexProps, Text } from '@kuma-ui/core'
import React, { useState } from 'react'
import DateSelector, { datesEqual } from '../DateSelector'
import useSWR from 'swr'
import { getEventsForSportAndDateSwr } from '@/api/sportApi'
import typography from '@/utils/typography'
import { DateTime } from 'luxon'
import { AnimatePresence, motion } from 'framer-motion'
import useBreakpoint from '@/hooks/useBreakpoint'
import { useRouter } from 'next/router'
import TournamentEvents from './modules/TournamentEvents'
import { EventDetails } from '@/models/event'
import { useDateContext } from '@/context/DateContext'

export interface EventsProps extends FlexProps {
    events: EventDetails[]
    initialDate: DateTime
    sport: 'football' | 'basketball' | 'american-football'
    selected?: EventDetails
    setSelected: (event: EventDetails) => void
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
    const { dateFormat } = useDateContext()
    const [selectedDate, setSelectedDate] = useState(initialDate)
    const { isSmall } = useBreakpoint()
    const router = useRouter()

    const { data, isLoading, error } = useSWR<EventDetails[]>(
        datesEqual(selectedDate, initialDate) ? null : getEventsForSportAndDateSwr(sport, selectedDate),
        {
            fallbackData: datesEqual(selectedDate, initialDate) ? events : undefined,
        }
    )
    const tournaments = getTournaments(data)

    if (error) {
        router.push('/404')
    }

    const handleOnClickEvent = (event: EventDetails) => {
        setSelected(event)
        if (isSmall) {
            router.push(`/${sport}/match/${event.slug}/${event.id}`)
        }
    }

    return (
        <>
            <DateSelector
                w="100%"
                h={48}
                selected={selectedDate}
                setSelected={setSelectedDate}
                display={['flex', 'none']}
                position={['sticky', 'relative']}
                top={2 * 48}
                left={0}
            />
            {isLoading ? (
                <Flex
                    h={48}
                    w="100%"
                    justifyContent="center"
                    alignItems="center"
                    {...typography.body}
                    color="colors.onSurface.nLv2"
                    display={['flex', 'none']}
                >
                    Loading...
                </Flex>
            ) : (
                <Flex
                    h={48}
                    w="100%"
                    p="24px 16px 8px"
                    {...typography.assistive}
                    justifyContent="space-between"
                    display={['flex', 'none']}
                >
                    <Text color="colors.onSurface.nLv1">
                        {datesEqual(DateTime.now(), selectedDate)
                            ? 'TODAY'
                            : dateFormat === 'DD / MM / YYYY'
                            ? selectedDate.toFormat('EEE dd MM')
                            : selectedDate.toFormat('EEE MM dd')}
                    </Text>
                    <Text color="colors.onSurface.nLv2">{`${data?.length} events`}</Text>
                </Flex>
            )}
            <Flex
                {...restProps}
                justifyContent="flex-start"
                flexDirection="column"
                borderRadius="radii.xl"
                boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)"
                overflow="hidden"
                bg="colors.surface.s1"
                pb={data && !isLoading && data.length !== 0 ? 16 : 0}
                ml={[8, 0]}
                mr={[8, 0]}
            >
                <DateSelector
                    h={48}
                    selected={selectedDate}
                    setSelected={setSelectedDate}
                    position="relative"
                    display={['none', 'flex']}
                />

                {isLoading ? (
                    <Flex
                        h={48}
                        justifyContent="center"
                        alignItems="center"
                        {...typography.body}
                        color="colors.onSurface.nLv2"
                        display={['none', 'flex']}
                    >
                        Loading...
                    </Flex>
                ) : (
                    <Flex
                        h={48}
                        p="24px 16px 8px"
                        {...typography.assistive}
                        justifyContent="space-between"
                        display={['none', 'flex']}
                    >
                        <Text color="colors.onSurface.nLv1">
                            {datesEqual(DateTime.now(), selectedDate)
                                ? 'TODAY'
                                : dateFormat === 'DD / MM / YYYY'
                                ? selectedDate.toFormat('EEE dd MM')
                                : selectedDate.toFormat('EEE MM dd')}
                        </Text>
                        <Text color="colors.onSurface.nLv2">{`${data?.length} events`}</Text>
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
                                        <TournamentEvents
                                            key={`tEvents-${tournament.id}`}
                                            tournament={tournament}
                                            index={index}
                                            data={data}
                                            selected={selected}
                                            handleOnClickEvent={handleOnClickEvent}
                                        />
                                    )
                            )}
                        </MotionFlex>
                    )}
                </AnimatePresence>
            </Flex>
        </>
    )
}

function getTournaments(events?: EventDetails[]) {
    if (!events) return []
    const tournamentIds = new Set(events?.map(event => event.tournament.id))
    const tournaments = Array.from(tournamentIds).map(
        id => events?.find(event => event.tournament.id === id)?.tournament
    )
    return tournaments
}
