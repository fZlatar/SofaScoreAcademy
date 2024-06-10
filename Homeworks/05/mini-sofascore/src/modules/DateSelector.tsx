import ChevronLeft from '@/components/icons/ChevronLeft'
import ChevronRight from '@/components/icons/ChevronRight'
import typography from '@/utils/typography'
import { Box, BoxProps, Button, Flex, FlexProps, Text } from '@kuma-ui/core'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { DateTime } from 'luxon'

export interface DateSelectorProps extends FlexProps {
    selected: DateTime
    setSelected: (date: DateTime) => void
}

const buttonStyles = {
    borderRadius: 'radii.xs',
    p: 'spacings.xs',
    w: '32px',
    h: '32px',
    bg: 'colors.surface.s1',
    color: 'colors.primary.default',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: '8px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    _hover: {
        bg: 'colors.surface.s0',
    },
}

const flexStyles1: Partial<FlexProps> = {
    w: '100%',
    bg: 'colors.primary.variant',
    overflow: 'hidden',
    position: 'relative',
    p: '0 40px',
    justifyContent: 'center',
}

const flexStyles2: Partial<FlexProps> = {
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    ...typography.micro,
    color: 'colors.surface.s1',
    flex: 1,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    _hover: {
        bg: 'colors.primary.default',
    },
    position: 'relative',
}

const boxStyles: Partial<BoxProps> = {
    h: 4,
    w: 'calc(100% - 8px)',
    bg: 'colors.surface.s1',
    position: 'absolute',
    borderRadius: '2px 2px 0 0',
    bottom: 0,
    left: 4,
}

const MotionFlex = motion(Flex)

const variants = {
    enter: (direction: 'left' | 'right') => {
        return {
            x: direction === 'left' ? '-200%' : '200%',
            width: 0,
            opacity: 0,
        }
    },
    center: {
        x: 0,
        width: '100%',
        opacity: 1,
    },
    exit: (direction: 'left' | 'right') => {
        return {
            x: direction === 'left' ? '200%' : '-200%',
            opacity: 0,
            width: 0,
        }
    },
}

export default function DateSelector({ selected, setSelected, ...restProps }: DateSelectorProps) {
    const [dates, setDates] = useState<DateTime[]>([])
    const [isSmallWidth, setIsSmallWidth] = useState(false)
    const [direction, setDirection] = useState<'left' | 'right'>('right')
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        generateDates(selected)

        const handleResize = () => {
            if (containerRef.current) {
                setIsSmallWidth(containerRef.current.offsetWidth < 320)
            }
        }

        handleResize()

        const resizeObserver = new ResizeObserver(handleResize)
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current)
        }

        return () => {
            if (containerRef.current) {
                resizeObserver.unobserve(containerRef.current)
            }
        }
    }, [])

    const generateDates = (centerDate: DateTime) => {
        const datesArray: DateTime[] = []

        for (let i = -3; i <= 3; i++) {
            datesArray.push(centerDate.plus({ days: i }))
        }

        setDates(datesArray)
    }

    const handleScroll = (direction: 'left' | 'right') => {
        const newMiddleDate = dates[3].plus({ days: direction === 'left' ? -7 : 7 })
        generateDates(newMiddleDate)
        setDirection(direction)
    }

    return (
        <Flex {...restProps} {...flexStyles1} ref={containerRef}>
            <Button {...buttonStyles} left={8} position="absolute" onClick={() => handleScroll('left')}>
                <ChevronLeft />
            </Button>
            <Button {...buttonStyles} right={8} position="absolute" onClick={() => handleScroll('right')}>
                <ChevronRight />
            </Button>
            <AnimatePresence initial={false} custom={direction} mode="sync">
                <MotionFlex
                    key={dates[3] ? dates[3].toISO() : 'undefined'}
                    w="100%"
                    flexDirection="row"
                    display="flex"
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: 'tween', stiffness: 300, damping: 30, duration: 0.2 },
                        opacity: { duration: 0.2 },
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                >
                    {dates.map(date => (
                        <Flex key={date.toString()} {...flexStyles2} onClick={() => setSelected(date)}>
                            {!isSmallWidth ? (
                                <>
                                    <Text textAlign="center">
                                        {datesEqual(date, DateTime.now())
                                            ? 'TODAY'
                                            : date.toFormat('EEE').toUpperCase()}
                                    </Text>
                                    <Text textAlign="center">{date.toFormat('dd.MM.')}</Text>
                                </>
                            ) : (
                                <>
                                    <Text textAlign="center">{date.toFormat('dd')}</Text>
                                    <Text textAlign="center">{date.toFormat('MM')}</Text>
                                </>
                            )}
                            {datesEqual(date, selected) && <Box {...boxStyles} />}
                        </Flex>
                    ))}
                </MotionFlex>
            </AnimatePresence>
        </Flex>
    )
}

export function datesEqual(date1: DateTime, date2: DateTime): boolean {
    return date1.hasSame(date2, 'day')
}
