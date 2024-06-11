import { getTeamImageSrc } from '@/api/teamApi'
import { getTournamentImageSrc } from '@/api/tournamentApi'
import SofaTabs, { SofaTab } from '@/components/SofaTabs'
import { TeamDetails } from '@/models/team'
import { TournamentDetails } from '@/models/tournament'
import countries from '@/utils/countries'
import typography from '@/utils/typography'
import { Flex, Text, FlexProps, Image, Button } from '@kuma-ui/core'
import React from 'react'

export interface LeagueHeaderProps extends FlexProps {
    team: TeamDetails
    selectedTab: 'matches' | 'standings' | 'details' | 'squad'
    setSelectedTab: (s: 'matches' | 'standings' | 'details' | 'squad') => void
}

export default function LeagueHeader({ team, selectedTab, setSelectedTab, ...restProps }: LeagueHeaderProps) {
    return (
        <Flex
            {...restProps}
            justifyContent="flex-start"
            flexDirection="column"
            alignItems="flex-start"
            borderRadius={16}
            boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)"
            bg="colors.surface.s1"
            pl={16}
            pr={16}
            overflow="hidden"
        >
            <Flex h={112} gap={24} flexDirection="row" justifyContent="flex-start" alignItems="center">
                <Flex
                    justifyContent="center"
                    alignItems="center"
                    h={80}
                    w={80}
                    borderRadius={4}
                    border="1px solid"
                    borderColor="colors.onSurface.nLv3"
                >
                    <Image src={getTeamImageSrc(team.id)} h={57} w={57} />
                </Flex>
                <Flex flexDirection="column" color="colors.onSurface.nLv1" gap={8}>
                    <Text {...typography.h1Desktop}>{team.name}</Text>
                    <Flex gap={4}>
                        <Image
                            src={`https://www.sofascore.com/static/images/flags/${
                                countries.find(c => c.name === team.country.name)?.short
                            }.png`}
                            h={16}
                            w={16}
                        />
                        <Text {...typography.h3}>{team.country.name}</Text>
                    </Flex>
                </Flex>
            </Flex>
            <SofaTabs mode="positive" h={48}>
                <Button variant="wrapper" onClick={() => setSelectedTab('details')}>
                    <SofaTab mode="positive" selected={selectedTab === 'details'}>
                        <Flex gap="spacings.xs" flexDirection="row" justifyContent="center" alignItems="center">
                            <Text
                                {...typography.body}
                                color={selectedTab === 'details' ? 'colors.primary.default' : 'colors.onSurface.nLv2'}
                            >
                                Details
                            </Text>
                        </Flex>
                    </SofaTab>
                </Button>
                <Button variant="wrapper" onClick={() => setSelectedTab('matches')}>
                    <SofaTab mode="positive" selected={selectedTab === 'matches'}>
                        <Flex gap="spacings.xs" flexDirection="row" justifyContent="center" alignItems="center">
                            <Text
                                {...typography.body}
                                color={selectedTab === 'matches' ? 'colors.primary.default' : 'colors.onSurface.nLv2'}
                            >
                                Matches
                            </Text>
                        </Flex>
                    </SofaTab>
                </Button>
                <Button variant="wrapper" onClick={() => setSelectedTab('standings')}>
                    <SofaTab mode="positive" selected={selectedTab === 'standings'}>
                        <Flex gap="spacings.xs" flexDirection="row" justifyContent="center" alignItems="center">
                            <Text
                                {...typography.body}
                                color={selectedTab === 'standings' ? 'colors.primary.default' : 'colors.onSurface.nLv2'}
                            >
                                Standings
                            </Text>
                        </Flex>
                    </SofaTab>
                </Button>
                <Button variant="wrapper" onClick={() => setSelectedTab('squad')}>
                    <SofaTab mode="positive" selected={selectedTab === 'squad'}>
                        <Flex gap="spacings.xs" flexDirection="row" justifyContent="center" alignItems="center">
                            <Text
                                {...typography.body}
                                color={selectedTab === 'squad' ? 'colors.primary.default' : 'colors.onSurface.nLv2'}
                            >
                                Squad
                            </Text>
                        </Flex>
                    </SofaTab>
                </Button>
            </SofaTabs>
        </Flex>
    )
}
