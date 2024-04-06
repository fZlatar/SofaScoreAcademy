import { Heart, Settings } from 'lucide-react'
import pokeball from '../../assets/pokeball.svg'
import styles from './Header.module.css'
import { useEffect, useRef, useState } from 'react'
import SettingsDialog from './components/SettingsDialog'

function Header() {
    const settingsButton = useRef<HTMLButtonElement>(null)
    const [settings, setSettings] = useState<boolean>(false)
    const [theme, setTheme] = useState<'auto' | 'dark' | 'light'>(
        (localStorage.getItem('theme') as 'auto' | 'dark' | 'light') || 'auto'
    )

    useEffect(() => {
        const setBodyClasses = () => {
            const darkThemeMq = window.matchMedia(
                '(prefers-color-scheme: dark)'
            )
            if (theme === 'auto') {
                if (darkThemeMq.matches) {
                    document.body.className = 'dark-theme'
                    return
                }
                document.body.className = 'light-theme'
                return
            }
            if (theme === 'dark') {
                document.body.className = 'dark-theme'
                return
            }
            if (theme === 'light') {
                document.body.className = 'light-theme'
                return
            }
        }

        setBodyClasses()

        localStorage.setItem('theme', theme)

        return () => {
            document.body.className = ''
        }
    }, [theme])

    return (
        <header className={styles.header}>
            <button className={styles.heart_button}>
                <Heart className={styles.heart} />
            </button>
            <button
                className={styles.settings_button}
                onClick={() => setSettings((s) => !s)}
                ref={settingsButton}
            >
                <Settings className={styles.settings} />
            </button>
            <div className={styles.conteiner}>
                <img
                    className={styles.pokeball}
                    src={pokeball}
                    alt="Pokeball"
                />
                <h3>Pokedex</h3>
            </div>
            {settings && (
                <SettingsDialog
                    theme={theme}
                    setTheme={setTheme}
                    setOpen={setSettings}
                    button={settingsButton}
                />
            )}
        </header>
    )
}

export default Header
