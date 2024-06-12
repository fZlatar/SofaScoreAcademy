import { EventDetails } from '@/models/event'
import { Button, Flex, FlexProps, Text } from '@kuma-ui/core'
import React, { useState } from 'react'
import Event from '@/modules/events/modules/Event'
import useBreakpoint from '@/hooks/useBreakpoint'
import { useRouter } from 'next/router'
import SofaTabs, { SofaTab } from '@/components/SofaTabs'
import typography from '@/utils/typography'
import { useTranslations } from 'next-intl'
import { DateTime } from 'luxon'

export interface FavoritesEventsProps extends FlexProps {
    favorites: EventDetails[]
    setSelected: (event: EventDetails) => void
}

export default function FavoriteEvents({ favorites, setSelected, ...restProps }: FavoritesEventsProps) {
    const [selectedTab, setSelectedTab] = useState<'previous' | 'next' | 'current'>('current')
    const t = useTranslations('FavoriteEvents')
    const { isSmall } = useBreakpoint()
    const router = useRouter()

    const favoritesByDate = getFavoritesByDate(favorites, selectedTab)

    const handleOnClickEvent = (event: EventDetails) => {
        setSelected(event)
        if (isSmall) {
            router.push(`/${event.tournament.sport.slug}/match/${event.slug}/${event.id}`)
        }
    }

    return (
        <Flex
            {...restProps}
            justifyContent="flex-start"
            flexDirection="column"
            borderRadius="radii.xl"
            boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)"
            overflow="hidden"
            bg="colors.surface.s1"
            pb={favorites.length !== 0 ? 16 : 0}
            ml={[8, 0]}
            mr={[8, 0]}
        >
            <Flex w="100%" h={48} bg="colors.primary.variant">
                <SofaTabs w="100%" mode="negative">
                    <Button w="calc(100% / 3)" variant="wrapper" onClick={() => setSelectedTab('previous')}>
                        <SofaTab w="100%" mode="negative" selected={selectedTab === 'previous'}>
                            <Flex gap="spacings.xs" flexDirection="row" justifyContent="center" alignItems="center">
                                <Text {...typography.body}>{t('previous')}</Text>
                            </Flex>
                        </SofaTab>
                    </Button>
                    <Button w="calc(100% / 3)" variant="wrapper" onClick={() => setSelectedTab('current')}>
                        <SofaTab w="100%" mode="negative" selected={selectedTab === 'current'}>
                            <Flex gap="spacings.xs" flexDirection="row" justifyContent="center" alignItems="center">
                                <Text {...typography.body}>{t('current')}</Text>
                            </Flex>
                        </SofaTab>
                    </Button>
                    <Button w="calc(100% / 3)" variant="wrapper" onClick={() => setSelectedTab('next')}>
                        <SofaTab w="100%" mode="negative" selected={selectedTab === 'next'}>
                            <Flex gap="spacings.xs" flexDirection="row" justifyContent="center" alignItems="center">
                                <Text {...typography.body}>{t('next')}</Text>
                            </Flex>
                        </SofaTab>
                    </Button>
                </SofaTabs>
            </Flex>
            {favoritesByDate.map(f => (
                <Event event={f} onClick={() => handleOnClickEvent(f)} />
            ))}
            {favoritesByDate.length === 0 && (
                <Flex h={48} w="100%" justifyContent="center" alignItems="center">
                    <Text {...typography.body}>{t('message')}</Text>
                </Flex>
            )}
        </Flex>
    )
}

function getFavoritesByDate(favorites: EventDetails[], when: 'previous' | 'next' | 'current') {
    const now = DateTime.now().startOf('day')
    if (when === 'current') {
        return favorites
            .filter(f => {
                if (f.startDate) {
                    const date = DateTime.fromISO(f.startDate).startOf('day')
                    return date.hasSame(now, 'day') || date.plus({ days: 1 }).hasSame(now, 'day')
                }
                return false
            })
            .sort((a, b) => {
                if (a.startDate && b.startDate) {
                    const date1 = DateTime.fromISO(a.startDate).toMillis()
                    const date2 = DateTime.fromISO(b.startDate).toMillis()
                    return date1 - date2
                }
                return -1
            })
    }
    if (when === 'previous') {
        return favorites
            .filter(f => {
                if (f.startDate) {
                    const date = DateTime.fromISO(f.startDate).startOf('day')
                    return date < now
                }
                return false
            })
            .sort((a, b) => {
                if (a.startDate && b.startDate) {
                    const date1 = DateTime.fromISO(a.startDate).toMillis()
                    const date2 = DateTime.fromISO(b.startDate).toMillis()
                    return date2 - date1
                }
                return -1
            })
    }
    if (when === 'next') {
        return favorites
            .filter(f => {
                if (f.startDate) {
                    const date = DateTime.fromISO(f.startDate).startOf('day')
                    return date > now.plus({ days: 1 })
                }
                return false
            })
            .sort((a, b) => {
                if (a.startDate && b.startDate) {
                    const date1 = DateTime.fromISO(a.startDate).toMillis()
                    const date2 = DateTime.fromISO(b.startDate).toMillis()
                    return date1 - date2
                }
                return 1
            })
    }
    return []
}
