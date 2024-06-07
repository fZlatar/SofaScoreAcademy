import { EventDetails, EventIncident } from '@/models/event'
import { extractPeriods } from '@/utils/utils'
import { Flex, FlexProps, Box, Text } from '@kuma-ui/core'
import { useRouter } from 'next/router'
import React from 'react'
import EventHeroSection from '../eventPopup/modules/EventHeroSection'
import PeriodCell from '../eventPopup/modules/PeriodCell'
import typography from '@/utils/typography'
import SofaButton from '@/components/SofaButton'
import Link from 'next/link'

export interface EventPopupProps extends FlexProps {
    event: EventDetails
    incidents: EventIncident[]
}

export default function FullEvent({ event, incidents, ...restProps }: EventPopupProps) {
    const periods = extractPeriods(event, incidents)
    const sport = event.tournament.sport.slug

    return (
        <Flex
            w="100%"
            flexDirection="column"
            bg="colors.surface.s1"
            borderRadius={16}
            boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)"
            overflow="hidden"
            {...restProps}
            pb={16}
        >
            <EventHeroSection event={event} h={112} />
            <Box borderTop="1px solid" borderColor="colors.onSurface.nLv4" w="100%" />
            {event.status === 'notstarted' ? (
                <Flex
                    pt={16}
                    pb={32}
                    pr={8}
                    pl={8}
                    gap={16}
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Flex
                        h={52}
                        w="100%"
                        borderRadius={8}
                        bg="colors.surface.s2"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Text {...typography.bodyP} color="colors.onSurface.nLv2">
                            No results yet.
                        </Text>
                    </Flex>
                    <Link href={`/${sport}/league/${event.tournament.slug}/${event.tournament.id}`}>
                        <SofaButton variant="stroked" icon="withoutIcon">
                            View Tournament Details
                        </SofaButton>
                    </Link>
                </Flex>
            ) : (
                <Flex w="100%" justifyContent="flex-start" flexDirection="column-reverse">
                    {periods.map(p => (
                        <PeriodCell key={p.period} w="100%" status={event.status} period={p} sport={sport}></PeriodCell>
                    ))}
                </Flex>
            )}
        </Flex>
    )
}
