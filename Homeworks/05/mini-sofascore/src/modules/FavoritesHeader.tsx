import SofaTabs, { SofaTab } from '@/components/SofaTabs'
import AmericanFootballIcon from '@/components/icons/AmericanFootballIcon'
import BasketballIcon from '@/components/icons/BasketballIcon'
import FootballIcon from '@/components/icons/FootballIcon'
import typography from '@/utils/typography'
import { Button, Flex, FlexProps, Text } from '@kuma-ui/core'
import { useTranslations } from 'next-intl'
import React from 'react'

export interface FavoritesHeaderProps extends FlexProps {
    selected: 'football' | 'basketball' | 'american-football'
    setSelected: (s: 'football' | 'basketball' | 'american-football') => void
}

export default function FavoritesHeader({ selected, setSelected, ...restProps }: FavoritesHeaderProps) {
    const t = useTranslations('FavoritesHeader')
    return (
        <Flex {...restProps} h={48}>
            <SofaTabs w="100%" mode="positive">
                <Button w={['calc(100% / 3)', 'auto']} variant="wrapper" onClick={() => setSelected('football')}>
                    <SofaTab w="100%" mode="positive" selected={selected === 'football'}>
                        <Flex gap="spacings.xs" flexDirection="row" justifyContent="center" alignItems="center">
                            <FootballIcon width={16} height={16} />
                            <Text {...typography.body}>{t('football')}</Text>
                        </Flex>
                    </SofaTab>
                </Button>
                <Button w={['calc(100% / 3)', 'auto']} variant="wrapper" onClick={() => setSelected('basketball')}>
                    <SofaTab w="100%" mode="positive" selected={selected === 'basketball'}>
                        <Flex gap="spacings.xs" flexDirection="row" justifyContent="center" alignItems="center">
                            <BasketballIcon width={16} height={16} />
                            <Text {...typography.body}>{t('basketball')}</Text>
                        </Flex>
                    </SofaTab>
                </Button>
                <Button
                    w={['calc(100% / 3)', 'auto']}
                    variant="wrapper"
                    onClick={() => setSelected('american-football')}
                >
                    <SofaTab w="100%" mode="positive" selected={selected === 'american-football'}>
                        <Flex gap="spacings.xs" flexDirection="row" justifyContent="center" alignItems="center">
                            <AmericanFootballIcon width={16} height={16} />
                            <Text display={['none', 'block']} {...typography.body}>
                                {t('americanFootball')}
                            </Text>
                            <Text display={['block', 'none']} {...typography.body}>
                                {t('americanFootballShort')}
                            </Text>
                        </Flex>
                    </SofaTab>
                </Button>
            </SofaTabs>
        </Flex>
    )
}
