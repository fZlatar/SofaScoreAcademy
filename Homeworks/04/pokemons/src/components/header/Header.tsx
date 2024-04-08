import { Heart, Settings } from 'lucide-react'
import pokeball from '../../assets/pokeball.svg'
import styles from './Header.module.css'
import { useEffect, useRef, useState } from 'react'
import SettingsDialog from './components/settingsDialog/SettingsDialog'
import FavouritesDialog from './components/favouritesDialog/FavouritesDialog'
import { AnimatePresence, motion } from 'framer-motion'

function Header() {
    const settingsButton = useRef<HTMLButtonElement>(null)
    const [settings, setSettings] = useState<boolean>(false)
    const [favourites, setFavourites] = useState<boolean>(false)
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
            <motion.button
                className={styles.heart_button}
                onClick={() => setFavourites((f) => !f)}
                whileHover={{ scale: 1.1 }}
            >
                <Heart className={styles.heart} />
            </motion.button>
            <motion.button
                className={styles.settings_button}
                onClick={() => setSettings((s) => !s)}
                ref={settingsButton}
                whileHover={{ scale: 1.1 }}
            >
                <Settings className={styles.settings} />
            </motion.button>
            <div className={styles.conteiner}>
                <img
                    className={styles.pokeball}
                    src={pokeball}
                    alt="Pokeball"
                />
                <h3>Pokedex</h3>
            </div>
            <AnimatePresence mode="wait">
                {settings && (
                    <SettingsDialog
                        theme={theme}
                        setTheme={setTheme}
                        setOpen={setSettings}
                        button={settingsButton}
                    />
                )}
                {favourites && <FavouritesDialog setOpen={setFavourites} />}
            </AnimatePresence>
        </header>
    )
}

export default Header
