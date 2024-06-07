import React, { PropsWithChildren, useEffect, useState } from 'react'
import SofaHeader from './SofaHeader'
import SofaTabs, { SofaTab } from '../components/SofaTabs'
import useBreakpoint from '@/hooks/useBreakpoint'
import SofaFooter from './SofaFooter'
import { Box, Flex, Text, styled } from '@kuma-ui/core'
import Link from 'next/link'
import FootballIcon from '@/components/icons/FootballIcon'
import BasketballIcon from '@/components/icons/BasketballIcon'
import AmericanFootballIcon from '@/components/icons/AmericanFootballIcon'
import { useRouter } from 'next/router'

export default function Layout(props: PropsWithChildren) {
    const router = useRouter()
    const { isBig } = useBreakpoint()
    const [selectedTab, setSelectedTab] = useState<'football' | 'basketball' | 'american-football' | undefined>(
        undefined
    )

    useEffect(() => {
        const currentTab = checkPath(router.asPath)
        if (currentTab !== selectedTab) {
            setSelectedTab(currentTab)
        }
    }, [router.asPath])

    return (
        <>
            <Box as="header" boxShadow="0 2px 16px 0 rgba(0, 0, 0, 0.12)">
                <SofaHeader mode={isBig ? 'desktop' : 'mobile'} />
                <SofaTabs w="100%" mode="negative">
                    <Link href="/football">
                        <SofaTab mode="negative" selected={selectedTab === 'football'}>
                            <Flex
                                gap="spacings.xs"
                                flexDirection={isBig ? 'row' : 'column'}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <FootballIcon width={16} height={16} />
                                <Text>Football</Text>
                            </Flex>
                        </SofaTab>
                    </Link>
                    <Link href="/basketball">
                        <SofaTab mode="negative" selected={selectedTab === 'basketball'}>
                            <Flex
                                gap="spacings.xs"
                                flexDirection={isBig ? 'row' : 'column'}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <BasketballIcon width={16} height={16} />
                                <Text>Basketball</Text>
                            </Flex>
                        </SofaTab>
                    </Link>
                    <Link href="/american-football">
                        <SofaTab mode="negative" selected={selectedTab === 'american-football'}>
                            <Flex
                                gap="spacings.xs"
                                flexDirection={isBig ? 'row' : 'column'}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <AmericanFootballIcon width={16} height={16} />
                                <Text>{isBig ? 'American Football' : 'Am. Football'}</Text>
                            </Flex>
                        </SofaTab>
                    </Link>
                </SofaTabs>
            </Box>
            <Box as="main" flex={1}>
                {props.children}
            </Box>
            <Box as="footer" w="100%">
                <SofaFooter />
            </Box>
        </>
    )
}

function checkPath(path: string) {
    if (path.startsWith('/football')) {
        return 'football'
    }
    if (path.startsWith('/basketball')) {
        return 'basketball'
    }
    if (path.startsWith('/american-football')) {
        return 'american-football'
    }
}
