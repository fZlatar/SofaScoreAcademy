async function getData() {
    try {
        if(localStorage.getItem('questions')) {
            questions = JSON.parse(localStorage.getItem('questions'))
            if(questions.length !== 15 || !questions[14].answered) {
                window.location.href = 'index.html'
            }
        } else {
            window.location.href = 'index.html'
        }
    } catch(error) {
        window.location.href = 'error.html'
    }
}

async function displayData() {
    try {
        if(questions) {
            let correct = 0
            questions.forEach(q => {
                if(q.answered === q.correct) {
                    correct++
                }
                showQuestion(q)
            });
            const score = document.getElementById('score')
            score.textContent = correct + '/15'

            let forSave = {
                score: correct = correct + '/15',
                date: Date.now()
            }

            const storedScores = localStorage.getItem('scores')
            if(storedScores) {
                let scores = JSON.parse(storedScores)
                scores.push(forSave)
                localStorage.setItem('scores', JSON.stringify(scores))
            } else {
                let scores = []
                scores.push(forSave)
                localStorage.setItem('scores', JSON.stringify(scores))
            }
            localStorage.removeItem('questions')
        }
    } catch(error) {
        window.location.href = 'error.html'
    }
}

function showQuestion(question) {
    const answers = document.getElementById('answers')

    const div1 = document.createElement('div')
    const div2 = document.createElement('div')
    div1.classList.add('answer')
    div2.classList.add('qa')
    if(question.answered === question.correct) {
        div1.classList.add('correct')
    } else {
        div1.classList.add('incorrect')
    }
    const q = document.createElement('h3')
    q.textContent = question.question
    div1.appendChild(q)

    const a = document.createElement('div')
    a.classList.add('box')
    const h1 = document.createElement('h4')
    const p1 = document.createElement('p')
    h1.textContent = 'Answered'
    p1.textContent = question.answered
    a.appendChild(h1)
    a.appendChild(p1)

    const c = document.createElement('div')
    c.classList.add('box')
    const h2 = document.createElement('h4')
    const p2 = document.createElement('p')
    h2.textContent = 'Correct'
    p2.textContent = question.correct
    c.appendChild(h2)
    c.appendChild(p2)

    div2.appendChild(a)
    div2.appendChild(c)
    div1.appendChild(div2)
    answers.appendChild(div1)
}

async function init() {
    await getData()
    await displayData()
}

let questions = []

document.addEventListener('DOMContentLoaded', function() {
    init()
})