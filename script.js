const SELECTION_BUTTONS = document.querySelectorAll('[data-selection]')
const RESULTS_COLUMN = document.querySelector('[data-results-column]')
const YOUR_SCORE_SPAN = document.querySelector('[data-your-score')
const COMPUTER_SCORE_SPAN = document.querySelector('[data-computer-score]')
const WINS_FORM = document.getElementById("winsForm");

const gameInformation = {
    amountOfWins: 1
}

const SELECTIONS = [
    {
        name: 'rock',
        emoji: '✊',
        beats: 'scissors'
    },
    {
        name: 'paper',
        emoji: '✋',
        beats: 'rock'
    },
    {
        name: 'scissors',
        emoji: '🖖',
        beats: 'paper'
    }
]

WINS_FORM.addEventListener("submit", event => {
    event.preventDefault();
    gameInformation.amountOfWins = parseInt(WINS_FORM.elements.amountWins.value)
});

SELECTION_BUTTONS.forEach(SELECTION_BUTTON => {
    SELECTION_BUTTON.addEventListener('click', event => {
        const SELECTION_NAME = SELECTION_BUTTON.dataset.selection
        const SELECTION = SELECTIONS.find(selection => selection.name === SELECTION_NAME)
        makeSelection(SELECTION)
    })
})

function makeSelection(selection) {
    const COMPUTER_SELECTION = randomSelection(selection)
    const YOUR_WINNER = isWinner(selection, COMPUTER_SELECTION)
    const COMPUTER_WINNER = isWinner(COMPUTER_SELECTION, selection)
    addSelectionResult(COMPUTER_SELECTION, COMPUTER_WINNER)
    addSelectionResult(selection, YOUR_WINNER)
    if (YOUR_WINNER) incrementScore(YOUR_SCORE_SPAN, selection)
    if (COMPUTER_WINNER) incrementScore(COMPUTER_SCORE_SPAN, COMPUTER_WINNER)

}

function checkForMatchWinner(scoreSpan) {
    console.log( gameInformation.amountOfWins)
    console.log(parseInt(scoreSpan.innerHTML.split(" ")[1]))
    if (parseInt(scoreSpan.innerHTML.split(" ")[1]) ===  gameInformation.amountOfWins) {
        showWinner(scoreSpan)
        clearHistory()
        resetWins()
    }
    return false
}

function showWinner(scoreSpan) {
    window.alert(`The winner is ${scoreSpan.previousElementSibling.innerHTML} Scoreboard: ${YOUR_SCORE_SPAN.innerHTML.split(" ")[1]} against ${COMPUTER_SCORE_SPAN.innerHTML.split(" ")[1]} `)
}

function isWinner(selection, opponentSelection) {
    return selection.beats === opponentSelection.name
}

function randomSelection() {
    const RANDOM_INDEX = Math.floor(Math.random() * SELECTIONS.length)
    return SELECTIONS[RANDOM_INDEX]
}

function addSelectionResult(selection, winner) {
    console.log(selection, winner)
    let div = document.createElement('div')
    div.innerText = selection.emoji
    div.classList.add('result-selection')
    if (winner) div.classList.add('winner')
    RESULTS_COLUMN.appendChild(div)
}

function incrementScore(scoreSpan,) {
    let score = parseInt(scoreSpan.innerHTML.split(" ")[1]) + 1
    scoreSpan.innerHTML = `Wins: ${score}`
    checkForMatchWinner(scoreSpan)
}

function clearHistory() {
    const ADDED_RESULTS = [document.getElementsByClassName('result-selection')]
    ADDED_RESULTS.forEach(result => {
        Array.from(result).forEach(element => element.remove())
    })
    resetWins()
}

function resetWins() {
    YOUR_SCORE_SPAN.innerHTML = "Wins: 0"
    COMPUTER_SCORE_SPAN.innerHTML = "Wins: 0"
}

