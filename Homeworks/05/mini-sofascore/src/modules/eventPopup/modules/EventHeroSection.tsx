import { getTeamImageSrc } from '@/api/teamApi'
import useBreakpoint from '@/hooks/useBreakpoint'
import { EventDetails } from '@/models/event'
import typography from '@/utils/typography'
import { Image, Flex, FlexProps, Text, styled } from '@kuma-ui/core'
import { DateTime } from 'luxon'
import Link from 'next/link'
import React from 'react'

export interface EventHeroSectionProps extends FlexProps {
    event: EventDetails
}
const StyledContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    gap: 8px;
    color: t('colors.onSurface.nLv1');
    width: 96px;
    @media (max-width: 1000px) {
        width: 80px;
    }
    @media (max-width: 950px) {
        width: 70px;
    }
`

export default function EventHeroSection({ event, ...restProps }: EventHeroSectionProps) {
    const { isSmall } = useBreakpoint(1000)
    return (
        <Flex p={16} {...restProps} flexDirection="row" justifyContent="space-between" alignItems="center">
            <Link href={`/${event.tournament.sport.slug}/team/${event.homeTeam.id}`}>
                <StyledContainer>
                    <Image src={getTeamImageSrc(event.homeTeam.id)} w={40} h={40} />
                    <Text {...typography.assistive} textAlign="center">
                        {event.homeTeam.name}
                    </Text>
                </StyledContainer>
            </Link>
            <Flex
                justifyContent="flex-start"
                alignItems="center"
                flexDirection="column"
                color={event.status === 'inprogress' ? 'colors.specific.live' : 'colors.onSurface.nLv1'}
            >
                {event.status === 'notstarted' && event.startDate ? (
                    <Flex
                        justifyContent="flex-start"
                        alignItems="center"
                        textAlign="center"
                        flexDirection="column"
                        pt={8}
                        gap={4}
                        {...typography.micro}
                    >
                        <Text>{DateTime.fromISO(event.startDate).toFormat('dd.MM.yyyy.')}</Text>
                        <Text>{DateTime.fromISO(event.startDate).toFormat('HH:mm')}</Text>
                    </Flex>
                ) : (
                    <>
                        <Flex h={40} flexDirection="row" justifyContent="center" alignItems="center">
                            <Text {...(isSmall ? typography.h1 : typography.h1Desktop)}>
                                {event.homeScore.total} - {event.awayScore.total}
                            </Text>
                        </Flex>
                        <Text {...typography.micro}>
                            {event.status === 'finished' ? 'FT' : event.status === 'inprogress' ? 'LIVE' : 'NS'}
                        </Text>
                    </>
                )}
            </Flex>
            <Link href={`/${event.tournament.sport.slug}/team/${event.awayTeam.id}`}>
                <StyledContainer>
                    <Image src={getTeamImageSrc(event.awayTeam.id)} w={40} h={40} />
                    <Text {...typography.assistive} textAlign="center">
                        {event.awayTeam.name}
                    </Text>
                </StyledContainer>
            </Link>
        </Flex>
    )
}
