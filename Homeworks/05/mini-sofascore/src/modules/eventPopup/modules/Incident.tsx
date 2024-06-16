import Autogoal from '@/components/icons/Autogoal'
import BasketballPoint1 from '@/components/icons/BasketballPoint1'
import BasketballPoint2 from '@/components/icons/BasketballPoint2'
import BasketballPoint3 from '@/components/icons/BasketballPoint3'
import ExtraPoint from '@/components/icons/ExtraPoint'
import FieldGoal from '@/components/icons/FieldGoal'
import FootballGoal from '@/components/icons/FootballGoal'
import PenaltyScore from '@/components/icons/PenaltyScore'
import RedCard from '@/components/icons/RedCard'
import Rogue from '@/components/icons/Rogue'
import Touchdown from '@/components/icons/Touchdown'
import YellowCard from '@/components/icons/YellowCard'
import { EventIncident } from '@/models/event'
import typography from '@/utils/typography'
import { Flex, FlexProps, Text, Box } from '@kuma-ui/core'
import React from 'react'

export interface IncidentProps extends FlexProps {
    sport: 'football' | 'basketball' | 'american-football'
    incident: EventIncident
}

export default function Incident({ sport, incident, ...restProps }: IncidentProps) {
    if (sport === 'football') {
        if (incident.type === 'card') {
            return (
                <Flex
                    h={56}
                    justifyContent="flex-start"
                    flexDirection={incident.teamSide === 'home' ? 'row' : 'row-reverse'}
                    {...restProps}
                >
                    <Flex flexDirection="column" justifyContent="center" alignItems="center" w={40} ml={8} mr={8}>
                        <Flex justifyContent="center" alignItems="center" position="relative" w={28} h={28}>
                            {incident.color === 'red' ? (
                                <RedCard />
                            ) : incident.color === 'yellow' ? (
                                <YellowCard />
                            ) : (
                                <>
                                    <Box zIndex={100} position="absolute" left={4} top={0}>
                                        <RedCard />
                                    </Box>
                                    <Box zIndex={99} position="absolute" left={0} top={4}>
                                        <YellowCard />
                                    </Box>
                                </>
                            )}
                        </Flex>
                        <Text {...typography.micro} color="colors.onSurface.nLv2">
                            {incident.time}'
                        </Text>
                    </Flex>
                    <Box h="calc(100% - 16px)" mt={8} borderRight="1px solid" borderColor="colors.onSurface.nLv4" />
                    <Flex
                        flexDirection="column"
                        justifyContent="center"
                        ml={12}
                        mr={12}
                        textAlign={incident.teamSide === 'home' ? 'left' : 'right'}
                    >
                        <Text color="colors.onSurface.nLv1" {...typography.body}>
                            {incident.player.name}
                        </Text>
                        <Text
                            color="colors.onSurface.nLv2"
                            {...typography.micro}
                            textAlign={incident.teamSide === 'home' ? 'left' : 'right'}
                        >
                            Foul
                        </Text>
                    </Flex>
                </Flex>
            )
        }
        if (incident.type === 'goal') {
            return (
                <Flex
                    h={56}
                    justifyContent="flex-start"
                    flexDirection={incident.scoringTeam === 'home' ? 'row' : 'row-reverse'}
                    {...restProps}
                >
                    <Flex flexDirection="column" justifyContent="center" alignItems="center" w={40} ml={8} mr={8}>
                        <Flex justifyContent="center" alignItems="center" w={28} h={28}>
                            {incident.goalType === 'regular' ? (
                                <FootballGoal />
                            ) : incident.goalType === 'owngoal' ? (
                                <Autogoal />
                            ) : (
                                <PenaltyScore />
                            )}
                        </Flex>
                        <Text {...typography.micro} color="colors.onSurface.nLv2">
                            {incident.time}'
                        </Text>
                    </Flex>
                    <Box h="calc(100% - 16px)" mt={8} borderRight="1px solid" borderColor="colors.onSurface.nLv4" />
                    <Flex
                        flexDirection={incident.scoringTeam === 'home' ? 'row-reverse' : 'row'}
                        justifyContent="center"
                        alignItems="center"
                        ml={12}
                        mr={12}
                        textAlign={incident.scoringTeam === 'home' ? 'left' : 'right'}
                        color="colors.onSurface.nLv1"
                    >
                        <Text {...typography.body} ml={8} mr={8}>
                            {incident.player.name}
                        </Text>
                        <Text {...typography.h1} minW={70} textAlign="center">
                            {incident.homeScore} - {incident.awayScore}
                        </Text>
                    </Flex>
                </Flex>
            )
        }
    }
    if (sport === 'basketball') {
        if (incident.type === 'goal') {
            return (
                <Flex
                    h={56}
                    justifyContent="flex-start"
                    flexDirection={incident.scoringTeam === 'home' ? 'row' : 'row-reverse'}
                    position="relative"
                    {...restProps}
                >
                    <Flex flexDirection="column" justifyContent="center" alignItems="center" w={40} ml={8} mr={8}>
                        <Flex justifyContent="center" alignItems="center" w={28} h={28}>
                            {incident.goalType === 'onepoint' ? (
                                <BasketballPoint1 />
                            ) : incident.goalType === 'twopoint' ? (
                                <BasketballPoint2 />
                            ) : (
                                <BasketballPoint3 />
                            )}
                        </Flex>
                    </Flex>
                    <Box h="calc(100% - 16px)" mt={8} borderRight="1px solid" borderColor="colors.onSurface.nLv4" />
                    <Flex justifyContent="center" alignItems="center">
                        <Text {...typography.h3} color="colors.onSurface.nLv1" w={65} textAlign="center">
                            {incident.homeScore} - {incident.awayScore}
                        </Text>
                    </Flex>
                    <Flex
                        w={24}
                        h="100%"
                        justifyContent="center"
                        alignItems="center"
                        borderBottom="1px solid"
                        borderColor="colors.onSurface.nLv4"
                        position="absolute"
                        top={0}
                        left="calc(50% - 12px)"
                    >
                        <Text {...typography.micro} color="colors.onSurface.nLv2" textAlign="center">
                            {incident.time}'
                        </Text>
                    </Flex>
                </Flex>
            )
        }
    }
    if (sport === 'american-football') {
        if (incident.type === 'goal') {
            return (
                <Flex
                    h={56}
                    justifyContent="flex-start"
                    flexDirection={incident.scoringTeam === 'home' ? 'row' : 'row-reverse'}
                    {...restProps}
                >
                    <Flex flexDirection="column" justifyContent="center" alignItems="center" w={40} ml={8} mr={8}>
                        <Flex justifyContent="center" alignItems="center" w={28} h={28}>
                            {incident.goalType === 'fieldgoal' ? (
                                <FieldGoal />
                            ) : incident.goalType === 'touchdown' ? (
                                <Touchdown />
                            ) : incident.goalType === 'extrapoint' ? (
                                <ExtraPoint />
                            ) : (
                                <Rogue />
                            )}
                        </Flex>
                        <Text {...typography.micro} color="colors.onSurface.nLv2">
                            {incident.time}'
                        </Text>
                    </Flex>
                    <Box h="calc(100% - 16px)" mt={8} borderRight="1px solid" borderColor="colors.onSurface.nLv4" />
                    <Flex
                        flexDirection={incident.scoringTeam === 'home' ? 'row-reverse' : 'row'}
                        justifyContent="center"
                        alignItems="center"
                        ml={12}
                        mr={12}
                        textAlign={incident.scoringTeam === 'home' ? 'left' : 'right'}
                        color="colors.onSurface.nLv1"
                    >
                        <Text {...typography.body} ml={8} mr={8}>
                            {incident.player.name}
                        </Text>
                        <Text {...typography.h1} minW={70} textAlign="center">
                            {incident.homeScore} - {incident.awayScore}
                        </Text>
                    </Flex>
                </Flex>
            )
        }
    }
}
