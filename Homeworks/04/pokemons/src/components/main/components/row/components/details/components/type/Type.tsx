import styles from './Type.module.css'

function Type({ type, className }: { type: string; className?: string }) {
    let classNames = `${className ? className : ''} ${styles.type} ${
        styles.normal
    }`.trim()
    switch (type) {
        case 'normal':
            classNames = `${className ? className : ''} ${styles.type} ${
                styles.normal
            }`.trim()
            break
        case 'fire':
            classNames = `${className ? className : ''} ${styles.type} ${
                styles.fire
            }`.trim()
            break
        case 'water':
            classNames = `${className ? className : ''} ${styles.type} ${
                styles.water
            }`.trim()
            break
        case 'grass':
            classNames = `${className ? className : ''} ${styles.type} ${
                styles.grass
            }`.trim()
            break
        case 'electric':
            classNames = `${className ? className : ''} ${styles.type} ${
                styles.electric
            }`.trim()
            break
        case 'ice':
            classNames = `${className ? className : ''} ${styles.type} ${
                styles.ice
            }`.trim()
            break
        case 'fighting':
            classNames = `${className ? className : ''} ${styles.type} ${
                styles.fighting
            }`.trim()
            break
        case 'ground':
            classNames = `${className ? className : ''} ${styles.type} ${
                styles.ground
            }`.trim()
            break
        case 'poison':
            classNames = `${className ? className : ''} ${styles.type} ${
                styles.poison
            }`.trim()
            break
        case 'flying':
            classNames = `${className ? className : ''} ${styles.type} ${
                styles.flying
            }`.trim()
            break
        case 'psychic':
            classNames = `${className ? className : ''} ${styles.type} ${
                styles.psychic
            }`.trim()
            break
        case 'ghost':
            classNames = `${className ? className : ''} ${styles.type} ${
                styles.ghost
            }`.trim()
            break
        case 'steel':
            classNames = `${className ? className : ''} ${styles.type} ${
                styles.steel
            }`.trim()
            break
        case 'fairy':
            classNames = `${className ? className : ''} ${styles.type} ${
                styles.fairy
            }`.trim()
            break
    }

    return <div className={classNames}>{type}</div>
}

export default Type
