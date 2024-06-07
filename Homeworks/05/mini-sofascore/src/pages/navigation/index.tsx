import SofaButton from '@/components/SofaButton'
import SofaFooter from '@/modules/SofaFooter'
import SofaHeader from '@/modules/SofaHeader'
import SofaTabs from '@/components/SofaTabs'
import { useThemeContext } from '@/context/ThemeContext'
import { Box, Flex } from '@kuma-ui/core'
import Head from 'next/head'
import React from 'react'

export default function Navigation() {
    const { setIsDark } = useThemeContext()
    return (
        <>
            <Head>
                <title>Navigation</title>
                <meta name="description" content="Mini Sofascore app developed for Sofascore Academy 2024" />
            </Head>
            <Box as="main">
                <SofaButton m={20} onClick={() => setIsDark(v => !v)} icon="withoutIcon">
                    Toggle theme
                </SofaButton>
                <Box w="100%">
                    <Flex p={20} justify="center" alignItems="center" gap={20}>
                        <SofaHeader w={360} h={64} mode="desktop" />
                        <SofaHeader w={360} h={48} mode="mobile" />
                    </Flex>
                    <Flex p={20} justify="center" alignItems="center" gap={20} bg="yellow">
                        <SofaFooter w={360} h={116} />
                    </Flex>
                    <Flex p={20} justify="center" alignItems="center" gap={20} bg="yellow">
                        <SofaTabs iconType="iconHorizontal" />
                        <SofaTabs iconType="iconHorizontal" mode="positive" />
                    </Flex>
                    <Flex p={20} justify="center" alignItems="center" gap={20} bg="yellow">
                        <SofaTabs iconType="iconVertical" />
                        <SofaTabs iconType="iconVertical" mode="positive" />
                    </Flex>
                    <Flex p={20} justify="center" alignItems="center" gap={20} bg="yellow">
                        <SofaTabs iconType="iconNone" />
                        <SofaTabs iconType="iconNone" mode="positive" />
                    </Flex>
                </Box>
            </Box>
        </>
    )
}
