import SofaButton from '@/components/SofaButton'
import SofaSelector, { SofaOptionItem } from '@/components/SofaSelector'
import { useThemeContext } from '@/context/ThemeContext'
import { Box, Flex, Image } from '@kuma-ui/core'
import Head from 'next/head'
import React, { useState } from 'react'

const barLogo = '/images/barcelona.2817.png'
const munLogo = '/images/manchester-united.35.png'

export default function Buttons() {
    const [selected, setSelected] = useState<undefined | string>(undefined)
    const [selectedSimple, setSelectedSimple] = useState<undefined | string>(undefined)
    const [selectedIcon, setSelectedIcon] = useState<undefined | React.ReactNode>(undefined)
    const { setIsDark } = useThemeContext()

    const selectOption = (selectedOptionLabel: string, selectedOptionIcon: React.ReactNode) => {
        setSelected(selectedOptionLabel)
        setSelectedIcon(selectedOptionIcon)
    }

    return (
        <>
            <Head>
                <title>Buttons</title>
                <meta name="description" content="Mini Sofascore app developed for Sofascore Academy 2024" />
            </Head>
            <Box as="main">
                <SofaButton m={20} onClick={() => setIsDark(v => !v)} icon="withoutIcon">
                    Toggle theme
                </SofaButton>
                <Box w="100%">
                    <Flex m={20} justify="flex-start" alignItems="center" gap={20}>
                        <SofaButton>Filled</SofaButton>
                        <SofaButton variant="stroked">Stroked</SofaButton>
                        <SofaButton variant="unshielded">Unshielded</SofaButton>
                    </Flex>
                    <Flex m={20} justify="flex-start" alignItems="center" gap={20}>
                        <SofaButton disabled>Filled</SofaButton>
                        <SofaButton variant="stroked" disabled>
                            Stroked
                        </SofaButton>
                        <SofaButton variant="unshielded" disabled>
                            Unshielded
                        </SofaButton>
                    </Flex>
                    <Flex m={20} justify="flex-start" alignItems="center" gap={20}>
                        <SofaButton icon="withoutIcon">Filled</SofaButton>
                        <SofaButton variant="stroked" icon="withoutIcon">
                            Stroked
                        </SofaButton>
                        <SofaButton variant="unshielded" icon="withoutIcon">
                            Unshielded
                        </SofaButton>
                    </Flex>
                    <Flex m={20} justify="flex-start" alignItems="center" gap={20}>
                        <SofaButton disabled icon="withoutIcon">
                            Filled
                        </SofaButton>
                        <SofaButton variant="stroked" disabled icon="withoutIcon">
                            Stroked
                        </SofaButton>
                        <SofaButton variant="unshielded" disabled icon="withoutIcon">
                            Unshielded
                        </SofaButton>
                    </Flex>
                    <Flex m={20} justify="flex-start" alignItems="center" gap={20}>
                        <SofaButton icon="iconOnly">Filled</SofaButton>
                        <SofaButton variant="stroked" icon="iconOnly">
                            Stroked
                        </SofaButton>
                        <SofaButton variant="unshielded" icon="iconOnly">
                            Unshielded
                        </SofaButton>
                    </Flex>
                    <Flex m={20} justify="flex-start" alignItems="center" gap={20}>
                        <SofaButton disabled icon="iconOnly">
                            Filled
                        </SofaButton>
                        <SofaButton variant="stroked" disabled icon="iconOnly">
                            Stroked
                        </SofaButton>
                        <SofaButton variant="unshielded" disabled icon="iconOnly">
                            Unshielded
                        </SofaButton>
                    </Flex>
                    <Flex m={20} justify="flex-start" alignItems="center" gap={20}>
                        <SofaSelector
                            mode="mode1"
                            selected={selected}
                            placeholder="Select one"
                            selectedIcon={selectedIcon}
                        >
                            <SofaOptionItem
                                icon={<Image src={barLogo} alt="Bar" />}
                                value="Bar"
                                label="Barcelona"
                                onClick={() => selectOption('Barcelona', <Image src={barLogo} alt="Bar" />)}
                            />
                            <SofaOptionItem
                                icon={<Image src={munLogo} alt="Mun" />}
                                value="Mun"
                                label="Manchester United"
                                onClick={() => selectOption('Manchester United', <Image src={munLogo} alt="Mun" />)}
                            />
                            <SofaOptionItem
                                icon={<Image src={barLogo} alt="Bar" />}
                                value="Bar"
                                label="Barcelona"
                                onClick={() => selectOption('Barcelona', <Image src={barLogo} alt="Bar" />)}
                            />
                        </SofaSelector>
                        <SofaSelector mode="mode2" selected={selectedSimple} placeholder="Select one">
                            <SofaOptionItem
                                value="Bar"
                                label="Barcelona"
                                onClick={() => setSelectedSimple('Barcelona')}
                            />
                            <SofaOptionItem
                                value="Mun"
                                label="Manchester United"
                                onClick={() => setSelectedSimple('Manchester United')}
                            />
                            <SofaOptionItem
                                value="Bar"
                                label="Barcelona"
                                onClick={() => setSelectedSimple('Barcelona')}
                            />
                        </SofaSelector>
                    </Flex>
                </Box>
            </Box>
        </>
    )
}
