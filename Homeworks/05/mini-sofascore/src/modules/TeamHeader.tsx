import { getTeamImageSrc } from '@/api/teamApi'
import { getTournamentImageSrc } from '@/api/tournamentApi'
import Breadcrumbs, { Crumb } from '@/components/Breadcrumbs'
import SofaTabs, { SofaTab } from '@/components/SofaTabs'
import useBreakpoint from '@/hooks/useBreakpoint'
import { TeamDetails } from '@/models/team'
import { TournamentDetails } from '@/models/tournament'
import countries from '@/utils/countries'
import typography from '@/utils/typography'
import { Flex, Text, FlexProps, Image, Button } from '@kuma-ui/core'
import { useTranslations } from 'next-intl'
import React from 'react'

export interface TeamHeaderProps extends FlexProps {
    team: TeamDetails
    sport: 'football' | 'basketball' | 'american-football'
    selectedTab: 'matches' | 'standings' | 'details' | 'squad'
    setSelectedTab: (s: 'matches' | 'standings' | 'details' | 'squad') => void
}

export default function TeamHeader({ team, sport, selectedTab, setSelectedTab, ...restProps }: TeamHeaderProps) {
    const t = useTranslations('TeamHeader')
    const { isSmall } = useBreakpoint()

    const crumbs: Crumb[] = [
        {
            name: t(sport),
            link: `/${sport}`,
        },
        {
            name: team.name,
            link: `/${sport}/team/${team.id}`,
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
            zIndex={1000}
        >
            <Breadcrumbs crumbs={crumbs} display={['flex', 'none']} />
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
                    <Image src={getTeamImageSrc(team.id)} h={[40, 57]} w={[40, 57]} />
                </Flex>
                <Flex flexDirection="column" color="colors.onSurface.nLv1" gap={8}>
                    <Text {...heading}>{team.name}</Text>
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
            <SofaTabs mode="positive" h={48} w={['100%', 'auto']}>
                <Button w={['25%', 'auto']} variant="wrapper" onClick={() => setSelectedTab('details')}>
                    <SofaTab w="100%" mode="positive" selected={selectedTab === 'details'}>
                        <Flex gap="spacings.xs" flexDirection="row" justifyContent="center" alignItems="center">
                            <Text
                                {...typography.body}
                                color={selectedTab === 'details' ? 'colors.primary.default' : 'colors.onSurface.nLv2'}
                            >
                                {t('details')}
                            </Text>
                        </Flex>
                    </SofaTab>
                </Button>
                <Button w={['25%', 'auto']} variant="wrapper" onClick={() => setSelectedTab('matches')}>
                    <SofaTab w="100%" mode="positive" selected={selectedTab === 'matches'}>
                        <Flex gap="spacings.xs" flexDirection="row" justifyContent="center" alignItems="center">
                            <Text
                                {...typography.body}
                                color={selectedTab === 'matches' ? 'colors.primary.default' : 'colors.onSurface.nLv2'}
                            >
                                {t('matches')}
                            </Text>
                        </Flex>
                    </SofaTab>
                </Button>
                <Button w={['25%', 'auto']} variant="wrapper" onClick={() => setSelectedTab('standings')}>
                    <SofaTab w="100%" mode="positive" selected={selectedTab === 'standings'}>
                        <Flex gap="spacings.xs" flexDirection="row" justifyContent="center" alignItems="center">
                            <Text
                                {...typography.body}
                                color={selectedTab === 'standings' ? 'colors.primary.default' : 'colors.onSurface.nLv2'}
                            >
                                {t('standings')}
                            </Text>
                        </Flex>
                    </SofaTab>
                </Button>
                <Button w={['25%', 'auto']} variant="wrapper" onClick={() => setSelectedTab('squad')}>
                    <SofaTab w="100%" mode="positive" selected={selectedTab === 'squad'}>
                        <Flex gap="spacings.xs" flexDirection="row" justifyContent="center" alignItems="center">
                            <Text
                                {...typography.body}
                                color={selectedTab === 'squad' ? 'colors.primary.default' : 'colors.onSurface.nLv2'}
                            >
                                {t('squad')}
                            </Text>
                        </Flex>
                    </SofaTab>
                </Button>
            </SofaTabs>
        </Flex>
    )
}
