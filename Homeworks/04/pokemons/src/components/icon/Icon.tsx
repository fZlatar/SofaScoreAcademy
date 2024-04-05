import settings from '../../assets/settings.svg'
import heart from '../../assets/heart.svg'
import pokeball from '../../assets/pokeball.svg'

type Types = 'settings' | 'pokeball' | 'heart'

function Icon({ type, className }: { type: Types; className: string }) {
    if (type === 'settings') {
        return <img className={className} src={settings} alt="Settings" />
    }
    if (type === 'pokeball') {
        return <img className={className} src={pokeball} alt="Pokeball" />
    }
    if (type === 'heart') {
        return <img className={className} src={heart} alt="Heart" />
    }
}

export default Icon
