import { Circle } from 'lucide-react'
import styles from './SettingsDialog.module.css'
import { motion } from 'framer-motion'

const dialogVariants = {
    hidden: {
        opacity: 0,
        transition: {
            duration: 0.5,
            ease: 'easeInOut',
        },
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: 'easeInOut',
        },
    },
}

function SettingsDialog({
    theme,
    setTheme,
    setOpen,
}: {
    theme: 'auto' | 'dark' | 'light'
    setTheme: (t: 'auto' | 'dark' | 'light') => void
    setOpen: (b: boolean) => void
}) {
    return (
        <>
            <div
                className={styles.wrapper}
                onClick={() => setOpen(false)}
            ></div>
            <motion.div
                className={styles.container}
                key="settingsDialog"
                variants={dialogVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
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
        </>
    )
}

export default SettingsDialog
