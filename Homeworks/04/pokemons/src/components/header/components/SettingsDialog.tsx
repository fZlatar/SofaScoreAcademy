import { Circle } from 'lucide-react'
import styles from './SettingsDialog.module.css'
import { RefObject, useEffect, useRef } from 'react'

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
        <div className={styles.conteiner} ref={dialogRef}>
            <h4>Theme</h4>
            <button className={styles.button} onClick={() => setTheme('auto')}>
                <Circle
                    className={`${styles.circle} ${
                        theme === 'auto' ? styles.fill : ''
                    }`.trim()}
                />
                <span>Auto</span>
            </button>
            <button className={styles.button} onClick={() => setTheme('light')}>
                <Circle
                    className={`${styles.circle} ${
                        theme === 'light' ? styles.fill : ''
                    }`.trim()}
                />
                <span>Light</span>
            </button>
            <button className={styles.button} onClick={() => setTheme('dark')}>
                <Circle
                    className={`${styles.circle} ${
                        theme === 'dark' ? styles.fill : ''
                    }`.trim()}
                />
                <span>Dark</span>
            </button>
        </div>
    )
}

export default SettingsDialog
