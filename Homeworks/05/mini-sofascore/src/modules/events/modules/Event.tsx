import { Flex, FlexProps, Text, Image, Box } from '@kuma-ui/core'
import React from 'react'
import typography from '@/utils/typography'
import { DateTime } from 'luxon'
import { getTeamImageSrc } from '@/api/teamApi'
import { EventDetails } from '@/models/event'
import { useDateContext } from '@/context/DateContext'
import { useTranslations } from 'next-intl'
import FavoriteIcon from '@/components/icons/FavoriteIcon'
import NotFavoriteIcon from '@/components/icons/NotFavoriteIcon'
import { useFavoritesContext } from '@/context/FavoritesContext'

export interface EventProps extends FlexProps {
    event: EventDetails
    selected?: number
    dateAndTime?: boolean
    onClick: () => void
}

export default function Event({ event, selected, onClick, dateAndTime, ...restProps }: EventProps) {
    const { isFavorite, addFavorite, removeFavorite } = useFavoritesContext()
    const t = useTranslations('Event')
    const { dateFormat } = useDateContext()

    const handleOnClickFavorite = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (isFavorite(event.id)) {
            removeFavorite(event.id)
        } else {
            addFavorite(event)
        }
    }

    return (
        <Flex
            {...restProps}
            h={56}
            flexDirection="row"
            cursor="pointer"
            bg={event.id === selected ? 'colors.primary.highlight' : 'default'}
            _hover={{
                bg: 'colors.primary.highlight',
            }}
            transition="all 0.3s ease"
            onClick={onClick}
        >
            <Flex
                w={64}
                {...typography.micro}
                color="colors.onSurface.nLv2"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
                flexDirection="column"
                flexShrink={0}
            >
                {dateAndTime ? (
                    <>
                        <Text>
                            {event.startDate
                                ? dateFormat === 'DD / MM / YYYY'
                                    ? DateTime.fromISO(event.startDate).toFormat('dd.MM.')
                                    : DateTime.fromISO(event.startDate).toFormat('MM.dd.')
                                : t('unknown')}
                        </Text>
                        <Text>
                            {event.startDate ? DateTime.fromISO(event.startDate).toFormat('HH:mm') : t('unknown')}
                        </Text>
                    </>
                ) : (
                    <>
                        <Text>
                            {event.startDate ? DateTime.fromISO(event.startDate).toFormat('HH:mm') : t('unknown')}
                        </Text>
                        <Text>
                            {event.status === 'finished' ? 'FT' : event.status === 'inprogress' ? t('live') : '-'}
                        </Text>
                    </>
                )}
            </Flex>
            <Box borderRight="1px solid" borderColor="colors.onSurface.nLv4" h="calc(100% - 16px)" mt={8} />
            <Flex
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                {...typography.body}
                flex={1}
                gap={4}
                minW={0}
            >
                <Flex
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    h={16}
                    w="100%"
                    pr={16}
                    pl={16}
                    color={event.winnerCode === 'away' ? 'colors.onSurface.nLv2' : 'colors.onSurface.nLv1'}
                >
                    <Flex
                        flexDirection="row"
                        justifyContent="flex-start"
                        gap={8}
                        overflow="hidden"
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                    >
                        <Image src={getTeamImageSrc(event.homeTeam.id)} w={16} h={16} />
                        <Text textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
                            {event.homeTeam.name}
                        </Text>
                    </Flex>
                    <Text ml={8}>{event.homeScore.total !== null && event.homeScore.total}</Text>
                </Flex>
                <Flex
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    h={16}
                    w="100%"
                    pr={16}
                    pl={16}
                    color={event.winnerCode === 'home' ? 'colors.onSurface.nLv2' : 'colors.onSurface.nLv1'}
                >
                    <Flex
                        flexDirection="row"
                        justifyContent="flex-start"
                        gap={8}
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                    >
                        <Image src={getTeamImageSrc(event.awayTeam.id)} w={16} h={16} />
                        <Text textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
                            {event.awayTeam.name}
                        </Text>
                    </Flex>
                    <Text ml={8}>{event.awayScore.total !== null && event.awayScore.total}</Text>
                </Flex>
            </Flex>
            <Box borderRight="1px solid" borderColor="colors.onSurface.nLv4" h="calc(100% - 16px)" mt={8} />
            <Flex
                justifyContent="center"
                alignItems="center"
                w={40}
                color="colors.primary.default"
                onClick={(e: React.MouseEvent<Element, MouseEvent>) => handleOnClickFavorite(e)}
            >
                {isFavorite(event.id) ? <FavoriteIcon /> : <NotFavoriteIcon />}
            </Flex>
        </Flex>
    )
}
