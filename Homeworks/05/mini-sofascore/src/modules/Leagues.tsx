import { AvailableTournamentForSport } from '@/models/sport'
import { Image, Flex, FlexProps, Text } from '@kuma-ui/core'
import React from 'react'
import typography from '@/utils/typography'
import SofaButton from '@/components/SofaButton'
import { getTournamentImageSrc } from '@/api/tournamentApi'
import Link from 'next/link'

export interface LeaguesProps extends FlexProps {
    leagues: AvailableTournamentForSport[]
}

export default function Leagues({ leagues, ...restProps }: LeaguesProps) {
    return (
        <Flex
            {...restProps}
            bg="colors.surface.s1"
            color="colors.onSurface.nLv1"
            boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)"
            borderRadius="radii.xl"
            pt="spacings.lg"
            pb="spacings.lg"
            flexDirection="column"
        >
            <Flex p="10px 16px" h={48} justifyContent="flex-start" alignItems="center">
                <Text as="h1" {...typography.h1}>
                    Leagues
                </Text>
            </Flex>
            {leagues.map(league => (
                <Link href={`/${league.sport.slug}/league/${league.slug}`} key={league.id}>
                    <Flex
                        h={48}
                        pl="spacings.lg"
                        pr="spacings.lg"
                        justifyContent="flex-start"
                        alignItems="center"
                        flexDirection="row"
                        gap="spacings.lg"
                        w="100%"
                        _hover={{
                            bg: 'colors.primary.highlight',
                        }}
                        transition="all 0.3s ease"
                    >
                        <Image src={getTournamentImageSrc(league.id)} w={40} h={40} />
                        <Text as="h3" {...typography.h3}>
                            {league.name}
                        </Text>
                    </Flex>
                </Link>
            ))}
            <Flex h={48} pl="spacings.lg" pr="spacings.lg" justifyContent="flex-start" alignItems="flex-end">
                <SofaButton variant="unshielded" icon="withoutIcon" disabled>
                    View more
                </SofaButton>
            </Flex>
        </Flex>
    )
}
