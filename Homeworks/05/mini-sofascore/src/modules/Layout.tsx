import React, { PropsWithChildren, useEffect, useState } from 'react'
import SofaHeader from './SofaHeader'
import SofaTabs, { SofaTab } from '../components/SofaTabs'
import SofaFooter from './SofaFooter'
import { Box, Flex, FlexProps, Text, styled } from '@kuma-ui/core'
import Link from 'next/link'
import FootballIcon from '@/components/icons/FootballIcon'
import BasketballIcon from '@/components/icons/BasketballIcon'
import AmericanFootballIcon from '@/components/icons/AmericanFootballIcon'
import { useRouter } from 'next/router'

export interface LayoutProps extends PropsWithChildren {
    noTabs?: boolean
}

const flexStyles: Partial<FlexProps> = {
    gap: 'spacings.xs',
    flexDirection: ['column', 'row'],
    justifyContent: 'center',
    alignItems: 'center',
}

export default function Layout({ noTabs, children }: LayoutProps) {
    const router = useRouter()
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
            <Box
                as="header"
                boxShadow="0 2px 16px 0 rgba(0, 0, 0, 0.12)"
                position={['sticky', 'static']}
                top={0}
                left={0}
                w="100%"
                zIndex={1000}
            >
                <SofaHeader mode="desktop" display={['none', 'flex']} />
                <SofaHeader mode="mobile" display={['flex', 'none']} />
                {!noTabs && (
                    <SofaTabs w="100%" mode="negative">
                        <Link href="/football">
                            <SofaTab mode="negative" selected={selectedTab === 'football'}>
                                <Flex {...flexStyles}>
                                    <FootballIcon width={16} height={16} />
                                    <Text>Football</Text>
                                </Flex>
                            </SofaTab>
                        </Link>
                        <Link href="/basketball">
                            <SofaTab mode="negative" selected={selectedTab === 'basketball'}>
                                <Flex {...flexStyles}>
                                    <BasketballIcon width={16} height={16} />
                                    <Text>Basketball</Text>
                                </Flex>
                            </SofaTab>
                        </Link>
                        <Link href="/american-football">
                            <SofaTab mode="negative" selected={selectedTab === 'american-football'}>
                                <Flex {...flexStyles}>
                                    <AmericanFootballIcon width={16} height={16} />
                                    <Text display={['none', 'block']}>American Football</Text>
                                    <Text display={['block', 'none']}>Am. Football</Text>
                                </Flex>
                            </SofaTab>
                        </Link>
                    </SofaTabs>
                )}
            </Box>
            <Box as="main" flex={1}>
                {children}
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
