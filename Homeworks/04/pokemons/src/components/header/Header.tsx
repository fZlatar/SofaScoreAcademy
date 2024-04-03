import heartLogo from '../../assets/heart.png'
import settingsLogo from '../../assets/settings.png'
import pokeballLogo from '../../assets/pokeball.png'
import './Header.css'

function Header() {

    return (
        <header className='header'>
            <img className='heart-logo' src={heartLogo} alt="Heart logo" />
            <img className='settings-logo' src={settingsLogo} alt="Settings logo" />
            <div className='pokedex-conteiner'>
                <img className='pokeball-logo' src={pokeballLogo} alt="Pokeball logo" />
                <h3>Pokedex</h3>
            </div>
        </header>
    )

}

export default Header