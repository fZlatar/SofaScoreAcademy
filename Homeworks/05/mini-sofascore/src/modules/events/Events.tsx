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

    const handleOnClickEvent = (event: EventDetails) => {
        setSelected(event)
        if (isSmall) {
            router.push(`/${sport}/match/${event.slug}/${event.id}`)
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
