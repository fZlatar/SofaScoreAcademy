import { getEventDetails, getEventIncidents } from '@/api/eventApi'
import { getAvailableTournamentsForSport } from '@/api/sportApi'
import Breadcrumbs, { Crumb } from '@/components/Breadcrumbs'
import { EventDetails, EventIncident } from '@/models/event'
import { AvailableTournamentForSport } from '@/models/sport'
import Layout from '@/modules/Layout'
import Leagues from '@/modules/Leagues'
import FullEvent from '@/modules/fullEvent/FullEvent'
import { NextPageWithLayout } from '@/pages/_app'
import { Box, Flex } from '@kuma-ui/core'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { ReactElement } from 'react'

type AmericanFootballEventPageRepo = {
    tournaments: AvailableTournamentForSport[]
    event: EventDetails
    incidents: EventIncident[]
}

type AmericanFootballEventPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const AmericanFootballEventPage: NextPageWithLayout<AmericanFootballEventPageProps> = ({ repo }) => {
    console.log(repo)

    const crumbs: Crumb[] = [
        {
            name: 'Am. Football',
            link: '/american-football',
        },
        {
            name: repo.event.tournament.name,
            link: `/american-football/league/${repo.event.tournament.slug}/${repo.event.tournament.id}`,
        },
        {
            name: `${repo.event.homeTeam.name} vs ${repo.event.awayTeam.name}`,
            link: `/american-football/match/${repo.event.slug}/${repo.event.id}`,
        },
    ]

    return (
        <>
            <Head>
                <title>{`${repo.event.homeTeam.name} vs ${repo.event.awayTeam.name}`}</title>
                <meta name="description" content="Mini Sofascore app developed for Sofascore Academy 2024" />
            </Head>
            <Box ml={24} mr={24} mb={24}>
                <Breadcrumbs w="100%" crumbs={crumbs} />
                <Flex flexDirection="row" gap={24} w="100%" alignItems="flex-start">
                    <Leagues w="calc((100% - 48px) / 3)" leagues={repo.tournaments} />
                    <FullEvent w="calc((100% - 48px) / 3)" event={repo.event} incidents={repo.incidents} />
                </Flex>
            </Box>
        </>
    )
}

AmericanFootballEventPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export const getServerSideProps = (async context => {
    const { slug, id } = context.query

    try {
        const tournaments = await getAvailableTournamentsForSport('american-football')
        const event = await getEventDetails(Number(id))
        const incidents = await getEventIncidents(Number(id))

        if (event.slug !== slug) {
            return {
                notFound: true,
            }
        }

        const repo = {
            tournaments: tournaments,
            event: event,
            incidents: incidents,
        }

        return { props: { repo } }
    } catch (error) {
        return {
            notFound: true,
        }
    }
}) satisfies GetServerSideProps<{ repo: AmericanFootballEventPageRepo }>

export default AmericanFootballEventPage
