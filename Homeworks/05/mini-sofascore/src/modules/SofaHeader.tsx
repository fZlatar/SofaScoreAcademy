import React, { useState } from 'react'
import SofaLogo from '../components/icons/SofaLogo'
import SettingsIcon from '../components/icons/SettingsIcon'
import { FlexProps, Flex, Button } from '@kuma-ui/core'
import Trophy from '../components/icons/Trophy'
import Link from 'next/link'
import { homePath } from '@/utils/homePath'
import Search from '@/components/icons/Search'
import SearchModal from './SearchModal'
import NotFavoriteIcon from '@/components/icons/NotFavoriteIcon'

export interface SofaHeaderProps extends FlexProps {
    mode: 'mobile' | 'desktop'
}

export default function SofaHeader({ mode, ...restProps }: SofaHeaderProps) {
    const [openSearch, setOpenSearch] = useState(false)

    if (mode === 'mobile') {
        return (
            <>
                <Flex
                    color="colors.surface.s1"
                    bg="colors.primary.default"
                    justifyContent="space-between"
                    alignItems="center"
                    pl="spacings.lg"
                    pr="spacings.xs"
                    {...restProps}
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
                        <Link href="/favorites">
                            <Flex justifyContent="center" alignItems="center" w={48} h={48}>
                                <NotFavoriteIcon />
                            </Flex>
                        </Link>
                        <Button
                            variant="wrapper"
                            color="colors.surface.s1"
                            bg="none"
                            onClick={() => setOpenSearch(o => !o)}
                        >
                            <Flex justifyContent="center" alignItems="center" w={48} h={48}>
                                <Search />
                            </Flex>
                        </Button>
                        <Link href="/settings">
                            <Flex justifyContent="center" alignItems="center" w={48} h={48}>
                                <SettingsIcon />
                            </Flex>
                        </Link>
                    </Flex>
                </Flex>
                {openSearch && <SearchModal onClose={setOpenSearch} />}
            </>
        )
    }

    if (mode === 'desktop') {
        return (
            <>
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

                    <Flex justifyContent="center" alignItems="center" position="absolute" right="24px" gap={12}>
                        <Link href="/favorites">
                            <NotFavoriteIcon />
                        </Link>
                        <Button
                            variant="wrapper"
                            color="colors.surface.s1"
                            bg="none"
                            onClick={() => setOpenSearch(o => !o)}
                        >
                            <Search />
                        </Button>
                        <Link href="/settings">
                            <SettingsIcon />
                        </Link>
                    </Flex>
                </Flex>
                {openSearch && <SearchModal onClose={setOpenSearch} />}
            </>
        )
    }
}
