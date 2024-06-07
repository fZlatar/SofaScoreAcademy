import { Box, Flex, FlexProps, Text } from '@kuma-ui/core'
import React, { PropsWithChildren } from 'react'
import typography from '@/utils/typography'
import RadioSelected from './icons/RadioSelected'
import RadioEmpty from './icons/RadioEmpty'

export interface SofaChoiceProps extends FlexProps {
    selected: string | undefined
    setSelected: (s: string) => void
}

export default function SofaChoice({ selected, setSelected, ...restProps }: SofaChoiceProps) {
    return (
        <Flex
            {...restProps}
            pb="spacings.sm"
            pt="spacings.lg"
            bg="colors.surface.s1"
            borderRadius="radii.xl"
            boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)"
            flexDirection="column"
        >
            <Text
                pl="spacings.lg"
                pr="spacings.lg"
                mb="spacings.sm"
                {...typography.assistive}
                color="colors.primary.default"
            >
                Date Format
            </Text>
            <SofaRadio label="DD / MM / YYYY" value="DD/MM/YYYY" selected={selected} setSelected={setSelected} />
            <SofaRadio label="MM / DD / YYYY" value="MM/DD/YYYY" selected={selected} setSelected={setSelected} />
        </Flex>
    )
}

export interface SofaRadioProps extends FlexProps {
    selected: string | undefined
    setSelected: (s: string) => void
    label: string
    value: string
}

export function SofaRadio({ selected, setSelected, label, value, ...restProps }: SofaRadioProps) {
    return (
        <Flex
            {...restProps}
            pl="spacings.lg"
            pr="spacings.lg"
            flexDirection="row"
            alignItems="center"
            h={48}
            onClick={() => setSelected(value)}
        >
            <Text {...typography.bodyP} flex={1} color="colors.onSurface.nLv1">
                {label}
            </Text>
            <Box
                _hover={{ cursor: 'pointer' }}
                color={selected === value ? 'colors.primary.default' : 'colors.onSurface.nLv1'}
            >
                {selected === value ? <RadioSelected width={16} height={16} /> : <RadioEmpty width={16} height={16} />}
            </Box>
        </Flex>
    )
}
