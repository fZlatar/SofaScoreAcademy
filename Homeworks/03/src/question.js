function setTitle() {
    let title = document.getElementById("title")
    let urlParams = new URLSearchParams(window.location.search)
    questionNum = urlParams.get("questionNumber")
    if(questionNum) {
        questionNum = parseInt(questionNum)
        title.textContent = "Question " + questionNum
    }
    else {
        questionNum = 1
        title.textContent = "Question " + questionNum
    }
    if(questionNum > 1) {
        const buttonDiv = document.getElementById('button')
        const previous = document.createElement('a')
        previous.classList.add('button')
        previous.classList.add('neutral')
        previous.id = 'previous'
        previous.textContent = 'Previous'
        previous.href = 'question.html?questionNumber=' + (questionNum-1)
        buttonDiv.appendChild(previous)
        previous.addEventListener('click', event => {
            event.preventDefault();
            
            localStorage.setItem('questions', JSON.stringify(questions))
    
            const href = previous.getAttribute("href");
            window.location.href = href;
        })
    }
}

async function getQuestion() {
    const token = localStorage.getItem("token")
    if(token) {
        if(!questions.hasOwnProperty(questionNum-1)) {
            const url = 'https://opentdb.com/api.php?amount=1&type=multiple&encode=base64&token=' + token
            try {
                const response = await fetch(url)
                if (response.status === 200) {
                    question = await response.json()
                    const p = document.getElementById("question")
                    p.textContent = atob(question.results[0].question)
                    let choices = question.results[0].incorrect_answers.concat(question.results[0].correct_answer)
                    choices = choices.map(choice => atob(choice).trim())
                    choices = shuffleArray(choices) // Shuffle the choices
                    const choicesDiv = document.getElementById("choices")
                    choices.forEach(choice => {
                        const choiceDiv = document.createElement("div")
                        choiceDiv.classList.add("choice")
                        choiceDiv.classList.add("hover")
                        choiceDiv.textContent = choice
                        choiceDiv.onclick = (event) => handleChoice(event)
                        choicesDiv.appendChild(choiceDiv)
                    })

                    let incorrect = question.results[0].incorrect_answers.map(inc => atob(inc).trim())

                    questions.push({
                        'question': atob(question.results[0].question),
                        'correct': atob(question.results[0].correct_answer).trim(),
                        'incorrect': incorrect,
                        'answered': null
                    })
                    localStorage.setItem('questions', JSON.stringify(questions))
                } else if(response.status === 429) {
                    setTimeout(function() { // Timeout added before sending another request because API does not let too many request at one time
                        location.reload();
                    }, 2000);
                } else {
                    window.location.href = 'error.html'
                }
            } catch (error) {
                window.location.href = 'error.html'
            }
        } else {
            const p = document.getElementById("question")
            p.textContent = questions[questionNum-1].question
            let choices = questions[questionNum-1].incorrect.concat(questions[questionNum-1].correct)
            choices = choices.map(choice => choice.trim())
            choices = shuffleArray(choices)
            const choicesDiv = document.getElementById("choices")
            choices.forEach(choice => {
                const choiceDiv = document.createElement("div")
                choiceDiv.classList.add("choice")
                choiceDiv.textContent = choice
                if(questions[questionNum-1].answered) {
                    if(choice === questions[questionNum-1].correct) {
                        choiceDiv.classList.add('correct')
                    }
                    if(choice !== questions[questionNum-1].correct && choice === questions[questionNum-1].answered) {
                        choiceDiv.classList.add('incorrect')
                    }
                } else {
                    choiceDiv.classList.add("hover")
                    choiceDiv.onclick = (event) => handleChoice(event)
                }
                choicesDiv.appendChild(choiceDiv)
            })
            if(questions[questionNum-1].answered) {
                const div = document.getElementById('button')
                const next = document.createElement('a')
                next.classList.add('button')
                next.id = 'next'
                if(questionNum === 15) {
                    next.classList.add('success')
                    next.textContent = 'Finish'
                    next.href = 'finish.html'
                } else {
                    next.classList.add('neutral')
                    next.textContent = 'Next'
                    next.href = 'question.html?questionNumber=' + (questionNum+1)
                }
                next.addEventListener('click', event => {
                    event.preventDefault();
                    
                    localStorage.setItem('questions', JSON.stringify(questions))
            
                    const href = next.getAttribute("href");
                    window.location.href = href;
                })
                div.appendChild(next)
            }
        }
    } else {
        alert('Token is missing, you will be redirected to home page.')
        window.location.href = 'index.html'
    }
}

