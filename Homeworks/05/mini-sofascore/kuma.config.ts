import { createTheme } from '@kuma-ui/core'

const theme = createTheme({
    colors: {
        primary: {
            default: 'var(--primary-default)',
            variant: 'var(--primary-variant)',
            highlight: 'var(--primary-highlight)',
        },
        secondary: {
            default: 'var(--secondary-default)',
            variant: 'var(--secondary-variant)',
            highlight: 'var(--secondary-highlight)',
        },
        onColor: {
            primary: 'var(--on-color-primary)',
            secondary: 'var(--on-color-secondary)',
        },
        surface: {
            s0: 'var(--surface-s0)',
            s1: 'var(--surface-s1)',
            s2: 'var(--surface-s2)',
        },
        onSurface: {
            nLv1: 'var(--on-surface-nLv1)',
            nLv2: 'var(--on-surface-nLv2)',
            nLv3: 'var(--on-surface-nLv3)',
            nLv4: 'var(--on-surface-nLv4)',
        },
        status: {
            error: 'var(--status-error)',
            alert: 'var(--status-alert)',
            success: 'var(--status-success)',
        },
        specific: {
            live: 'var(--specific-live)',
        },
    },
    lineHeights: {
        xl: '40px',
        lg: '28px',
        md: '24px',
        sm: '20px',
        xs: '16px',
    },
    letterSpacings: {
        normal: 'normal',
        tabular: '-0.28px',
    },
    fonts: {
        robotoRegular: 'var(--font-roboto-regular)',
        robotoBold: 'var(--font-roboto-bold)',
        robotoRegularCondensed: 'var(--font-roboto-regular-condensed)',
    },
    fontSizes: {
        xs: '12px',
        sm: '14px',
        md: '16px',
        lg: '20px',
        xl: '32px',
    },
    fontWeights: {
        light: 300,
        normal: 400,
        medium: 500,
        bold: 700,
    },
    spacings: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
    },
    breakpoints: {
        desktop: '900px',
    },
    radii: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
    },
    components: {
        Button: {
            defaultProps: {
                variant: 'filled',
                gap: '8px',
                borderRadius: '2px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: 700,
                fontSize: '16px',
                lineHeight: '24px',
                textAlign: 'left',
                transition: 'all 0.3s ease',
            },
            variants: {
                filled: {
                    border: 0,
                    p: '8px 16px',
                    bg: 'var(--primary-default)',
                    color: 'var(--surface-s1)',
                    _hover: {
                        bg: 'var(--primary-variant)',
                        cursor: 'pointer',
                    },
                    _disabled: {
                        bg: 'var(--primary-default)',
                        opacity: 0.4,
                        cursor: 'default',
                    },
                },
                stroked: {
                    bg: 'none',
                    color: 'var(--primary-default)',
                    border: 'solid 2px var(--primary-default)',
                    p: '6px 14px',
                    _hover: {
                        bg: 'none',
                        border: 'solid 2px var(--primary-variant)',
                        color: 'var(--primary-variant)',
                        cursor: 'pointer',
                    },
                    _disabled: {
                        bg: 'none',
                        border: 'solid 2px var(--primary-default)',
                        color: 'var(--primary-default)',
                        opacity: 0.4,
                        cursor: 'default',
                    },
                },
                unshielded: {
                    bg: 'none',
                    color: 'var(--primary-default)',
                    p: 0,
                    border: 0,
                    _hover: {
                        bg: 'none',
                        color: 'var(--primary-variant)',
                        cursor: 'pointer',
                    },
                    _disabled: {
                        bg: 'none',
                        color: 'var(--primary-default)',
                        opacity: 0.4,
                        cursor: 'default',
                    },
                },
            },
        },
    },
})

type UserTheme = typeof theme

declare module '@kuma-ui/core' {
    export interface Theme extends UserTheme {}
}

export default theme
