import { getPlayerImageSrc } from '@/api/playerApi'
import Breadcrumbs, { Crumb } from '@/components/Breadcrumbs'
import NoImage from '@/components/icons/NoImage'
import useBreakpoint from '@/hooks/useBreakpoint'
import { PlayerDetails } from '@/models/player'
import countries from '@/utils/countries'
import typography from '@/utils/typography'
import { Flex, Text, FlexProps, Image, Button } from '@kuma-ui/core'
import React, { useState } from 'react'

export interface PlayerHeaderProps extends FlexProps {
    player: PlayerDetails
    sport: 'football' | 'basketball' | 'american-football'
}

export default function PlayerHeader({ player, sport, ...restProps }: PlayerHeaderProps) {
    const { isSmall } = useBreakpoint()
    const [imageError, setImageError] = useState(false)

    const heading = isSmall ? typography.h1 : typography.h1Desktop

    const sportBig = sport === 'football' ? 'Football' : sport === 'basketball' ? 'Basketball' : 'Am. Football'

    const crumbs: Crumb[] = [
        {
            name: sportBig,
            link: `/${sport}`,
        },
        {
            name: player.name,
            link: `/${sport}/player/${player.id}`,
        },
    ]

    return (
        <>
            <Flex
                {...restProps}
                justifyContent="flex-start"
                flexDirection="column"
                alignItems="flex-start"
                borderRadius={16}
                boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)"
                bg="colors.surface.s1"
                overflow="hidden"
                pb={24}
                position={['sticky', 'static']}
                top={48}
            >
                <Breadcrumbs crumbs={crumbs} ml={16} mr={16} display={['flex', 'none']} />
                <Flex
                    w="100%"
                    justifyContent="flex-start"
                    flexDir="row"
                    alignItems="center"
                    p={16}
                    pt={[0, 16]}
                    pb={[0, 16]}
                    gap={24}
                >
                    <Flex
                        h={[56, 80]}
                        w={[56, 80]}
                        justifyContent="center"
                        alignItems="center"
                        border="1px solid"
                        borderColor="colors.onSurface.nLv3"
                        borderRadius={4}
                    >
                        {imageError ? (
                            <NoImage width={isSmall ? 40 : 60} height={isSmall ? 40 : 60} />
                        ) : (
                            <Image
                                h={[40, 60]}
                                w={[40, 60]}
                                src={getPlayerImageSrc(player.id)}
                                onError={() => setImageError(true)}
                            />
                        )}
                    </Flex>
                    <Text color="colors.onSurface.nLv1" {...heading}>
                        {player.name}
                    </Text>
                </Flex>
                {!isSmall && (
                    <Flex w="100%" alignItems="center" justifyContent="flex-start" flexDir="row">
                        <Flex
                            w="calc(100% / 2)"
                            h={64}
                            justifyContent="center"
                            alignItems="center"
                            p="4px 20px 4px 20px"
                        >
                            <Flex
                                h="100%"
                                w="100%"
                                justifyContent="center"
                                alignItems="center"
                                flexDir="column"
                                gap={4}
                                borderRadius={4}
                                bg="colors.secondary.highlight"
                            >
                                <Text {...typography.assistive} color="colors.onSurface.nLv2">
                                    Nationality
                                </Text>
                                <Flex h={16} flexDir="row" justifyContent="flex-start" alignItems="center" gap={4}>
                                    <Image
                                        h={16}
                                        w={16}
                                        src={`https://www.sofascore.com/static/images/flags/${
                                            countries.find(c => c.name === player.country.name)?.short
                                        }.png`}
                                    />
                                    <Text as="h3" {...typography.h3} color="colors.onSurface.nLv1">
                                        {player.country.name.substring(0, 3)}
                                    </Text>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex
                            w="calc(100% / 2)"
                            h={64}
                            justifyContent="center"
                            alignItems="center"
                            p="4px 20px 4px 20px"
                        >
                            <Flex
                                h="100%"
                                w="100%"
                                justifyContent="center"
                                alignItems="center"
                                flexDir="column"
                                gap={4}
                                borderRadius={4}
                                bg="colors.secondary.highlight"
                            >
                                <Text {...typography.assistive} color="colors.onSurface.nLv2">
                                    Position
                                </Text>
                                <Text as="h3" {...typography.h3} color="colors.onSurface.nLv1">
                                    {getPosition(player.position, sport)}
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>
                )}
            </Flex>
            {isSmall && (
                <Flex
                    w="100%"
                    alignItems="center"
                    justifyContent="flex-start"
                    flexDir="row"
                    bg="colors.surface.s1"
                    pb={12}
                    pt={12}
                >
                    <Flex w="calc(100% / 2)" h={64} justifyContent="center" alignItems="center" p="4px 20px 4px 20px">
                        <Flex
                            h="100%"
                            w="100%"
                            justifyContent="center"
                            alignItems="center"
                            flexDir="column"
                            gap={4}
                            borderRadius={4}
                            bg="colors.secondary.highlight"
                        >
                            <Text {...typography.assistive} color="colors.onSurface.nLv2">
                                Nationality
                            </Text>
                            <Flex h={16} flexDir="row" justifyContent="flex-start" alignItems="center" gap={4}>
                                <Image
                                    h={16}
                                    w={16}
                                    src={`https://www.sofascore.com/static/images/flags/${
                                        countries.find(c => c.name === player.country.name)?.short
                                    }.png`}
                                />
                                <Text as="h3" {...typography.h3} color="colors.onSurface.nLv1">
                                    {player.country.name.substring(0, 3)}
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex w="calc(100% / 2)" h={64} justifyContent="center" alignItems="center" p="4px 20px 4px 20px">
                        <Flex
                            h="100%"
                            w="100%"
                            justifyContent="center"
                            alignItems="center"
                            flexDir="column"
                            gap={4}
                            borderRadius={4}
                            bg="colors.secondary.highlight"
                        >
                            <Text {...typography.assistive} color="colors.onSurface.nLv2">
                                Position
                            </Text>
                            <Text as="h3" {...typography.h3} color="colors.onSurface.nLv1">
                                {getPosition(player.position, sport)}
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            )}
        </>
    )
}

