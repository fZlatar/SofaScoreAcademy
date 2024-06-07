import { Flex } from '@kuma-ui/core'
import React from 'react'
import SofaLogo from '../components/icons/SofaLogo'
import SettingsIcon from '../components/icons/SettingsIcon'
import { FlexProps } from '@kuma-ui/core'
import Trophy from '../components/icons/Trophy'
import Link from 'next/link'
import { homePath } from '@/utils/homePath'

export interface SofaHeaderProps extends FlexProps {
    mode: 'mobile' | 'desktop'
}

export default function SofaHeader({ mode, ...restProps }: SofaHeaderProps) {
    if (mode === 'mobile') {
        return (
            <Flex
                {...restProps}
                color="colors.surface.s1"
                bg="colors.primary.default"
                justifyContent="space-between"
                alignItems="center"
                pl="spacings.lg"
                pr="spacings.xs"
            >
                <Link href={homePath}>
                    <SofaLogo />
                </Link>
                <Flex>
                    <Link href="/leagues">
                        <Flex justifyContent="center" alignItems="center" w={48} h={48}>
                            <Trophy />
                        </Flex>
                    </Link>
                    <Link href="/settings">
                        <Flex justifyContent="center" alignItems="center" w={48} h={48}>
                            <SettingsIcon />
                        </Flex>
                    </Link>
                </Flex>
            </Flex>
        )
    }

    if (mode === 'desktop') {
        return (
            <Flex
                {...restProps}
                p="20px"
                justifyContent="center"
                alignItems="center"
                color="colors.surface.s1"
                bg="colors.primary.default"
                position="relative"
            >
                <Link href={homePath}>
                    <Flex justifyContent="center" alignItems="center">
                        <SofaLogo />
                    </Flex>
                </Link>

                <Flex justifyContent="center" alignItems="center" position="absolute" right="24px">
                    <Link href="/settings">
                        <SettingsIcon />
                    </Link>
                </Flex>
            </Flex>
        )
    }
}
