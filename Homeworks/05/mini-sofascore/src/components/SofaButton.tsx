import { Button, ButtonProps, Image } from '@kuma-ui/core'
import React from 'react'
import ChevronRight from './icons/ChevronRight'

export interface SofaButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>, ButtonProps {
    icon?: 'withIcon' | 'withoutIcon' | 'iconOnly'
}

export default function SofaButton({ icon, ...restProps }: SofaButtonProps) {
    if (icon === 'withIcon' || icon === undefined) {
        return (
            <Button {...restProps}>
                {restProps.children}
                <ChevronRight />
            </Button>
        )
    }
    if (icon === 'withoutIcon') {
        return <Button {...restProps}>{restProps.children}</Button>
    }
    if (icon === 'iconOnly') {
        return (
            <Button {...restProps}>
                <ChevronRight />
            </Button>
        )
    }
}
