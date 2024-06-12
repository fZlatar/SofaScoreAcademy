import { getPlayerImageSrc } from '@/api/playerApi'
import NoImage from '@/components/icons/NoImage'
import { PlayerDetails } from '@/models/player'
import countries from '@/utils/countries'
import typography from '@/utils/typography'
import { Box, Flex, FlexProps, Text, Image } from '@kuma-ui/core'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React, { useState } from 'react'

export interface TeamSquadProps extends FlexProps {
    coach?: string
    players: PlayerDetails[]
    sport: 'football' | 'basketball' | 'american-football'
}

export default function TeamSquad({ coach, players, sport, ...restProps }: TeamSquadProps) {
    const t = useTranslations('TeamSquad')
    return (
        <Flex
            {...restProps}
            borderRadius={16}
            boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)"
            bg="colors.surface.s1"
            overflow="hidden"
            flexDirection="column"
            pb={16}
        >
            <Flex h={48} p="8px 16px 8px 16px" justifyContent="flex-end" flexDirection="column" alignItems="flex-start">
                <Text color="colors.onSurface.nLv1" {...typography.assistive}>
                    {t('coach')}
                </Text>
            </Flex>
            <Flex
                h={56}
                p="8px 16px 8px 16px"
                flexDirection="row"
                justifyContent="flex-start"
                alignItems="center"
                gap={16}
                color="colors.onSurface.nLv1"
            >
                <NoImage width={40} height={40} />
                <Flex flexDir="column" gap={4} alignItems="center" justifyContent="flex-start">
                    <Text {...typography.assistive}>{coach}</Text>
                </Flex>
            </Flex>
            <Box mt={7} w="100%" borderBottom="1px solid" borderColor="colors.onSurface.nLv4" />
            <Flex h={48} p="8px 16px 8px 16px" justifyContent="flex-end" flexDirection="column" alignItems="flex-start">
                <Text color="colors.onSurface.nLv1" {...typography.assistive}>
                    {t('players')}
                </Text>
            </Flex>
            {players.map((p, i) => (
                <Box key={p.id}>
                    {i !== 0 && <Box mt={7} w="100%" borderBottom="1px solid" borderColor="colors.onSurface.nLv4" />}
                    <Link href={`/${sport}/player/${p.id}`}>
                        <PlayerItem player={p} w="100%" />
                    </Link>
                </Box>
            ))}
        </Flex>
    )
}

export interface PlayerItemProps extends FlexProps {
    player: PlayerDetails
}

export function PlayerItem({ player, ...restProps }: PlayerItemProps) {
    const [imageError, setImageError] = useState(false)
    return (
        <Flex
            h={56}
            p="8px 16px 8px 16px"
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="center"
            gap={16}
            color="colors.onSurface.nLv1"
            {...restProps}
        >
            {imageError ? (
                <NoImage width={40} height={40} />
            ) : (
                <Image
                    w={40}
                    h={40}
                    src={getPlayerImageSrc(player.id)}
                    borderRadius="100%"
                    onError={() => setImageError(true)}
                />
            )}
            <Flex flexDir="column" gap={4} alignItems="flex-start" justifyContent="flex-start">
                <Text {...typography.assistive}>{player.name}</Text>
                <Flex h={16} flexDir="row" justifyContent="flex-start" alignItems="center" gap={4}>
                    <Image
                        w={16}
                        h={16}
                        src={`https://www.sofascore.com/static/images/flags/${
                            countries.find(c => c.name === player.country.name)?.short
                        }.png`}
                    />
                    <Text color="colors.onSurface.nLv2" {...typography.assistive}>
                        {player.country.name}
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    )
}
