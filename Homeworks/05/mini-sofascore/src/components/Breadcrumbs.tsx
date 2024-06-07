import { Box, Flex, FlexProps, Text } from '@kuma-ui/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import typography from '@/utils/typography'
import PointerRight from './icons/PointerRight'

export interface BreadcrumbsProps extends FlexProps {
    crumbs?: Crumb[]
}

export interface Crumb {
    name: string
    link: string
}

export default function Breadcrumbs({ crumbs, ...restProps }: BreadcrumbsProps) {
    const router = useRouter()

    return (
        <Flex {...restProps} h={48} justifyContent="flex-start" alignItems="center" {...typography.micro}>
            {crumbs &&
                crumbs.map((crumb, index) => (
                    <Flex key={crumb.link} justifyContent="flex-start" alignItems="center">
                        {index + 1 === crumbs.length ? (
                            <Text color="colors.onSurface.nLv2" cursor="default">
                                {crumb.name}
                            </Text>
                        ) : (
                            <>
                                <Link href={crumb.link}>
                                    <Text color="colors.primary.default">{crumb.name}</Text>
                                </Link>
                                <Box color="colors.onSurface.nLv2" w={24} h={24}>
                                    <PointerRight />
                                </Box>
                            </>
                        )}
                    </Flex>
                ))}
        </Flex>
    )
}
