import { Box, Flex, FlexProps, Text } from '@kuma-ui/core'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import typography from '@/utils/typography'

export interface SofaTabsProps extends FlexProps, PropsWithChildren {
    mode?: 'positive' | 'negative'
}

const positive = {
    bg: 'colors.surface.s1',
    color: 'colors.primary.default',
}

const negative = {
    bg: 'colors.primary.default',
    color: 'colors.surface.s1',
}

export default function SofaTabs({ mode, ...restProps }: SofaTabsProps) {
    const colors = mode === 'positive' ? { ...positive } : { ...negative }

    return (
        <Flex {...restProps} {...colors} {...typography.body} h={48} justifyContent="center" alignItems="center">
            {restProps.children}
        </Flex>
    )
}

export interface SofaTabProps extends FlexProps, PropsWithChildren {
    mode?: 'positive' | 'negative'
    selected?: boolean
}

const tabPositive = {
    ...positive,
    _hover: {
        bg: 'colors.onSurface.nLv3',
    },
}

const tabNegative = {
    ...negative,
    _hover: {
        bg: 'colors.primary.variant',
    },
}

export function SofaTab({ mode, selected, ...restProps }: SofaTabProps) {
    const colors = mode === 'positive' ? { ...tabPositive } : { ...tabNegative }
    return (
        <Flex
            p="4px 8px"
            h={48}
            {...colors}
            justifyContent="center"
            alignItems="center"
            cursor="pointer"
            transition="all 0.3s ease"
            position="relative"
        >
            {restProps.children}
            {selected && (
                <Box
                    h={4}
                    w="calc(100% - 16px)"
                    bg={mode === 'positive' ? 'colors.primary.default' : 'colors.surface.s1'}
                    position="absolute"
                    borderRadius="2px 2px 0 0"
                    bottom={0}
                />
            )}
        </Flex>
    )
}
