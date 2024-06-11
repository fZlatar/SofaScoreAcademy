import { Box, BoxProps, Flex, Text, styled } from '@kuma-ui/core'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import PointerDown from './icons/PointerDown'
import typography from '@/utils/typography'

export interface SofaInputProps extends BoxProps {
    selected: string | undefined
    setSelected: (s: 'Croatian' | 'English') => void
}

const MotionPointerDownBox = motion(styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
`)

const hint = {
    ...typography.bodyP,
    color: 'colors.onSurface.nLv2',
}

const hintSelected = {
    ...typography.assistive,
    color: 'colors.primary.default',
}

const optionStyle = {
    h: '48px',
    w: '100%',
    pl: '15px',
    pr: '15px',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 'radii.xs',
    transition: 'background-color 0.3s ease',
    _hover: {
        bg: 'colors.onSurface.nLv4',
    },
}

const MotionBox = motion(Box)

const MotionText = motion(Text)

export default function SofaInput({ selected, setSelected, ...restProps }: SofaInputProps) {
    const [opened, setOpened] = useState(false)

    const hintTextProps = selected === undefined ? hint : hintSelected

    return (
        <>
            <Box
                {...restProps}
                position="relative"
                h={48}
                display="flex"
                flexDirection="row"
                alignItems="center"
                bg="colors.surface.s2"
                border="solid 1px"
                borderColor={opened ? 'colors.primary.default' : 'colors.onSurface.nLv3'}
                borderRadius="radii.xs"
                p="11px 7px 11px 15px"
                gap={24}
                userSelect="none"
                zIndex={101}
                _hover={{
                    cursor: 'pointer',
                }}
                onClick={() => setOpened(o => !o)}
            >
                <Box flex={1}>
                    <MotionText layout {...hintTextProps}>
                        Language
                    </MotionText>
                    {selected && (
                        <Text {...typography.bodyP} color="colors.onSurface.nLv1">
                            {selected}
                        </Text>
                    )}
                </Box>
                <MotionPointerDownBox
                    initial={{ rotate: 0 }}
                    animate={{ rotate: opened ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <PointerDown />
                </MotionPointerDownBox>
                <AnimatePresence>
                    {opened && (
                        <MotionBox
                            position="absolute"
                            top="calc(100% + 1px)"
                            left={0}
                            w="100%"
                            {...typography.bodyP}
                            color="colors.onSurface.nLv1"
                            bg="colors.surface.s0"
                            border="solid 1px"
                            borderColor="colors.onSurface.nLv3"
                            borderRadius="radii.xs"
                            overflow="hidden"
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                        >
                            <Flex {...optionStyle} onClick={() => setSelected('Croatian')}>
                                Croatian
                            </Flex>
                            <Flex {...optionStyle} onClick={() => setSelected('English')}>
                                English
                            </Flex>
                        </MotionBox>
                    )}
                </AnimatePresence>
            </Box>
            {opened && (
                <Box
                    backgroundColor="transparent"
                    w="100%"
                    h="100%"
                    position="fixed"
                    top={0}
                    left={0}
                    zIndex={100}
                    onClick={() => setOpened(false)}
                />
            )}
        </>
    )
}
