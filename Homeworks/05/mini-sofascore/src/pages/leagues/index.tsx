import { Box, Button, Flex, FlexProps, Text } from '@kuma-ui/core'
import { ReactElement, useState } from 'react'
import Layout from '@/modules/Layout'
import Head from 'next/head'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getAvailableTournamentsForSport } from '@/api/sportApi'
import { NextPageWithLayout } from '../_app'
import Breadcrumbs, { Crumb } from '@/components/Breadcrumbs'
import Leagues from '@/modules/Leagues'
import { TournamentDetails } from '@/models/tournament'
import useBreakpoint from '@/hooks/useBreakpoint'
import typography from '@/utils/typography'
import SofaTabs, { SofaTab } from '@/components/SofaTabs'
import FootballIcon from '@/components/icons/FootballIcon'
import BasketballIcon from '@/components/icons/BasketballIcon'
import AmericanFootballIcon from '@/components/icons/AmericanFootballIcon'

type LeaguesRepo = {
    footballLeagues: TournamentDetails[]
    basketballLeagues: TournamentDetails[]
    americanFootballLeagues: TournamentDetails[]
}

type LeaguesPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const flexStyles: Partial<FlexProps> = {
    gap: 'spacings.xs',
    flexDirection: ['column', 'row'],
    justifyContent: 'center',
    alignItems: 'center',
}

const LeaguesPage: NextPageWithLayout<LeaguesPageProps> = ({ repo }) => {
    const { isBig } = useBreakpoint()
    const [selectedLeague, setSelectedLeague] = useState<'football' | 'basketball' | 'american-football'>('football')

    const crumbs: Crumb[] = [
        {
            name: 'Leagues',
            link: '/leagues',
        },
    ]

    return (
        <>
            <Head>
                <title>Leagues</title>
                <meta name="description" content="Mini Sofascore app developed for Sofascore Academy 2024" />
            </Head>
            <Box mb={24}>
                <Flex
                    w="100%"
                    flexDir="column"
                    bg="colors.surface.s1"
                    boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)"
                    position={['sticky', 'static']}
                    top={48}
                >
                    <Flex w="100%" p="10px 16px 10px 16px">
                        <Text as="h1" {...typography.h1} textAlign="left">
                            Leagues
                        </Text>
                    </Flex>
                    <Flex w="100%" h={48}>
                        <SofaTabs w="100%" mode="positive">
                            <Button
                                w={['calc(100% / 3)', 'auto']}
                                variant="wrapper"
                                onClick={() => setSelectedLeague('football')}
                                {...typography.body}
                            >
                                <SofaTab w="100%" mode="positive" selected={selectedLeague === 'football'}>
                                    <Flex {...flexStyles}>
                                        <FootballIcon width={16} height={16} />
                                        <Text>Football</Text>
                                    </Flex>
                                </SofaTab>
                            </Button>
                            <Button
                                w={['calc(100% / 3)', 'auto']}
                                variant="wrapper"
                                onClick={() => setSelectedLeague('basketball')}
                                {...typography.body}
                            >
                                <SofaTab w="100%" mode="positive" selected={selectedLeague === 'basketball'}>
                                    <Flex {...flexStyles}>
                                        <BasketballIcon width={16} height={16} />
                                        <Text>Basketball</Text>
                                    </Flex>
                                </SofaTab>
                            </Button>
                            <Button
                                w={['calc(100% / 3)', 'auto']}
                                variant="wrapper"
                                onClick={() => setSelectedLeague('american-football')}
                                {...typography.body}
                            >
                                <SofaTab w="100%" mode="positive" selected={selectedLeague === 'american-football'}>
                                    <Flex {...flexStyles}>
                                        <AmericanFootballIcon width={16} height={16} />
                                        <Text display={['none', 'block']}>American Football</Text>
                                        <Text display={['block', 'none']}>Am. Football</Text>
                                    </Flex>
                                </SofaTab>
                            </Button>
                        </SofaTabs>
                    </Flex>
                </Flex>
                <Breadcrumbs ml={16} mr={16} w="100%" crumbs={crumbs} display={['none', 'flex']} />
                <Flex
                    flexDirection={'column'}
                    w="100%"
                    justifyContent="center"
                    alignItems="center"
                    pl={8}
                    pr={8}
                    pt={8}
                >
                    <Leagues
                        w={['100%', 'calc(100% / 3)']}
                        leagues={
                            selectedLeague === 'football'
                                ? repo.footballLeagues
                                : selectedLeague === 'basketball'
                                ? repo.basketballLeagues
                                : repo.americanFootballLeagues
                        }
                        hideTitle
                    />
                </Flex>
            </Box>
        </>
    )
}

LeaguesPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout noTabs>{page}</Layout>
}

export const getServerSideProps = (async () => {
    try {
        const footballLeagues = await getAvailableTournamentsForSport('football')
        const basketballLeagues = await getAvailableTournamentsForSport('basketball')
        const americanFootballLeagues = await getAvailableTournamentsForSport('american-football')

        const repo = {
            footballLeagues,
            basketballLeagues,
            americanFootballLeagues,
        }

        return { props: { repo } }
    } catch (error) {
        return {
            notFound: true,
        }
    }
}) satisfies GetServerSideProps<{ repo: LeaguesRepo }>

export default LeaguesPage
