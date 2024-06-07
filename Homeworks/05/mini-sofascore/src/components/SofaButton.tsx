import { Button, ButtonProps, Image } from '@kuma-ui/core'
import React from 'react'
import ChevronRight from './icons/ChevronRight'

export interface SofaButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>, ButtonProps {
    variants?: 'filled' | 'stroked' | 'unshielded'
    icon?: 'withIcon' | 'withoutIcon' | 'iconOnly'
}

export default function SofaButton({ variants, icon, ...restProps }: SofaButtonProps) {
    if (icon === 'withIcon' || icon === undefined) {
        return (
            <Button variant={variants} {...restProps}>
                {restProps.children}
                <ChevronRight />
            </Button>
        )
    }
    if (icon === 'withoutIcon') {
        return (
            <Button variant={variants} {...restProps}>
                {restProps.children}
            </Button>
        )
    }
    if (icon === 'iconOnly') {
        return (
            <Button variant={variants} {...restProps}>
                <ChevronRight />
            </Button>
        )
    }
}
