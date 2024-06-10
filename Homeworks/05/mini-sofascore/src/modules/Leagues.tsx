import { Image, Flex, FlexProps, Text } from '@kuma-ui/core'
import React from 'react'
import typography from '@/utils/typography'
import SofaButton from '@/components/SofaButton'
import { getTournamentImageSrc } from '@/api/tournamentApi'
import Link from 'next/link'
import { TournamentDetails } from '@/models/tournament'

export interface LeaguesProps extends FlexProps {
    leagues: TournamentDetails[]
    selected?: number
}

const flexStyles1: Partial<FlexProps> = {
    bg: 'colors.surface.s1',
    color: 'colors.onSurface.nLv1',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.08)',
    borderRadius: 'radii.xl',
    pt: 'spacings.lg',
    pb: 'spacings.lg',
    flexDirection: 'column',
}

const flexStyles2: Partial<FlexProps> = {
    p: '10px 16px',
    h: 48,
    justifyContent: 'flex-start',
    alignItems: 'center',
}

const flexStyles3: Partial<FlexProps> = {
    h: 48,
    pl: 'spacings.lg',
    pr: 'spacings.lg',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 'spacings.lg',
    w: '100%',
    _hover: {
        bg: 'colors.primary.highlight',
    },
    transition: 'all 0.3s ease',
}

const flexStyles4: Partial<FlexProps> = {
    h: 48,
    pl: 'spacings.lg',
    pr: 'spacings.lg',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
}

export default function Leagues({ leagues, selected, ...restProps }: LeaguesProps) {
    return (
        <Flex {...restProps} {...flexStyles1}>
            <Flex {...flexStyles2}>
                <Text as="h1" {...typography.h1}>
                    Leagues
                </Text>
            </Flex>
            {leagues.map(league => (
                <Link href={`/${league.sport.slug}/league/${league.slug}/${league.id}`} key={league.id}>
                    <Flex bg={selected === league.id ? 'colors.primary.highlight' : 'initial'} {...flexStyles3}>
                        <Image src={getTournamentImageSrc(league.id)} w={40} h={40} />
                        <Text as="h3" {...typography.h3}>
                            {league.name}
                        </Text>
                    </Flex>
                </Link>
            ))}
            <Flex {...flexStyles4}>
                <SofaButton variant="unshielded" icon="withoutIcon" disabled>
                    View more
                </SofaButton>
            </Flex>
        </Flex>
    )
}