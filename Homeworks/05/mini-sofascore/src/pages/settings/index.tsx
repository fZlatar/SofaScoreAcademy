import { Box, Flex, Text } from '@kuma-ui/core'
import { ReactElement, useState } from 'react'
import Layout from '@/modules/Layout'
import Head from 'next/head'
import { NextPageWithLayout } from '../_app'
import Breadcrumbs, { Crumb } from '@/components/Breadcrumbs'
import typography from '@/utils/typography'
import SofaInput from '@/components/SofaInput'
import SofaChoice from '@/components/SofaChoice'
import SofaLogo from '@/components/icons/SofaLogo'

const FootballPage: NextPageWithLayout = () => {
    const [language, setLanguage] = useState<'Croatian' | 'English'>('English')
    const [theme, setTheme] = useState('Light')
    const [dateFormat, setDateFormat] = useState('DD / MM / YYYY')
    const crumbs: Crumb[] = [
        {
            name: 'Settings',
            link: '/settings',
        },
    ]

    return (
        <>
            <Head>
                <title>Settings</title>
                <meta name="description" content="Mini Sofascore app developed for Sofascore Academy 2024" />
            </Head>
            <Box ml={24} mr={24} mb={24}>
                <Breadcrumbs w="100%" crumbs={crumbs} />
                <Flex w="100%" justifyContent="center">
                    <Flex
                        w="calc(100% / 3)"
                        bg="colors.surface.s1"
                        borderRadius={16}
                        boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)"
                        overflow="hidden"
                        flexDir="column"
                        gap={16}
                        pb={16}
                    >
                        <Flex justifyContent="flex-start" alignItems="center" pl={16} pr={16} mt={16} h={48}>
                            <Text as="h1" color="colors.onSurface.nLv1" {...typography.h1}>
                                Settings
                            </Text>
                        </Flex>
                        <SofaInput ml={8} mr={8} selected={language} setSelected={setLanguage} />
                        <SofaChoice ml={8} mr={8} mode="theme" selected={theme} setSelected={setTheme} />
                        <SofaChoice ml={8} mr={8} mode="date" selected={dateFormat} setSelected={setDateFormat} />
                        <Flex
                            ml={8}
                            mr={8}
                            w="calc(100% - 16px)"
                            borderRadius={8}
                            bg="colors.surface.s2"
                            p="16px 16px 32px 16px"
                            color="colors.onSurface.nLv1"
                            flexDir="column"
                        >
                            <Text mb={16} as="h1" {...typography.h1}>
                                About
                            </Text>
                            <Text mb={2} as="h2" {...typography.h2}>
                                Sofascore Frontend Academy
                            </Text>
                            <Text mb={15} {...typography.bodyP}>
                                Class 2024
                            </Text>
                            <Box mb={16} w="100%" borderTop="1px solid" borderColor="colors.onSurface.nLv4" />
                            <Text mb={2} color="colors.onSurface.nLv2" {...typography.assistive}>
                                App name
                            </Text>
                            <Text mb={16} {...typography.bodyP}>
                                Mini Sofascore App
                            </Text>
                            <Text mb={2} color="colors.onSurface.nLv2" {...typography.assistive}>
                                API Credit
                            </Text>
                            <Text mb={16} {...typography.bodyP}>
                                Sofascore
                            </Text>
                            <Text mb={2} color="colors.onSurface.nLv2" {...typography.assistive}>
                                Developer
                            </Text>
                            <Text mb={16} {...typography.bodyP}>
                                Fran Zlatar
                            </Text>
                            <Box mb={16} w="100%" borderTop="1px solid" borderColor="colors.onSurface.nLv4" />
                            <Flex justifyContent="center" alignItems="center" color="colors.primary.default">
                                <SofaLogo width={132} height={20} />
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}

FootballPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default FootballPage
