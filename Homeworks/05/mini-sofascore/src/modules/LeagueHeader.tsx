import { getTournamentImageSrc } from '@/api/tournamentApi'
import Breadcrumbs, { Crumb } from '@/components/Breadcrumbs'
import SofaTabs, { SofaTab } from '@/components/SofaTabs'
import useBreakpoint from '@/hooks/useBreakpoint'
import { TournamentDetails } from '@/models/tournament'
import countries from '@/utils/countries'
import typography from '@/utils/typography'
import { Flex, Text, FlexProps, Image, Button } from '@kuma-ui/core'
import React from 'react'

export interface LeagueHeaderProps extends FlexProps {
    league: TournamentDetails
    selectedTab: 'matches' | 'standings'
    setSelectedTab: (s: 'matches' | 'standings') => void
}

export default function LeagueHeader({ league, selectedTab, setSelectedTab, ...restProps }: LeagueHeaderProps) {
    const { isSmall } = useBreakpoint()

    const sport =
        league.sport.slug === 'football'
            ? 'Football'
            : league.sport.slug === 'basketball'
            ? 'Basketball'
            : 'Am. Football'

    const crumbs: Crumb[] = [
        {
            name: sport,
            link: `/${league.sport.slug}`,
        },
        {
            name: league.name,
            link: `/${league.sport.slug}/league/${league.slug}/${league.id}`,
        },
    ]

    const heading = isSmall ? typography.h1 : typography.h1Desktop

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
            position={['sticky', 'static']}
            top={48}
        >
            <Breadcrumbs h={48} crumbs={crumbs} display={['flex', 'none']} />
            <Flex h={[64, 112]} gap={24} flexDirection="row" justifyContent="flex-start" alignItems="center">
                <Flex
                    justifyContent="center"
                    alignItems="center"
                    h={[56, 80]}
                    w={[56, 80]}
                    borderRadius={4}
                    border="1px solid"
                    borderColor="colors.onSurface.nLv3"
                >
                    <Image src={getTournamentImageSrc(league.id)} h={[40, 57]} w={[40, 57]} />
                </Flex>
                <Flex flexDirection="column" color="colors.onSurface.nLv1" gap={8}>
                    <Text {...heading}>{league.name}</Text>
                    <Flex gap={4}>
                        <Image
                            src={`https://www.sofascore.com/static/images/flags/${
                                countries.find(c => c.name === league.country.name)?.short
                            }.png`}
                            h={16}
                            w={16}
                        />
                        <Text {...typography.h3}>{league.country.name}</Text>
                    </Flex>
                </Flex>
            </Flex>
            <SofaTabs mode="positive" h={48} w={['100%', 'auto']}>
                <Button w={['50%', 'auto']} variant="wrapper" onClick={() => setSelectedTab('matches')}>
                    <SofaTab w="100%" mode="positive" selected={selectedTab === 'matches'}>
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
                <Button w={['50%', 'auto']} variant="wrapper" onClick={() => setSelectedTab('standings')}>
                    <SofaTab w="100%" mode="positive" selected={selectedTab === 'standings'}>
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
            </SofaTabs>
        </Flex>
    )
}