function getPosition(pos: string, sport: 'football' | 'basketball' | 'american-football') {
    if (sport === 'football') {
        if (pos === 'G') return 'Goalkeeper'
        if (pos === 'M') return 'Midfield'
        if (pos === 'D') return 'Defense'
        if (pos === 'F') return 'Forward'
    }
    if (sport === 'basketball') {
        if (pos === 'C') return 'Center'
        if (pos === 'CF') return 'Center Forward'
        if (pos === 'F') return 'Forward'
        if (pos === 'G') return 'Guard'
        if (pos === 'FG') return 'Forward Guard'
        if (pos === 'FC') return 'Forward Center'
    } else {
        if (pos === 'CB') return 'Cornerback'
        if (pos === 'DB') return 'Defensive Back'
        if (pos === 'DT') return 'Defensive Tackle'
        if (pos === 'WR') return 'Wide Receiver'
        if (pos === 'DE') return 'Defensive End'
        if (pos === 'OLB') return 'Outside Linebacker'
        if (pos === 'T') return 'Tackle'
        if (pos === 'TE') return 'Tight End'
        if (pos === 'OT') return 'Offensive Tackle'
        if (pos === 'SAF') return 'Safety'
        if (pos === 'LB') return 'Linebacker'
        if (pos === 'QB') return 'Quarterback'
        if (pos === 'LS') return 'Long Snapper'
        if (pos === 'FB') return 'Fullback'
        if (pos === 'RB') return 'Running Back'
        if (pos === 'OL') return 'Offensive Lineman'
        if (pos === 'K') return 'Kicker'
        if (pos === 'OG') return 'Offensive Guard'
        if (pos === 'G') return 'Guard'
        if (pos === 'P') return 'Punter'
    }
    return 'Unknown'
}
