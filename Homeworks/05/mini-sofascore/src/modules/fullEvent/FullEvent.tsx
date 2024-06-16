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
import Breadcrumbs, { Crumb } from '@/components/Breadcrumbs'
import useBreakpoint from '@/hooks/useBreakpoint'
import { useTranslations } from 'next-intl'

export interface EventPopupProps extends FlexProps {
    event: EventDetails
    incidents: EventIncident[]
}

export default function FullEvent({ event, incidents, ...restProps }: EventPopupProps) {
    const t = useTranslations('FullEvent')
    const { isBig } = useBreakpoint()
    const periods = extractPeriods(event, incidents)
    const sport = event.tournament.sport.slug

    const crumbs: Crumb[] = [
        {
            name: t(sport),
            link: `/${sport}`,
        },
        {
            name: event.tournament.name,
            link: `/${sport}/league/${event.tournament.slug}/${event.tournament.id}`,
        },
        {
            name: `${event.homeTeam.name} vs ${event.awayTeam.name}`,
            link: `/${sport}/match/${event.slug}/${event.id}`,
        },
    ]

    return (
        <>
            <Flex
                w="100%"
                flexDirection="column"
                bg="colors.surface.s1"
                borderRadius={16}
                boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)"
                overflow="hidden"
                position={['sticky', 'static']}
                top={48}
                {...restProps}
                pb={16}
                zIndex={1000}
            >
                <Breadcrumbs ml={16} crumbs={crumbs} display={['flex', 'none']} />
                <EventHeroSection justifyContent={['space-evenly', 'space-between']} event={event} h={112} />
                {isBig && (
                    <>
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
                                        {t('noResult')}
                                    </Text>
                                </Flex>
                                <Link href={`/${sport}/league/${event.tournament.slug}/${event.tournament.id}`}>
                                    <SofaButton variant="stroked" icon="withoutIcon">
                                        {t('viewTournament')}
                                    </SofaButton>
                                </Link>
                            </Flex>
                        ) : (
                            <Flex w="100%" justifyContent="flex-start" flexDirection="column-reverse">
                                {periods.map(p => (
                                    <PeriodCell
                                        key={p.period}
                                        w="100%"
                                        status={event.status}
                                        period={p}
                                        sport={sport}
                                    ></PeriodCell>
                                ))}
                            </Flex>
                        )}
                    </>
                )}
            </Flex>
            {!isBig && (
                <Flex
                    mt={8}
                    ml={8}
                    mr={8}
                    w="calc(100% - 16px)"
                    justifyContent="flex-start"
                    flexDir="column"
                    borderRadius={16}
                    bg="colors.surface.s1"
                    boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)"
                    pb={16}
                >
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
                                    {t('noResult')}
                                </Text>
                            </Flex>
                            <Link href={`/${sport}/league/${event.tournament.slug}/${event.tournament.id}`}>
                                <SofaButton variant="stroked" icon="withoutIcon">
                                    {t('viewTournament')}
                                </SofaButton>
                            </Link>
                        </Flex>
                    ) : (
                        <Flex w="100%" justifyContent="flex-start" flexDirection="column-reverse">
                            {periods.map(p => (
                                <PeriodCell
                                    key={p.period}
                                    w="100%"
                                    status={event.status}
                                    period={p}
                                    sport={sport}
                                ></PeriodCell>
                            ))}
                        </Flex>
                    )}
                </Flex>
            )}
        </>
    )
}
