import typography from '@/utils/typography'
import { PeriodInterface } from '@/utils/utils'
import { Flex, FlexProps, Text } from '@kuma-ui/core'
import React from 'react'
import Incident from './Incident'

export interface PeriodCellProps extends FlexProps {
    sport: 'football' | 'basketball' | 'american-football'
    status: 'notstarted' | 'finished' | 'inprogress'
    period: PeriodInterface
}

export default function PeriodCell({ sport, period, status, ...restProps }: PeriodCellProps) {
    return (
        <Flex {...restProps} flexDirection="column" justifyContent="flex-start">
            <Flex justifyContent="center" alignItems="center" p={8}>
                <Flex
                    borderRadius={16}
                    bg="colors.secondary.highlight"
                    h={24}
                    flex={1}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Text {...typography.assistive}>{period.label}</Text>
                </Flex>
            </Flex>
            <Flex justifyContent="flex-start" flexDirection="column-reverse">
                {period.incidents.map(i => (
                    <Incident key={i.id} sport={sport} incident={i} />
                ))}
            </Flex>
        </Flex>
    )
}
