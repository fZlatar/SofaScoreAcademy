import heartLogo from '../../assets/heart.svg'
import Icon from '../icon/Icon'
import styles from './Header.module.css'

function Header() {
    return (
        <header className={styles.header}>
            <img className={styles.heart} src={heartLogo} alt="Heart" />
            <Icon className={styles.settings} type="settings" />
            <div className={styles.conteiner}>
                <Icon className={styles.pokeball} type="pokeball" />
                <h3>Pokedex</h3>
            </div>
        </header>
    )
}

export default Header
