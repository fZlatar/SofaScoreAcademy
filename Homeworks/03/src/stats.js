async function getStats() {
    storedStats = localStorage.getItem('scores')
    if(storedStats) {
        stats = JSON.parse(storedStats)
    }
}

async function showStats() {
    const conteiner = document.getElementById('cards')
    const options = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };

    stats.forEach(s => {
        const card = document.createElement('div')
        card.classList.add('card')

        const h3 = document.createElement('h3')
        h3.textContent = s.score
        const p = document.createElement('p')
        const date = new Date(s.date)
        p.textContent = date.toLocaleString('en-US', options)

        card.appendChild(h3)
        card.appendChild(p)
        conteiner.appendChild(card)
    })
}

async function init() {
    await getStats()
    await showStats()
}

let stats

document.addEventListener('DOMContentLoaded', function() {
    init()
})