import { getTournamentImageSrc } from '@/api/tournamentApi'
import SofaSelector, { SofaOptionItem } from '@/components/SofaSelector'
import { TournamentDetails, TournamentStandings } from '@/models/tournament'
import typography from '@/utils/typography'
import { Image, Flex, FlexProps, Text } from '@kuma-ui/core'
import { useTranslations } from 'next-intl'
import React from 'react'

export interface StandingsProps extends FlexProps {
    standings: TournamentStandings[]
    sport: 'basketball' | 'football' | 'american-football'
    tournaments?: TournamentDetails[]
    selected?: TournamentDetails
    setSelected?: (t: TournamentDetails) => void
    teamId?: number
}

const containerStyles: Partial<FlexProps> = {
    flexDirection: 'column',
    bg: 'colors.surface.s1',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.08)',
    borderRadius: 16,
    overflow: 'hidden',
    pb: 16,
    ...typography.tabular,
}

export default function Standings({
    standings,
    sport,
    tournaments,
    selected,
    setSelected,
    teamId,
    ...restProps
}: StandingsProps) {
    const t = useTranslations('Standings')
    const sortedStandings = standings.find(s => s.type === 'total')?.sortedStandingsRows

    return (
        <Flex {...restProps} {...containerStyles}>
            {tournaments && tournaments.length !== 0 && selected && setSelected && (
                <Flex
                    ml={8}
                    mr={9}
                    mt={8}
                    pl={8}
                    pr={8}
                    justifyContent="flex-start"
                    alignItems="center"
                    h={48}
                    w="calc(100% - 16px)"
                    borderRadius={8}
                    bg="colors.surface.s2"
                >
                    <SofaSelector
                        mode="mode2"
                        selected={selected?.name}
                        selectedIcon={<Image src={getTournamentImageSrc(selected.id)} />}
                    >
                        {tournaments.map(t => (
                            <SofaOptionItem
                                key={t.id}
                                icon={<Image src={getTournamentImageSrc(t.id)} />}
                                label={t.name}
                                onClick={() => setSelected(t)}
                            />
                        ))}
                    </SofaSelector>
                </Flex>
            )}
            <Flex
                justifyContent="space-between"
                alignItems="center"
                flexDirection="row"
                color="colors.onSurface.nLv2"
                h={48}
                pl={16}
                pr={16}
            >
                <Flex justifyContent="flex-start" alignItems="center" flexDirection="row" gap={16}>
                    <Text ml={8} mr={8} w={8} textAlign="center">
                        #
                    </Text>
                    <Text>{t('team')}</Text>
                </Flex>
                <Flex justifyContent="space-evenly" alignItems="center" flexDirection="row" w="50%" textAlign="center">
                    {sport === 'football' ? (
                        <>
                            <Text w="calc(100% / 6)">P</Text>
                            <Text w="calc(100% / 6)">W</Text>
                            <Text w="calc(100% / 6)">D</Text>
                            <Text w="calc(100% / 6)">L</Text>
                            <Text w="calc(100% / 6)">{t('goals')}</Text>
                            <Text w="calc(100% / 6)">PTS</Text>
                        </>
                    ) : sport === 'basketball' ? (
                        <>
                            <Text w="calc(100% / 7)">P</Text>
                            <Text w="calc(100% / 7)">W</Text>
                            <Text w="calc(100% / 7)">L</Text>
                            <Text w="calc(100% / 7)">DIFF</Text>
                            <Text w="calc(100% / 7)">PCT</Text>
                        </>
                    ) : (
                        <>
                            <Text w="calc(100% / 5)">P</Text>
                            <Text w="calc(100% / 5)">W</Text>
                            <Text w="calc(100% / 5)">D</Text>
                            <Text w="calc(100% / 5)">L</Text>
                            <Text w="calc(100% / 5)">PCT</Text>
                        </>
                    )}
                </Flex>
            </Flex>
            {sortedStandings?.map((standing, index) => (
                <Standing sortedStanding={standing} index={index + 1} key={standing.id} sport={sport} teamId={teamId} />
            ))}
        </Flex>
    )
}

export interface SortedStandings {
    id: number
    team: {
        id: number
        name: string
        country: {
            id: number
            name: string
        }
    }
    points: number | null
    scoresFor: number
    scoresAgainst: number
    played: number
    wins: number
    draws: number
    losses: number
    percentage: number | null
}

export interface StandingProps extends FlexProps {
    sortedStanding: SortedStandings
    index: number
    sport: 'basketball' | 'football' | 'american-football'
    teamId?: number
}

export function Standing({ sortedStanding, index, sport, teamId, ...restProps }: StandingProps) {
    return (
        <Flex
            {...restProps}
            justifyContent="space-between"
            alignItems="center"
            flexDirection="row"
            color="colors.onSurface.nLv1"
            bg={sortedStanding.team.id === teamId ? 'colors.primary.highlight' : 'initial'}
            h={48}
            pl={16}
            pr={16}
        >
            <Flex justifyContent="flex-start" alignItems="center" flexDirection="row" gap={16}>
                <Flex
                    w={24}
                    h={24}
                    borderRadius="100%"
                    bg={sortedStanding.team.id === teamId ? 'colors.surface.s1' : 'colors.secondary.default'}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Text>{index}</Text>
                </Flex>
                <Text>{sortedStanding.team.name}</Text>
            </Flex>
            <Flex justifyContent="space-evenly" alignItems="center" flexDirection="row" w="50%" textAlign="center">
                {sport === 'football' ? (
                    <>
                        <Text w="calc(100% / 6)">{sortedStanding.played}</Text>
                        <Text w="calc(100% / 6)">{sortedStanding.wins}</Text>
                        <Text w="calc(100% / 6)">{sortedStanding.draws}</Text>
                        <Text w="calc(100% / 6)">{sortedStanding.losses}</Text>
                        <Text w="calc(100% / 6)">
                            {sortedStanding.scoresFor}:{sortedStanding.scoresAgainst}
                        </Text>
                        <Text w="calc(100% / 6)">{sortedStanding.points}</Text>
                    </>
                ) : sport === 'basketball' ? (
                    <>
                        <Text w="calc(100% / 7)">{sortedStanding.played}</Text>
                        <Text w="calc(100% / 7)">{sortedStanding.wins}</Text>
                        <Text w="calc(100% / 7)">{sortedStanding.losses}</Text>
                        <Text w="calc(100% / 7)">{sortedStanding.scoresFor - sortedStanding.scoresAgainst}</Text>
                        <Text w="calc(100% / 7)">{sortedStanding.percentage?.toFixed(3)}</Text>
                    </>
                ) : (
                    <>
                        <Text w="calc(100% / 5)">{sortedStanding.played}</Text>
                        <Text w="calc(100% / 5)">{sortedStanding.wins}</Text>
                        <Text w="calc(100% / 5)">{sortedStanding.draws}</Text>
                        <Text w="calc(100% / 5)">{sortedStanding.losses}</Text>
                        <Text w="calc(100% / 5)">{sortedStanding.percentage?.toFixed(3)}</Text>
                    </>
                )}
            </Flex>
        </Flex>
    )
}
