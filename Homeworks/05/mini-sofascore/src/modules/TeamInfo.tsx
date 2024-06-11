import { getTournamentImageSrc } from '@/api/tournamentApi'
import NoImage from '@/components/icons/NoImage'
import People from '@/components/icons/People'
import PieChart from '@/components/icons/PieChart'
import { EventDetails } from '@/models/event'
import { TeamDetails } from '@/models/team'
import { TournamentDetails } from '@/models/tournament'
import typography from '@/utils/typography'
import { Flex, FlexProps, Text, Image } from '@kuma-ui/core'
import Link from 'next/link'
import React from 'react'
import Event from '@/modules/events/modules/Event'
import { useRouter } from 'next/router'
import PointerRight from '@/components/icons/PointerRight'

export interface TeamInfoProps extends FlexProps {
    team: TeamDetails
    teamTournaments: TournamentDetails[]
    nextEvent?: EventDetails
    totalPlayers: number
    foreignPlayers: number
}

export default function TeamInfo({
    team,
    teamTournaments,
    nextEvent,
    totalPlayers,
    foreignPlayers,
    ...restProps
}: TeamInfoProps) {
    const router = useRouter()
    return (
        <Flex {...restProps} flexDirection="row" justifyContent="flex-start" gap={24}>
            <Flex w="calc((100% - 24px) / 2)" gap={12} flexDirection="column">
                <Flex
                    bg="colors.surface.s1"
                    borderRadius={16}
                    boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)"
                    w="100%"
                    flexDirection="column"
                    pb={28}
                >
                    <Flex h={48} justifyContent="center" alignItems="center">
                        <Text as="h2" {...typography.h2} color="colors.onSurface.nLv1">
                            Team Info
                        </Text>
                    </Flex>
                    <Flex
                        h={56}
                        w="100%"
                        justifyContent="flex-start"
                        alignItems="center"
                        pl={16}
                        pr={16}
                        color="colors.primary.default"
                        gap={16}
                    >
                        <NoImage width={40} height={40} />
                        <Text {...typography.body} color="colors.onSurface.nLv1">
                            Coach: {team.managerName}
                        </Text>
                    </Flex>
                    <Flex flexDirection="row" borderTop="1px solid" borderColor="colors.onSurface.nLv4">
                        <Flex
                            w="50%"
                            justifyContent="center"
                            alignItems="center"
                            p="8px 12px"
                            color="colors.primary.default"
                            flexDirection="column"
                        >
                            <People width={40} height={40} />
                            <Text as="h3" {...typography.h3} mt={8} mb={4}>
                                {totalPlayers}
                            </Text>
                            <Flex justifyContent="center" alignItems="center" h={32}>
                                <Text {...typography.micro} color="colors.onSurface.nLv2">
                                    Total players
                                </Text>
                            </Flex>
                        </Flex>
                        <Flex
                            w="50%"
                            justifyContent="center"
                            alignItems="center"
                            p="8px 12px"
                            color="colors.primary.default"
                            flexDirection="column"
                        >
                            <PieChart width={40} height={40} percentage={foreignPlayers / totalPlayers} />
                            <Text as="h3" {...typography.h3} mt={8} mb={4}>
                                {foreignPlayers}
                            </Text>
                            <Flex justifyContent="center" alignItems="center" h={32}>
                                <Text {...typography.micro} color="colors.onSurface.nLv2">
                                    Foreign players
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex
                    bg="colors.surface.s1"
                    borderRadius={16}
                    boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)"
                    flexDirection="column"
                    color="colors.onSurface.nLv1"
                    pb={16}
                    w="100%"
                >
                    <Flex h={48} justifyContent="center" alignItems="center">
                        <Text as="h2" {...typography.h2}>
                            Venue
                        </Text>
                    </Flex>
                    <Flex
                        h={32}
                        justifyContent="space-between"
                        alignItems="center"
                        pl={16}
                        pr={16}
                        {...typography.body}
                    >
                        <Text>Stadium</Text>
                        <Text>{team.venue}</Text>
                    </Flex>
                </Flex>
            </Flex>
            <Flex w="calc((100% - 24px) / 2)" gap={12} flexDirection="column">
                <Flex w="100%" flexDirection="column" borderRadius={16} bg="colors.surface.s1" pb={16}>
                    <Flex h={48} justifyContent="center" alignItems="center">
                        <Text as="h2" {...typography.h2}>
                            Tournaments
                        </Text>
                    </Flex>
                    <Flex justifyContent="center" alignItems="center" flexWrap="wrap" flexDirection="row">
                        {teamTournaments.map(t => (
                            <Link href={`/${t.sport.slug}/league/${t.slug}/${t.id}`}>
                                <Flex
                                    flexDirection="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    p="8px 12px 12px 12px"
                                    gap={4}
                                >
                                    <Image w={40} h={40} src={getTournamentImageSrc(t.id)} />
                                    <Flex justifyContent="center" alignItems="center">
                                        <Text {...typography.micro} color="colors.onSurface.nLv2">
                                            {t.name}
                                        </Text>
                                    </Flex>
                                </Flex>
                            </Link>
                        ))}
                    </Flex>
                </Flex>
                <Flex w="100%" flexDirection="column" borderRadius={16} bg="colors.surface.s1" pb={16}>
                    <Flex h={48} justifyContent="center" alignItems="center">
                        <Text as="h2" {...typography.h2}>
                            Next match
                        </Text>
                    </Flex>
                    {nextEvent ? (
                        <Flex flexDirection="column">
                            <Flex
                                justifyContent="flex-start"
                                flexDirection="row"
                                alignItems="center"
                                pl={16}
                                pr={16}
                                gap={32}
                                color="colors.onSurface.nLv2"
                                {...typography.h3}
                                h={56}
                            >
                                <Image w={32} h={32} src={getTournamentImageSrc(nextEvent.tournament.id)} />
                                <Flex justifyContent="flex-start" alignItems="center" overflow="hidden">
                                    <Text as="h3" color="colors.onSurface.nLv1">
                                        {nextEvent.tournament.country.name}
                                    </Text>
                                    <PointerRight width={24} height={24} />
                                    <Text
                                        as="h3"
                                        color="colors.onSurface.nLv2"
                                        whiteSpace="nowrap"
                                        textOverflow="ellipsis"
                                    >
                                        {nextEvent.tournament.name}
                                    </Text>
                                </Flex>
                            </Flex>
                            <Event
                                event={nextEvent}
                                dateAndTime
                                onClick={() =>
                                    router.push(
                                        `/${nextEvent.tournament.sport.slug}/match/${nextEvent.slug}/${nextEvent.id}`
                                    )
                                }
                            />
                        </Flex>
                    ) : (
                        <Flex
                            justifyContent="center"
                            alignItems="center"
                            color="colors.onSurface.nLv1"
                            {...typography.body}
                        >
                            <Text>Not Available</Text>
                        </Flex>
                    )}
                </Flex>
            </Flex>
        </Flex>
    )
}
