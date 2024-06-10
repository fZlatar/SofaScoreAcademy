import { Button, Flex, FlexProps, Text } from '@kuma-ui/core'
import React from 'react'
import typography from '@/utils/typography'
import { EventDetails } from '@/models/event'
import ChevronLeft from '@/components/icons/ChevronLeft'
import ChevronRight from '@/components/icons/ChevronRight'
import Event from './events/modules/Event'
import { DateTime } from 'luxon'

interface Current {
    label: 'next' | 'last'
    index: number
}

export interface MatchesProps extends FlexProps {
    events: EventDetails[]
    prev?: EventDetails[]
    next?: EventDetails[]
    loading: boolean
    selected?: number
    setSelected: (event: EventDetails) => void
    setEvents: (events: EventDetails[]) => void
    index: number
    setIndex: (i: number) => void
}

const buttonStyles = {
    border: '2px solid',
    borderColor: 'colors.primary.default',
    borderRadius: 'radii.xs',
    h: 40,
    w: 56,
    bg: 'colors.surface.s1',
    color: 'colors.primary.default',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: '8px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    _hover: {
        bg: 'colors.surface.s0',
    },
    _disabled: {
        bg: 'colors.surface.s1',
        opacity: 0.4,
    },
}

export default function Matches({
    events,
    prev,
    next,
    selected,
    setSelected,
    setEvents,
    loading,
    index,
    setIndex,
    ...restProps
}: MatchesProps) {
    const eventsSorted = eventsInRounds(events)

    return (
        <Flex
            {...restProps}
            justifyContent="flex-start"
            flexDirection="column"
            borderRadius="radii.xl"
            boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)"
            overflow="hidden"
            bg="colors.surface.s1"
            pt={12}
            pb={16}
        >
            <Flex
                h={48}
                pt={8}
                pb={8}
                pl={16}
                pr={16}
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Button
                    {...buttonStyles}
                    onClick={() => {
                        setEvents(prev ? prev : events)
                        setIndex(index - 1)
                    }}
                    disabled={prev?.length === 0 || loading}
                >
                    <ChevronLeft />
                </Button>
                <Text {...typography.h2} color="colors.onSurface.nLv1" textAlign="center">
                    Matches
                </Text>
                <Button
                    {...buttonStyles}
                    onClick={() => {
                        setEvents(next ? next : events)
                        setIndex(index + 1)
                    }}
                    disabled={next?.length === 0 || loading}
                >
                    <ChevronRight />
                </Button>
            </Flex>
            {prev === undefined || next === undefined ? (
                <Flex h={48} w="100%">
                    Loading...
                </Flex>
            ) : (
                eventsSorted.map(r => (
                    <Flex key={r.round} justifyContent="flex-start" flexDirection="column">
                        <Flex
                            h={48}
                            w="100%"
                            p="8px 16px"
                            justifyContent="flex-end"
                            flexDirection="column"
                            alignItems="flex-start"
                        >
                            <Text {...typography.assistive} color="colors.onSurface.nLv1">
                                Round {r.round}
                            </Text>
                        </Flex>
                        {r.events.map(e => (
                            <Event
                                key={`event-${e.id}`}
                                h={56}
                                w="100%"
                                event={e}
                                selected={selected}
                                onClick={() => setSelected(e)}
                            />
                        ))}
                    </Flex>
                ))
            )}
        </Flex>
    )
}

function eventsInRounds(events: EventDetails[]) {
    let rounds = events.map(e => e.round)

    rounds = rounds.filter((round, index, self) => self.indexOf(round) === index)

    const eventsInRoundsObj = rounds
        .map(r => {
            return {
                round: r,
                events: events
                    .filter(e => e.round === r)
                    .sort((a, b) => {
                        const aDateTime = a.startDate ? DateTime.fromISO(a.startDate) : DateTime.invalid('Invalid Date')
                        const bDateTime = b.startDate ? DateTime.fromISO(b.startDate) : DateTime.invalid('Invalid Date')
                        if (aDateTime.isValid && bDateTime.isValid) {
                            return aDateTime.toMillis() - bDateTime.toMillis()
                        }
                        return aDateTime.isValid ? -1 : 1
                    }),
            }
        })
        .sort((a, b) => a.round - b.round)

    return eventsInRoundsObj
}
