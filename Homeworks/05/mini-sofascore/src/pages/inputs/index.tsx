import SofaButton from '@/components/SofaButton'
import SofaChoice from '@/components/SofaChoice'
import SofaInput from '@/components/SofaInput'
import { useThemeContext } from '@/context/ThemeContext'
import { Box, Flex } from '@kuma-ui/core'
import Head from 'next/head'
import React, { useState } from 'react'

export default function Inputs() {
    const { setIsDark } = useThemeContext()
    const [language, setLanguage] = useState<string | undefined>(undefined)
    const [format, setFormat] = useState<string | undefined>(undefined)
    return (
        <>
            <Head>
                <title>Inputs</title>
                <meta name="description" content="Mini Sofascore app developed for Sofascore Academy 2024" />
            </Head>
            <Box as="main">
                <SofaButton m={20} onClick={() => setIsDark(v => !v)} icon="withoutIcon">
                    Toggle theme
                </SofaButton>
                <Box w="100%">
                    <Flex p={20} justify="center" alignItems="center" gap={20} bg="yellow">
                        <SofaInput w={360} selected={language} setSelected={setLanguage} />
                    </Flex>
                    <Flex p={20} justify="center" alignItems="center" gap={20} bg="yellow">
                        <SofaChoice selected={format} setSelected={setFormat} w={360} />
                    </Flex>
                </Box>
            </Box>
        </>
    )
}
