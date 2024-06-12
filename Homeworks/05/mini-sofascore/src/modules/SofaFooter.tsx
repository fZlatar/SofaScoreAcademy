import React from 'react'
import SofaLogo from '../components/icons/SofaLogo'
import { Flex, Text, FlexProps } from '@kuma-ui/core'
import typography from '@/utils/typography'
import Link from 'next/link'
import { homePath } from '@/utils/homePath'
import { useRouter } from 'next/router'

export interface SofaFooterProps extends FlexProps {}

const flexStyles: Partial<FlexProps> = {
    p: '24px 24px 32px',
    bg: 'colors.surface.s1',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 24,
    boxShadow: '0 2px 16px 0 rgba(0, 0, 0, 0.12)',
}

export default function SofaFooter(props: SofaFooterProps) {
    const locale = useRouter().locale
    return (
        <Flex {...props} {...flexStyles}>
            <Link href={homePath}>
                <SofaLogo />
            </Link>
            <Text {...typography.micro} color="colors.onSurface.nLv2">
                {locale === 'en'
                    ? '© 2024 Sofascore - All Rights Reserved.'
                    : '© 2024 Sofascore - Sva prava pridržana.'}
            </Text>
        </Flex>
    )
}
