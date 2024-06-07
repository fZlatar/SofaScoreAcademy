import { Flex, FlexProps, Text, Image, Box } from '@kuma-ui/core'
import React from 'react'
import typography from '@/utils/typography'
import { getTournamentImageSrc } from '@/api/tournamentApi'
import PointerRight from '@/components/icons/PointerRight'
import Event from './Event'
import { EventDetails } from '@/models/event'

export interface TournamentEventsProps extends FlexProps {
    tournament: {
        id: number
        name: string
        slug: string
        sport: { id: number; name: string; slug: 'football' | 'basketball' | 'american-football' }
        country: { id: number; name: string }
    }
    index: number
    data: EventDetails[]
    selected: EventDetails | undefined
    handleOnClickEvent: (event: EventDetails) => void
}
export default function TournamentEvents({
    tournament,
    index,
    data,
    selected,
    handleOnClickEvent,
    ...restProps
}: TournamentEventsProps) {
    return (
        <Flex key={`tournament-${tournament.id}`} flexDirection="column" justifyContent="flex-start" {...restProps}>
            {index !== 0 && <Box borderBottom="1px solid" borderColor="colors.onSurface.nLv4" w="100%" mt={8} />}
            <Flex justifyContent="flex-start" flexDirection="row" alignItems="center" h={56}>
                <Image src={getTournamentImageSrc(tournament.id)} w={32} h={32} ml={16} />
                <Flex
                    {...typography.h3}
                    justifyContent="flex-start"
                    alignItems="center"
                    ml={32}
                    color="colors.onSurface.nLv2"
                >
                    <Text as="h3" color="colors.onSurface.nLv1">
                        {tournament.country.name}
                    </Text>
                    <PointerRight width={24} height={24} />
                    <Text as="h3" color="colors.onSurface.nLv2">
                        {tournament.name}
                    </Text>
                </Flex>
            </Flex>

            {data.map(
                event =>
                    event.tournament.id === tournament.id && (
                        <Event
                            event={event}
                            key={`event-${event.id}`}
                            selected={selected && selected.id}
                            onClick={() => handleOnClickEvent(event)}
                        />
                    )
            )}
        </Flex>
    )
}
