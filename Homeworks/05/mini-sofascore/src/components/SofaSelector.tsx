import { Box, styled } from '@kuma-ui/core'
import React, { PropsWithChildren, useState } from 'react'
import PointerDown from './icons/PointerDown'
import typography from '@/utils/typography'
import { AnimatePresence, motion } from 'framer-motion'

export interface SofaSelectorProps extends PropsWithChildren {
    placeholder?: string
    selected?: string
    selectedIcon?: React.ReactNode
    mode?: 'mode1' | 'mode2'
}

const LabelDiv = styled('div')`
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`

const IconContainer = styled('div')`
    width: 16px;
    height: 16px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`

const MotionPointerDownBox = motion(styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
`)

const MotionBox = motion(Box)

export default function SofaSelector({ placeholder, selected, selectedIcon, mode, ...restProps }: SofaSelectorProps) {
    const [opened, setOpened] = useState(false)

    return (
        <>
            <MotionBox
                position="relative"
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                bg={mode === 'mode2' ? 'colors.surface.s1' : 'colors.surface.s2'}
                color="colors.onSurface.nLv1"
                pt="spacings.xs"
                pr="spacings.xs"
                pb="spacings.xs"
                pl="spacings.md"
                gap="spacings.sm"
                borderRadius="radii.sm"
                userSelect="none"
                zIndex={201}
                {...typography.assistive}
                _hover={{
                    cursor: 'pointer',
                }}
                layout
                onClick={() => {
                    setOpened(o => !o)
                }}
            >
                {selectedIcon && <IconContainer>{selectedIcon}</IconContainer>}
                <LabelDiv>
                    <span>
                        {selected === undefined ? (placeholder === undefined ? 'Placeholder' : placeholder) : selected}
                    </span>
                    <MotionPointerDownBox
                        initial={{ rotate: 0 }}
                        animate={{ rotate: opened ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <PointerDown />
                    </MotionPointerDownBox>
                </LabelDiv>
                <AnimatePresence mode="wait">
                    {opened && (
                        <MotionBox
                            position="absolute"
                            top="100%"
                            left={0}
                            minW="100%"
                            display="flex"
                            flexDirection="column"
                            bg={mode === 'mode2' ? 'colors.surface.s2' : 'colors.surface.s1'}
                            borderRadius="radii.sm"
                            gap="spacings.xs"
                            boxShadow="0 2px 16px 0 rgba(0, 0, 0, 0.12)"
                            overflow="hidden"
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                        >
                            {restProps.children}
                        </MotionBox>
                    )}
                </AnimatePresence>
            </MotionBox>
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

export interface SofaOptionItemProps {
    value: string | number
    icon?: React.ReactNode
    label?: string
    onClick?: () => void
}

const OptionBox = styled('div')`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: t('spacings.xs');
    padding-top: t('spacings.xs');
    padding-bottom: t('spacings.xs');
    padding-left: t('spacings.sm');
    padding-right: t('spacings.sm');
    white-space: nowrap;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    &:hover {
        background-color: t('colors.surface.s0');
    }
    border-radius: t('radii.sm');
`

export function SofaOptionItem({ value, icon, label, ...restProps }: SofaOptionItemProps) {
    return (
        <OptionBox {...restProps}>
            {icon && <IconContainer>{icon}</IconContainer>}
            {label}
        </OptionBox>
    )
}
