import { Box, Flex, FlexProps, Text } from '@kuma-ui/core'
import React from 'react'
import typography from '@/utils/typography'
import RadioSelected from './icons/RadioSelected'
import RadioEmpty from './icons/RadioEmpty'
import { useTranslations } from 'next-intl'

export interface SofaChoiceProps extends FlexProps {
    mode: 'date' | 'theme'
    selected: string | undefined
    setSelected: (s: string) => void
}

export default function SofaChoice({ mode, selected, setSelected, ...restProps }: SofaChoiceProps) {
    const t = useTranslations('SofaChoice')
    return (
        <Flex
            {...restProps}
            pb="spacings.sm"
            pt="spacings.lg"
            bg="colors.surface.s2"
            borderRadius={8}
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
                {mode === 'date' ? t('dateFormat') : t('theme')}
            </Text>
            {mode === 'date' ? (
                <>
                    <SofaRadio
                        label="DD / MM / YYYY"
                        value="DD / MM / YYYY"
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <SofaRadio
                        label="MM / DD / YYYY"
                        value="MM / DD / YYYY"
                        selected={selected}
                        setSelected={setSelected}
                    />
                </>
            ) : (
                <>
                    <SofaRadio label={t('light')} value="light" selected={selected} setSelected={setSelected} />
                    <SofaRadio label={t('dark')} value="dark" selected={selected} setSelected={setSelected} />
                </>
            )}
        </Flex>
    )
}

export interface SofaRadioProps extends FlexProps {
    selected: string | undefined
    setSelected: (s: string) => void
    label: string
    value: string
}

export function SofaRadio({ selected, value, setSelected, label, ...restProps }: SofaRadioProps) {
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
