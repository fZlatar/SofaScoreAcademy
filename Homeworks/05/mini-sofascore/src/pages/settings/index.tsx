import { Box, Flex, Text } from '@kuma-ui/core'
import { ReactElement, useEffect, useState } from 'react'
import Layout from '@/modules/Layout'
import Head from 'next/head'
import { NextPageWithLayout } from '../_app'
import Breadcrumbs, { Crumb } from '@/components/Breadcrumbs'
import typography from '@/utils/typography'
import SofaInput from '@/components/SofaInput'
import SofaChoice from '@/components/SofaChoice'
import SofaLogo from '@/components/icons/SofaLogo'
import { useThemeContext } from '@/context/ThemeContext'
import { useDateContext } from '@/context/DateContext'
import { GetStaticPropsContext } from 'next'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'

const SettingsPage: NextPageWithLayout = () => {
    const router = useRouter()
    const locale = router.locale
    const t = useTranslations('SettingsPage')
    const { isDark, setIsDark } = useThemeContext()
    const { dateFormat, setDateFormat } = useDateContext()

    const [language, setLanguage] = useState<'Croatian' | 'English'>(locale === 'en' ? 'English' : 'Croatian')
    const [theme, setTheme] = useState(isDark ? 'dark' : 'light')
    const [dateFormatState, setDateFormatState] = useState<'DD / MM / YYYY' | 'MM / DD / YYYY'>(dateFormat)
    const crumbs: Crumb[] = [
        {
            name: t('title'),
            link: '/settings',
        },
    ]

    setIsDark(theme === 'dark')
    setDateFormat(dateFormatState)

    useEffect(() => {
        router.push(router.asPath, router.asPath, { locale: language === 'English' ? 'en' : 'hr' })
    }, [language])

    return (
        <>
            <Head>
                <title>{t('title')}</title>
                <meta name="description" content="Mini Sofascore app developed for Sofascore Academy 2024" />
            </Head>
            <Box ml={[0, 24]} mr={[0, 24]} mb={[0, 24]}>
                <Breadcrumbs w="100%" crumbs={crumbs} display={['none', 'flex']} />
                <Flex w="100%" justifyContent="center">
                    <Flex
                        w={['100%', 'calc(100% / 3)']}
                        bg="colors.surface.s1"
                        borderRadius={[0, 16]}
                        boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)"
                        overflow="hidden"
                        flexDir="column"
                        gap={16}
                        pb={16}
                    >
                        <Flex justifyContent="flex-start" alignItems="center" pl={16} pr={16} mt={16} h={48}>
                            <Text as="h1" color="colors.onSurface.nLv1" {...typography.h1}>
                                {t('title')}
                            </Text>
                        </Flex>
                        <SofaInput ml={8} mr={8} selected={language} setSelected={setLanguage} />
                        <SofaChoice ml={8} mr={8} mode="theme" selected={theme} setSelected={setTheme} />
                        <SofaChoice
                            ml={8}
                            mr={8}
                            mode="date"
                            selected={dateFormatState}
                            // @ts-ignore
                            setSelected={setDateFormatState}
                        />
                        <Flex
                            ml={8}
                            mr={8}
                            w="calc(100% - 16px)"
                            borderRadius={8}
                            bg="colors.surface.s2"
                            p="16px 16px 32px 16px"
                            color="colors.onSurface.nLv1"
                            flexDir="column"
                        >
                            <Text mb={16} as="h1" {...typography.h1}>
                                {t('about')}
                            </Text>
                            <Text mb={2} as="h2" {...typography.h2}>
                                {t('academy')}
                            </Text>
                            <Text mb={15} {...typography.bodyP}>
                                {t('class')}
                            </Text>
                            <Box mb={16} w="100%" borderTop="1px solid" borderColor="colors.onSurface.nLv4" />
                            <Text mb={2} color="colors.onSurface.nLv2" {...typography.assistive}>
                                {t('app')}
                            </Text>
                            <Text mb={16} {...typography.bodyP}>
                                {t('appName')}
                            </Text>
                            <Text mb={2} color="colors.onSurface.nLv2" {...typography.assistive}>
                                {t('api')}
                            </Text>
                            <Text mb={16} {...typography.bodyP}>
                                {t('apiCredit')}
                            </Text>
                            <Text mb={2} color="colors.onSurface.nLv2" {...typography.assistive}>
                                {t('developer')}
                            </Text>
                            <Text mb={16} {...typography.bodyP}>
                                {t('developerName')}
                            </Text>
                            <Box mb={16} w="100%" borderTop="1px solid" borderColor="colors.onSurface.nLv4" />
                            <Flex justifyContent="center" alignItems="center" color="colors.primary.default">
                                <SofaLogo width={132} height={20} />
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}

SettingsPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../../messages/${locale}.json`)).default,
        },
    }
}

export default SettingsPage