async function getQuestions() {
    let storedQuestions = localStorage.getItem('questions')
    if(!storedQuestions) {
        questions = []
        localStorage.setItem('questions', JSON.stringify(questions))
    } else {
        questions = JSON.parse(storedQuestions)
    }
}

async function init() {
    setTitle()
    addListeners()
    await getQuestions()
    await checkQuestionNumber()
    await getQuestion()
    await setJoker()
}

function addListeners() {
    const exit = document.getElementById('exit')
    exit.addEventListener('click', event => {
        event.preventDefault()
        const href = exit.getAttribute("href");

        if(confirm('Are you sure you want to exit the game?')) {
            window.location.href = href;
        }
    })
}

function handleChoice(event) {
    let answer = event.target.innerText
    const choiceElements = document.querySelectorAll('.choice')
    choiceElements.forEach(element => {
        element.onclick = null
        element.classList.remove('hover')
        if(element.innerText === questions[questionNum-1].correct) {
            element.classList.add('correct')
        }
    })
    if(answer !== questions[questionNum-1].correct) {
        event.target.classList.add('incorrect')
    }

    questions[questionNum-1].answered = answer
    localStorage.setItem('questions', JSON.stringify(questions))

    const div = document.getElementById('button')
    const next = document.createElement('a')
    next.classList.add('button')
    next.id = 'next'
    if(questionNum === 15) {
        next.classList.add('success')
        next.textContent = 'Finish'
        next.href = 'finish.html'
    } else {
        next.classList.add('neutral')
        next.textContent = 'Next'
        next.href = 'question.html?questionNumber=' + (questionNum+1)
    }
    next.addEventListener('click', event => {
        event.preventDefault();
        
        localStorage.setItem('questions', JSON.stringify(questions))

        const href = next.getAttribute("href");
        window.location.href = href;
    })
    div.appendChild(next)

    const joker = document.getElementById('jok')
    if(joker) {
        joker.disabled = true
        joker.style.display = 'none'
    }

}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function checkQuestionNumber() {
    if(questionNum-1 > questions.length) {
        let page
        if(questions[questions.length-1]) {
            if(questions[questions.length-1].answered) {
                page = questions.length + 1
            } else {
                page = questions.length
            }
            window.location.href = 'question.html?questionNumber=' + page
        } else {
            window.location.href = 'index.html'
        }
    }
}

async function setJoker() {
    try {
        if(!questions[questionNum-1].answered) {
            const storedJoker = localStorage.getItem('joker')
            if(storedJoker) {
                let joker = parseInt(JSON.parse(storedJoker))
                if(joker !== 0) {
                    const conteiner = document.getElementById('tools')
                    const button = document.createElement('button')
                    button.classList.add('button')
                    button.classList.add('joker-button')
                    button.id = 'jok'
                    button.onclick = () => useJoker(button)

                    const img = document.createElement('img')
                    img.classList.add('joker')
                    img.alt = 'Joker'
                    img.src = 'joker-hat.svg'

                    button.appendChild(img)
                    conteiner.appendChild(button)
                }
            }
        }
    } catch(error) {
        // window.location.href = 'error.html'
    }
}

async function useJoker(button) {
    try {
        if(confirm("Are you sure you want to use joker?")) {
            const storedJoker = localStorage.getItem('joker')
            if(storedJoker) {
                // let joker = parseInt(JSON.parse(storedJoker))
                localStorage.setItem('joker', 0)
                button.disabled = true

                let wrong = shuffleArray(questions[questionNum-1].incorrect)[0]
                const choices = document.querySelectorAll('.choice')
                choices.forEach(c => {
                    if(wrong !== c.innerText && questions[questionNum-1].correct !== c.innerText) {
                        c.style.display = 'none'
                    }
                })
                questions[questionNum-1].incorrect = [wrong]
                localStorage.setItem('questions', JSON.stringify(questions))
            }
        }
    } catch {
        // window.location.href = 'error.html'
    }
}

let questionNum
let question
let questions

document.addEventListener('DOMContentLoaded', function() {
    init()
})