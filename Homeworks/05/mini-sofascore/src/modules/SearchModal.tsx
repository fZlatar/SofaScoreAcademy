import { getSearchPlayersSwr, getSearchTeamsSwr } from '@/api/searchApi'
import { fetcher } from '@/pages/_app'
import { Text, Flex, FlexProps, Input, Image } from '@kuma-ui/core'
import React, { useState } from 'react'
import useSWR from 'swr'
import { PlayerItem } from './TeamSquad'
import Link from 'next/link'
import { SearchPlayer, SearchTeam } from '@/models/search'
import typography from '@/utils/typography'
import { getTeamImageSrc } from '@/api/teamApi'
import countries from '@/utils/countries'
import { useRouter } from 'next/router'

export interface SearchModalProps extends FlexProps {
    onClose: (b: boolean) => void
}

export default function SearchModal({ onClose }: SearchModalProps) {
    const locale = useRouter().locale
    const [query, setQuery] = useState<string>('')
    const { data: teams, error: errorTeams } = useSWR<SearchTeam[]>(
        query.length >= 2 && query.length <= 100 ? getSearchTeamsSwr(query) : null,
        fetcher
    )
    const { data: players, error: playersError } = useSWR<SearchPlayer[]>(
        query.length >= 2 && query.length <= 100 ? getSearchPlayersSwr(query) : null,
        fetcher
    )

    return (
        <Flex
            position="fixed"
            top={0}
            left={0}
            w="100%"
            h="100vh"
            justifyContent="center"
            alignItems="flex-start"
            zIndex={2000}
            pt={56}
            onClick={() => onClose(false)}
            overflow="hidden"
        >
            <Flex
                w="80%"
                minH={100}
                maxH="80%"
                bg="colors.surface.s1"
                borderRadius={16}
                boxShadow="0 2px 16px 0 rgba(0, 0, 0, 0.12)"
                zIndex={2001}
                justifyContent="center"
                alignItems="flex-start"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                p={12}
                flexDir="column"
                overflow="hidden"
                gap={12}
            >
                <Flex w="100%" h={48} gap={12} justifyContent="center">
                    <Input
                        maxW={300}
                        h={48}
                        bg="colors.surface.s2"
                        color="colors.onSurface.nLv1"
                        border="none"
                        borderRadius={4}
                        pl={12}
                        pr={12}
                        onChange={(e: { target: { value: React.SetStateAction<string> } }) => setQuery(e.target.value)}
                    />
                </Flex>
                {players && (
                    <Flex
                        maxH="35%"
                        overflowY="scroll"
                        w="100%"
                        flexDir="column"
                        borderRadius={8}
                        bg="colors.surface.s2"
                        pt={12}
                    >
                        <Flex h={48} justifyContent="center" alignItems="center">
                            <Text>{locale === 'en' ? 'Players' : 'Igrači'}</Text>
                        </Flex>
                        <Flex flexDir="column">
                            {players.map((p, i) => {
                                if (i < 10) {
                                    return (
                                        <Link
                                            href={`/${p.sport.slug}/player/${p.id}`}
                                            onClick={() => onClose(false)}
                                            key={p.id}
                                        >
                                            <PlayerItem w="100%" player={p} />
                                        </Link>
                                    )
                                }
                            })}
                        </Flex>
                    </Flex>
                )}
                {teams && (
                    <Flex
                        maxH="35%"
                        overflowY="scroll"
                        w="100%"
                        flexDir="column"
                        borderRadius={8}
                        bg="colors.surface.s2"
                        pt={12}
                    >
                        <Flex h={48} justifyContent="center" alignItems="center">
                            <Text>{locale === 'en' ? 'Teams' : 'Klubovi'}</Text>
                        </Flex>
                        <Flex flexDir="column">
                            {teams.map((t, i) => {
                                if (i < 10) {
                                    return (
                                        <Link
                                            href={`/${t.sport.slug}/team/${t.id}`}
                                            onClick={() => onClose(false)}
                                            key={t.id}
                                        >
                                            <Flex
                                                w="100%"
                                                h={56}
                                                p="8px 16px 8px 16px"
                                                flexDirection="row"
                                                justifyContent="flex-start"
                                                alignItems="center"
                                                gap={16}
                                                color="colors.onSurface.nLv1"
                                            >
                                                <Image w={40} h={40} src={getTeamImageSrc(t.id)} />

                                                <Flex
                                                    flexDir="column"
                                                    gap={4}
                                                    alignItems="flex-start"
                                                    justifyContent="flex-start"
                                                >
                                                    <Text {...typography.assistive}>{t.name}</Text>
                                                    <Flex
                                                        h={16}
                                                        flexDir="row"
                                                        justifyContent="flex-start"
                                                        alignItems="center"
                                                        gap={4}
                                                    >
                                                        <Image
                                                            w={16}
                                                            h={16}
                                                            src={`https://www.sofascore.com/static/images/flags/${
                                                                countries.find(c => c.name === t.country.name)?.short
                                                            }.png`}
                                                        />
                                                        <Text color="colors.onSurface.nLv2" {...typography.assistive}>
                                                            {t.country.name}
                                                        </Text>
                                                    </Flex>
                                                </Flex>
                                            </Flex>
                                        </Link>
                                    )
                                }
                            })}
                        </Flex>
                    </Flex>
                )}
            </Flex>
        </Flex>
    )
}
