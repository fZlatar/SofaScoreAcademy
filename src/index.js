async function getToken() {
    const url = 'https://opentdb.com/api_token.php?command=request'
    try {
        const response = await fetch(url)
        if (response.status === 200) {
            const tokenRes = await response.json()
            localStorage.setItem('token', tokenRes.token)
        }
    } catch (error) {
        window.location.href = 'error.html'
    }
}

function resetQuestions() {
    localStorage.removeItem('questions')
}

document.addEventListener('DOMContentLoaded', function() {
    resetQuestions()
    getToken()
    const start = document.getElementById('start')
    start.addEventListener('click', event => {
        event.preventDefault();
                
        localStorage.setItem('joker', 1)
    
        const href = start.getAttribute("href");
        window.location.href = href;
    })
})