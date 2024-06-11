import { Box, Flex, Text } from '@kuma-ui/core'
import { ReactElement, useState } from 'react'
import Layout from '@/modules/Layout'
import Head from 'next/head'
import { NextPageWithLayout } from './_app'
import typography from '@/utils/typography'

const Error404: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>404</title>
                <meta name="description" content="Mini Sofascore app developed for Sofascore Academy 2024" />
            </Head>
            <Box m={24}>
                <Flex w="100%" justifyContent="center" alignItems="center">
                    <Flex
                        justifyContent="center"
                        alignItems="center"
                        p={32}
                        bg="colors.surface.s1"
                        borderRadius={16}
                        boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)"
                    >
                        <Text as="h1" {...typography.h1}>
                            Page not found! 404
                        </Text>
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}

Error404.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Error404
