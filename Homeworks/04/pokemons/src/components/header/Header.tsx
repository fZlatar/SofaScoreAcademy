import { Heart, Settings } from 'lucide-react'
import pokeball from '../../assets/pokeball.svg'
import styles from './Header.module.css'
import { useEffect, useState } from 'react'
import SettingsDialog from './components/settingsDialog/SettingsDialog'
import FavoritesDialog from './components/favoritesDialog/FavoritesDialog'
import { AnimatePresence, motion } from 'framer-motion'

function Header() {
    const [showSettings, setShowSettings] = useState<boolean>(false)
    const [showFavorites, setShowFavorites] = useState<boolean>(false)
    const [theme, setTheme] = useState<'auto' | 'dark' | 'light'>(
        (localStorage.getItem('theme') as 'auto' | 'dark' | 'light') || 'auto'
    )

    useEffect(() => {
        const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)')

        if (theme === 'auto') {
            if (darkThemeMq.matches) {
                document.body.className = 'dark-theme'
            } else {
                document.body.className = 'light-theme'
            }
        } else if (theme === 'dark') {
            document.body.className = 'dark-theme'
        } else if (theme === 'light') {
            document.body.className = 'light-theme'
        }

        localStorage.setItem('theme', theme)

        return () => {
            document.body.className = ''
        }
    }, [theme])

    return (
        <header className={styles.header}>
            <motion.button
                className={styles.heart_button}
                onClick={() => setShowFavorites((f) => !f)}
                whileHover={{ scale: 1.1 }}
            >
                <Heart className={styles.heart} />
            </motion.button>
            <motion.button
                className={styles.settings_button}
                onClick={() => setShowSettings((s) => !s)}
                whileHover={{ scale: 1.1 }}
            >
                <Settings className={styles.settings} />
            </motion.button>
            <div className={styles.container}>
                <img
                    className={styles.pokeball}
                    src={pokeball}
                    alt="Pokeball"
                />
                <h3>Pokedex</h3>
            </div>
            <AnimatePresence mode="wait">
                {showSettings && (
                    <SettingsDialog
                        theme={theme}
                        setTheme={setTheme}
                        setOpen={setShowSettings}
                    />
                )}
                {showFavorites && (
                    <FavoritesDialog setOpen={setShowFavorites} />
                )}
            </AnimatePresence>
        </header>
    )
}

export default Header
