const SELECTION_BUTTONS = document.querySelectorAll('[data-selection]')
const FINAL_COLUMN = document.querySelector('[data-final-column]')
const YOUR_SCORE_SPAN =document.querySelector('[data-your-score')
const COMPUTER_SCORE_SPAN =document.querySelector('[data-computer-score]')

const SELECTIONS =[
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

SELECTION_BUTTONS.forEach(SELECTION_BUTTON => {
    SELECTION_BUTTON.addEventListener('click', event => {
        const SELECTION_NAME = SELECTION_BUTTON.dataset.selection
        const SELECTION = SELECTIONS.find(selection => selection.name === SELECTION_NAME)
        makeSelection(SELECTION)
    })
})

function makeSelection(selection){
    const COMPUTER_SELECTION = randomSelection(selection)
    const YOUR_WINNER = isWinner(selection, COMPUTER_SELECTION)
    const COMPUTER_WINNER = isWinner(COMPUTER_SELECTION, selection)
    addSelectionResult(COMPUTER_SELECTION, COMPUTER_WINNER)
    addSelectionResult(selection, YOUR_WINNER)
    if(YOUR_WINNER) incrementScore(YOUR_SCORE_SPAN)
    if(COMPUTER_WINNER) incrementScore(COMPUTER_SCORE_SPAN)
}

function isWinner(selection, opponentSelection){
    return selection.beats === opponentSelection.name
}

function randomSelection(){
    const RANDOM_INDEX= Math.floor(Math.random() * SELECTIONS.length)
    return SELECTIONS[RANDOM_INDEX]
}

function addSelectionResult(selection, winner){
    console.log(selection, winner)
    let div = document.createElement('div')
    console.log(div)
    div.innerText =selection.emoji 
    div.classList.add('result-selection')
    if(winner) div.classList.add('winner')
    FINAL_COLUMN.after(div)
}

function incrementScore(scoreSpan){
    scoreSpan.innerHTML = parseInt(scoreSpan.innerHTML) + 1
}