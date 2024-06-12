import SofaButton from '@/components/SofaButton'
import CloseIcon from '@/components/icons/CloseIcon'
import { EventDetails, EventIncident } from '@/models/event'
import { extractPeriods } from '@/utils/utils'
import { Flex, FlexProps, Box } from '@kuma-ui/core'
import React from 'react'
import PeriodCell from './modules/PeriodCell'
import EventHeroSection from './modules/EventHeroSection'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export interface EventPopupProps extends FlexProps {
    event: EventDetails
    incidents: EventIncident[]
    onClose: () => void
}

export default function EventPopup({ event, incidents, onClose, ...restProps }: EventPopupProps) {
    const t = useTranslations('EventPopup')
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
            <Flex
                w="100%"
                h={56}
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                pl={16}
                pr={16}
            >
                <Flex
                    justifyContent="center"
                    alignItems="center"
                    color="colors.onSurface.nLv1"
                    onClick={onClose}
                    cursor="pointer"
                >
                    <CloseIcon />
                </Flex>
                <Link href={`/${sport}/match/${event.slug}/${event.id}`}>
                    <SofaButton variant="unshielded">{t('viewFullPage')}</SofaButton>
                </Link>
            </Flex>
            <EventHeroSection event={event} h={112} />
            {event.status !== 'notstarted' && (
                <Box borderTop="1px solid" borderColor="colors.onSurface.nLv4" w="100%" />
            )}
            <Flex w="100%" justifyContent="flex-start" flexDirection="column-reverse">
                {periods.map(p => (
                    <PeriodCell key={p.period} w="100%" status={event.status} period={p} sport={sport}></PeriodCell>
                ))}
            </Flex>
        </Flex>
    )
}
