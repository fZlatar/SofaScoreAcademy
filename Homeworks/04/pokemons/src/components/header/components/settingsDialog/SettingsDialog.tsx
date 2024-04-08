import { Circle } from 'lucide-react'
import styles from './SettingsDialog.module.css'
import { RefObject, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const dialogVariants = {
    initial: {
        opacity: 0,
    },
    exit: {
        opacity: 0,
        transition: {
            diration: 1,
            ease: 'easeInOut',
        },
    },
    animate: {
        opacity: 1,
    },
    transition: {
        diration: 1,
        ease: 'easeInOut',
    },
}

function SettingsDialog({
    theme,
    setTheme,
    setOpen,
    button,
}: {
    theme: 'auto' | 'dark' | 'light'
    setTheme: (t: 'auto' | 'dark' | 'light') => void
    setOpen: (b: boolean) => void
    button: RefObject<HTMLButtonElement>
}) {
    const dialogRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dialogRef.current &&
                !dialogRef.current.contains(event.target as Node)
            ) {
                if (
                    button.current &&
                    !button.current.contains(event.target as Node)
                )
                    setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [setOpen, button])

    return (
        <motion.div
            className={styles.conteiner}
            ref={dialogRef}
            key="settingsDialog"
            {...dialogVariants}
        >
            <h4>Theme</h4>
            <motion.button
                className={styles.button}
                onClick={() => setTheme('auto')}
                whileHover={{ scale: 1.1, originX: 0 }}
            >
                <Circle
                    className={`${styles.circle} ${
                        theme === 'auto' ? styles.fill : ''
                    }`.trim()}
                />
                <span>Auto</span>
            </motion.button>
            <motion.button
                className={styles.button}
                onClick={() => setTheme('light')}
                whileHover={{ scale: 1.1, originX: 0 }}
            >
                <Circle
                    className={`${styles.circle} ${
                        theme === 'light' ? styles.fill : ''
                    }`.trim()}
                />
                <span>Light</span>
            </motion.button>
            <motion.button
                className={styles.button}
                onClick={() => setTheme('dark')}
                whileHover={{ scale: 1.1, originX: 0 }}
            >
                <Circle
                    className={`${styles.circle} ${
                        theme === 'dark' ? styles.fill : ''
                    }`.trim()}
                />
                <span>Dark</span>
            </motion.button>
        </motion.div>
    )
}

export default SettingsDialog
