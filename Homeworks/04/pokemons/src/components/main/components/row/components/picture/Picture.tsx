import heartLogo from '../../../../../../assets/favourite-icon.png'
import './Picture.css'

type Orientation = 'left' | 'right';

function Picture({ orientation }: { orientation: Orientation }) {
    return (
        <div className={`pokemon-picture-conteiner ${orientation}`.trim()}>
            <img src='' alt='' />
            <img className={`favourite-icon ${orientation}`.trim()} src={heartLogo} alt='Heart logo' />
        </div>
    )
}

export default Picture